const { Builder, By, until } = require("selenium-webdriver");
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
    await driver.wait(until.elementLocated(By.className("shopping_cart_badge")), 5000);
    
    await inventoryPage.openCart(); // 🔥 Panggil openCart() sebelum checkout
    await takeScreenshot(driver, "cart_before_checkout.png");

    await cartPage.proceedToCheckout();
  });

  it("Complete checkout process", async function () {
    await driver.wait(until.elementLocated(By.id("checkout")), 5000);
    await checkoutPage.enterCheckoutInfo("Farhan", "Jundi", "44151");
    await takeScreenshot(driver, "checkout_info.png");

    await checkoutPage.finishCheckout();
    await takeScreenshot(driver, "checkout_success.png");
  });

  after(async function () {
    await driver.quit();
  });
});
