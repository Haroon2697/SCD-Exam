import { exec } from 'child_process';

const killPort = () => {
    const command = process.platform === 'win32'
        ? `netstat -ano | findstr :4000 > nul && (for /f "tokens=5" %a in ('netstat -aon ^| findstr :4000') do taskkill /F /PID %a) || echo "No process on port 4000"`
        : "lsof -ti:4000 | xargs kill -9 || echo 'No process on port 4000'";

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.log('No process found on port 4000');
            return;
        }
        console.log('Killed process on port 4000');
    });
};

killPort();