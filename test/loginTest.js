const { Builder } = require("selenium-webdriver");
const LoginPage = require("../pages/loginPage");
const testData = require("../fixtures/testData.json");
const { takeScreenshot } = require("../helper/visualTesting");

describe("Login Test", function () {
  let driver;
  let loginPage;

  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
    loginPage = new LoginPage(driver);
    await loginPage.open(testData.baseUrl);
  });

  it("User success login", async function () {
    await loginPage.login(testData.validUser.username, testData.validUser.password);
    await takeScreenshot(driver, "login_success.png");
  });

  after(async function () {
    await driver.quit();
  });
});
