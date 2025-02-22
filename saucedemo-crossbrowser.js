const { Builder, By } = require("selenium-webdriver");
const assert = require("assert");
const chrome = require("selenium-webdriver/chrome");
const firefox = require("selenium-webdriver/firefox");
const edge = require("selenium-webdriver/edge");

async function saucedemoLoginTest() {
  const browsers = [
    { name: "chrome", options: new chrome.Options().addArguments("--headless") },
    { name: "firefox", options: new firefox.Options().addArguments("--headless") },
    { name: "MicrosoftEdge", options: new edge.Options().addArguments("--headless") },
  ];

  for (let browser of browsers) {
    let driver = await new Builder()
      .forBrowser(browser.name)
      .setChromeOptions(browser.name === "chrome" ? browser.options : undefined)
      .setFirefoxOptions(browser.name === "firefox" ? browser.options : undefined)
      .setEdgeOptions(browser.name === "MicrosoftEdge" ? browser.options : undefined)
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

      // Add item to cart
      await driver.findElement(By.className("inventory_item_name")).click();
      await driver.findElement(By.className("btn_inventory")).click();

      // Validate item sukses ditambahkan ke cart
      let cartCount = await driver.findElement(By.className("shopping_cart_badge")).getText();
      assert.strictEqual(cartCount, "1", "Item gagal ditambahkan ke keranjang");
      console.log(`Login & Cart Test Success in Headless Mode on ${browser.name}`);
    } finally {
      await driver.quit();
    }
  }
}

saucedemoLoginTest();
