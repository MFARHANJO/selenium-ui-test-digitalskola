const { Builder, By } = require("selenium-webdriver");
const assert = require("assert");
const chrome = require("selenium-webdriver/chrome");
const mocha = require("mocha");

describe("Saucedemo Test with Hooks and Annotations", function () {
  let driver;
  let options = new chrome.Options().addArguments("--headless");

  // Set timeout lebih panjang untuk setiap test case
  this.timeout(15000); // 15 detik

  before(async function () {
    driver = await new Builder().forBrowser("chrome").setChromeOptions(options).build();
  });

  after(async function () {
    await driver.quit();
  });

  it("User success login", async function () {
    await driver.get("https://www.saucedemo.com");
    await driver.findElement(By.id("user-name")).sendKeys("standard_user");
    await driver.findElement(By.id("password")).sendKeys("secret_sauce");
    await driver.findElement(By.id("login-button")).click();

    let titleText = await driver.findElement(By.css(".app_logo")).getText();
    assert.strictEqual(titleText.includes("Swag Labs"), true, "Login failed");
  });

  it("Validate user berada di dashboard setelah login", async function () {
    let currentUrl = await driver.getCurrentUrl();
    assert.strictEqual(currentUrl.includes("inventory.html"), true, "User is not on dashboard");
  });

  it("Add item to cart", async function () {
    await driver.findElement(By.className("inventory_item_name")).click();
    await driver.findElement(By.className("btn_inventory")).click();
  });

  it("Validate item sukses ditambahkan ke cart", async function () {
    let cartCount = await driver.findElement(By.className("shopping_cart_badge")).getText();
    assert.strictEqual(cartCount, "1", "Item gagal ditambahkan ke keranjang");
  });
});
