const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

async function saucedemoLoginTest() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.get('https://www.saucedemo.com/');

        await driver.findElement(By.id('user-name')).sendKeys('standard_user');
        await driver.findElement(By.id('password')).sendKeys('secret_sauce');

        await driver.findElement(By.id('login-button')).click();

        let titleText = await driver.findElement(By.className('app_logo')).getText();
        assert.strictEqual(titleText.includes('Swag Labs'), true, 'Title does not include "Swag Labs"');

    
        await driver.findElement(By.id('add-to-cart-sauce-labs-backpack')).click();

        
        let cartBadge = await driver.findElement(By.className('shopping_cart_badge')).getText();
        assert.strictEqual(cartBadge, '1', 'Item was not added to cart');

        console.log('Test berhasil!');

        console.log('Menunggu 20 detik sebelum browser ditutup...');
        await new Promise(resolve => setTimeout(resolve, 20000));

    } catch (error) {
        console.error('Terjadi kesalahan:', error);
    } finally {
        await driver.quit();
        console.log('Browser ditutup.');
    }
}
saucedemoLoginTest();
