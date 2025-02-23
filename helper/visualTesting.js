const fs = require("fs");
const path = require("path");

const screenshotDir = path.join(__dirname, "../screenshots");
if (!fs.existsSync(screenshotDir)) {
  fs.mkdirSync(screenshotDir);
}

async function takeScreenshot(driver, fileName) {
  const image = await driver.takeScreenshot();
  fs.writeFileSync(path.join(screenshotDir, fileName), image, "base64");
}

module.exports = { takeScreenshot };
