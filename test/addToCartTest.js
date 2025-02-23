const { Builder } = require("selenium-webdriver");
const LoginPage = require("../pages/loginPage");
const InventoryPage = require("../pages/inventoryPage");
const testData = require("../fixtures/testData.json");
const { takeScreenshot } = require("../helper/visualTesting");

describe("Add to Cart Test", function () {
  let driver;
  let loginPage;
  let inventoryPage;

  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
    loginPage = new LoginPage(driver);
    inventoryPage = new InventoryPage(driver);
    await loginPage.open(testData.baseUrl);
    await loginPage.login(testData.validUser.username, testData.validUser.password);
  });

  it("Add an item to the cart", async function () {
    await inventoryPage.addItemToCart();
    await takeScreenshot(driver, "add_to_cart.png");
  });

  after(async function () {
    await driver.quit();
  });
});
