const { Builder, By, until } = require("selenium-webdriver");
const LoginPage = require("../pages/loginPage");
const InventoryPage = require("../pages/inventoryPage");
const testData = require("../fixtures/testData.json");
const { takeScreenshot } = require("../helper/visualTesting");

describe("Add to Cart Test", function () {
  this.timeout(10000);

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
    await driver.wait(until.elementLocated(By.className("btn_inventory")), 5000);
    await inventoryPage.addItemToCart();
    
    await driver.wait(until.elementLocated(By.className("shopping_cart_badge")), 5000);
    await takeScreenshot(driver, "add_to_cart.png");

    await inventoryPage.openCart(); // 🔥 Panggil openCart() untuk membuka keranjang
    await takeScreenshot(driver, "cart_page.png");
  });

  after(async function () {
    await driver.quit();
  });
});
