
const { exec } = require('child_process');

// Run the Vite build with standard configuration
exec('npx vite build', (error, stdout, stderr) => {
  if (error) {
    console.error(`Build error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Build stderr: ${stderr}`);
    return;
  }
  console.log(`Build succeeded: ${stdout}`);
});
