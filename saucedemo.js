const { Builder, By } = require("selenium-webdriver");
const assert = require("assert");
const chrome = require("selenium-webdriver/chrome");

// Pilih browser ("chrome" atau "firefox")
const browserName = "chrome";

// Konfigurasi mode headless
const chromeOptions = new chrome.Options().headless();

// Fungsi untuk mendapatkan driver berdasarkan browser yang dipilih
const getDriver = async (browser) => {
  let driver;
  switch (browser) {
    case "chrome":
      driver = await new Builder().forBrowser("chrome").setChromeOptions(chromeOptions).build();
      break;
    default:
      throw new Error("Browser tidak dikenali");
  }
  return driver;
};

describe("Saucedemo Automation Test", function () {
  let driver;

  // Mengatur timeout 10 detik untuk setiap pengujian
  this.timeout(10000);

  // Hook sebelum tes dijalankan
  before(async function () {
    driver = await getDriver(browserName);
  });

  // Hook setelah tes selesai
  after(async function () {
    await driver.quit();
  });

  // Test Case 1: User berhasil login
  it("User berhasil login dan masuk ke dashboard", async function () {
    await driver.get("https://www.saucedemo.com/");

    // Input username dan password
    await driver.findElement(By.id("user-name")).sendKeys("standard_user");
    await driver.findElement(By.id("password")).sendKeys("secret_sauce");
    await driver.findElement(By.id("login-button")).click();

    // Verifikasi user masuk ke dashboard
    const url = await driver.getCurrentUrl();
    assert.strictEqual(url.includes("inventory.html"), true, "Login gagal");
  });

  // Test Case 2: Menambahkan item ke keranjang
  it("Menambahkan item ke keranjang dan memverifikasi", async function () {
    await driver.findElement(By.className("inventory_item_name")).click();
    await driver.findElement(By.className("btn_inventory")).click();

    // Verifikasi item ada di keranjang
    const cartCount = await driver.findElement(By.className("shopping_cart_badge")).getText();
    assert.strictEqual(cartCount, "1", "Item gagal ditambahkan ke keranjang");
  });

  // Test Case 3: Validasi user berada di dashboard setelah login
  it("Validasi user berada di dashboard setelah login", async function () {
    const titleText = await driver.findElement(By.css(".app_logo")).getText();
    assert.strictEqual(titleText.includes("Swag Labs"), true, "User tidak berada di dashboard");
  });

  // Test Case 4: Validasi item sukses ditambahkan ke cart
  it("Validasi item sukses ditambahkan ke cart", async function () {
    const cartBadge = await driver.findElement(By.className("shopping_cart_badge")).getText();
    assert.strictEqual(cartBadge, "1", "Item tidak ditambahkan dengan benar");
  });
});
