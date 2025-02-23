const { Builder, By, until } = require("selenium-webdriver");
const LoginPage = require("../pages/loginPage");
const InventoryPage = require("../pages/inventoryPage");
const CartPage = require("../pages/cartPage");
const CheckoutPage = require("../pages/checkoutPage");
const testData = require("../fixtures/testData.json");
const { takeScreenshot } = require("../helper/visualTesting");

describe("Checkout Test", function () {
  this.timeout(20000); // ⏳ Perpanjang timeout jadi 20 detik

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

    // 🔥 Tambahkan item ke cart dan tunggu ikon cart muncul
    await inventoryPage.addItemToCart();
    await driver.wait(until.elementLocated(By.className("shopping_cart_badge")), 10000);
    await takeScreenshot(driver, "cart_with_items.png");

    // 🔥 Buka cart sebelum checkout
    await inventoryPage.openCart();
    await takeScreenshot(driver, "cart_before_checkout.png");

    // 🔥 Tunggu tombol "Checkout" muncul sebelum klik
    await driver.wait(until.elementLocated(By.id("checkout")), 10000);
    await cartPage.proceedToCheckout();
  });

  it("Complete checkout process", async function () {
    await driver.wait(until.elementLocated(By.id("first-name")), 10000); // 🔥 Tunggu form checkout muncul
    await checkoutPage.enterCheckoutInfo("Farhan", "Jundi", "44151");
    await takeScreenshot(driver, "checkout_info.png");

    await driver.wait(until.elementLocated(By.id("finish")), 10000); // 🔥 Tunggu tombol "Finish"
    await checkoutPage.finishCheckout();
    await takeScreenshot(driver, "checkout_success.png");
  });

  after(async function () {
    await driver.quit();
  });
});
