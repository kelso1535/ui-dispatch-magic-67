
const { exec } = require('child_process');

// Run the Vite build with appropriate flags for Node 16 compatibility
exec('npx vite build --target es2015', (error, stdout, stderr) => {
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
