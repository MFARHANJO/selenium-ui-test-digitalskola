const { By } = require("selenium-webdriver");

class InventoryPage {
  constructor(driver) {
    this.driver = driver;
    this.addToCartButton = By.className("btn_inventory");
    this.cartIcon = By.className("shopping_cart_link"); // Ikon cart di kanan atas
  }

  async addItemToCart() {
    await this.driver.findElement(this.addToCartButton).click();
  }

  async openCart() {
    await this.driver.findElement(this.cartIcon).click(); // Klik ikon cart
  }
}

module.exports = InventoryPage;
