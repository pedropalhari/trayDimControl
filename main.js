const { app, Menu, Tray } = require("electron");
const { exec } = require("child_process");
const dotenv = require("dotenv");

dotenv.config();

let tray = null;
let debug = false;

console.log(
  `Check the icon author at:
https://www.freepik.com/?__hstc=57440181.52edd16ebb7b70dc6e1fb905a24ef9fd` +
    `.1562594266864.1562594266864.1562594266864.1&__` +
    `hssc=57440181.8.1562594266865&__hsfp=1452826832
`
);

app.on("ready", () => {
  let { SUDO_PASS } = process.env;

  if (!SUDO_PASS) {
    throw "You forgot to setup a SUDO_PASS. The app won't be able to modify the file";
  }

  tray = new Tray("./light.png");

  let itemSet = [
    {
      label: "100",
      type: "normal",
      dimValue: "100"
    },
    {
      label: "200",
      type: "normal",
      dimValue: "200"
    },
    {
      label: "350",
      type: "normal",
      dimValue: "350"
    },
    {
      label: "600",
      type: "normal",
      dimValue: "600"
    },
    {
      label: "900",
      type: "normal",
      dimValue: "900"
    }
  ];

  const contextMenu = Menu.buildFromTemplate(itemSet);
  tray.setToolTip("DimValue");

  for (let i = 0; i < contextMenu.items.length; i++)
    contextMenu.items[i].click = () => {
      let command =
        `echo ${SUDO_PASS} | sudo -S chmod 777 /sys/class/backlight/intel_backlight/brightness` +
        ` && echo ${
          itemSet[i].dimValue
        } > /sys/class/backlight/intel_backlight/brightness`;

      exec(command, (error, stdout, stderr) => {
        if (error) {
          debug && console.error(`exec error: ${error}`);
          return;
        }
        debug && console.log(`stdout: ${stdout}`);
        debug && console.log(`stderr: ${stderr}`);
      });
    };

  tray.setContextMenu(contextMenu);
});
