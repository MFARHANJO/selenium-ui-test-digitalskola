const { Builder, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");
const chrome = require("selenium-webdriver/chrome");

async function saucedemoLoginTest() {
  let options = new chrome.Options().addArguments("--headless");

  let driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

  try {
    // User success login
    await driver.get("https://www.saucedemo.com");
    await driver.findElement(By.id("user-name")).sendKeys("standard_user");
    await driver.findElement(By.id("password")).sendKeys("secret_sauce");
    await driver.findElement(By.id("login-button")).click();

    // Validate user berada di dashboard setelah login
    let titleText = await driver.findElement(By.css(".app_logo")).getText();
    assert.strictEqual(titleText.includes("Swag Labs"), true, "Login failed");
    console.log("Login Test Success!");

    // Add item to cart
    await driver.findElement(By.className("inventory_item_name")).click();
    await driver.findElement(By.className("btn_inventory")).click();

    // Validate item sukses ditambahkan ke cart
    let cartCount = await driver.findElement(By.className("shopping_cart_badge")).getText();
    assert.strictEqual(cartCount, "1", "Item gagal ditambahkan ke keranjang");
    console.log("Item successfully added to cart!");
  } finally {
    await driver.quit();
  }
}

saucedemoLoginTest();
