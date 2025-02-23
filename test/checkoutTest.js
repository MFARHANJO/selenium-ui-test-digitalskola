const { Builder } = require("selenium-webdriver");
const LoginPage = require("../pages/loginPage");
const InventoryPage = require("../pages/inventoryPage");
const CartPage = require("../pages/cartPage");
const CheckoutPage = require("../pages/checkoutPage");
const testData = require("../fixtures/testData.json");
const { takeScreenshot } = require("../helper/visualTesting");

describe("Checkout Test", function () {
  this.timeout(15000);
  let driver;
  let loginPage;
  let inventoryPage;
  let cartPage;
  let checkoutPage;

  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
    loginPage = new LoginPage(driver);
    inventoryPage = new InventoryPage(driver);
    cartPage = new CartPage(driver);
    checkoutPage = new CheckoutPage(driver);
    await loginPage.open(testData.baseUrl);
    await loginPage.login(testData.validUser.username, testData.validUser.password);
    await inventoryPage.addItemToCart();
    await cartPage.proceedToCheckout();
  });

  it("Complete checkout process", async function () {
    await checkoutPage.enterCheckoutInfo("John", "Doe", "12345");
    await checkoutPage.finishCheckout();
    await takeScreenshot(driver, "checkout_success.png");
  });

  after(async function () {
    await driver.quit();
  });
});
