exports.ProductsDetailsPage =

  class ProductsDetailsPage {
    constructor(page) {
      this.page = page;
      this.productDescription = "div[class='inventory_details_desc large_size']";
      this.backButton = "button[id='back-to-products']";
      this.productName = "div[class='inventory_details_name large_size']";
      this.productPrice = "div[data-test='inventory-item-price']";
      this.productImage = "img[class='inventory_details_img']";
    }

    async getEachProductDetails() {
      const name = await this.page.locator(this.productName).textContent();
      const price = await this.page.locator(this.productPrice).textContent();
      const description = await this.page.locator(this.productDescription).textContent();
      const img = await this.page.locator(this.productImage).getAttribute('src');
      return (name, price, description, img)
    }

    async goBackToProductsHomePage() {
      await this.page.locator(this.backButton).click();
    }
  }