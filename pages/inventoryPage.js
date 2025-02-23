const { By } = require("selenium-webdriver");

class InventoryPage {
  constructor(driver) {
    this.driver = driver;
    this.addToCartButton = By.className("btn_inventory");
    this.cartIcon = By.className("shopping_cart_badge");
  }

  async addItemToCart() {
    await this.driver.findElement(this.addToCartButton).click();
  }

  async getCartItemCount() {
    return await this.driver.findElement(this.cartIcon).getText();
  }
}

module.exports = InventoryPage;
