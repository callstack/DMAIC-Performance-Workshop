// This script starts a server on a specified port and periodically executes adb reverse
// to allow devices to connect to the server via USB debugging.

const {spawn} = require('child_process');
const server = require('../backend/server');

const port = 8090;
const adbCommand = 'adb';
const adbArgs = ['reverse', `tcp:${port}`, `tcp:${port}`];

function executeAdbReverse() {
  spawn(adbCommand, adbArgs, {
    stdio: 'ignore', // Ignore stdio to hide output
  });
}

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

executeAdbReverse();
setInterval(executeAdbReverse, 2000);
