const { exec } = require("child_process");
const schedule = require("node-schedule");

const command = "npm start";

schedule.scheduleJob("*/5 * * * *", function () {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing command: ${error.message}`);
      return;
    }

    console.log(`Command output: ${stdout}`);
    console.error(`Command output error: ${stderr}`);
  });
});
