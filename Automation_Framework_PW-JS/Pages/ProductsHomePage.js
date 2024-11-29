
exports.ProductsHomePage =

  class ProductsHomePage {
    constructor(page) {
      this.page = page;
      this.allProductList = '.inventory_list';
      this.productLink = "(//div[@data-test='inventory-item-name'])[1]";
      this.productPrices = "div[data-test='inventory-item-price']";
      this.addToCartBtn = 'button', { name: 'Add to cart' };
      this.removeBtn = '#remove';
      this.productNames = "div[data-test='inventory-item-name']";
      this.productDesc = "[data-test='inventory-item-desc']";
      this.productImageLink = "img[class='inventory_item_img']";

    }

    async addProductToCart(productName) {
      const productList = await this.page.$$(this.allProductList);
      for (const product of productList) {
        console.log(product)
        productName = await this.page.locator(this.productLink)
        await productName.click(this.productLink);
        await this.page.getByRole(this.addToCartBtn).last().click();
      }
    }

    async getProductsNameAndPrice() {
      const productNameList = await this.page.locator(this.productNames).allTextContents();
      const productPriceList = await this.page.locator(this.productPrices).allTextContents();
      return productNameList.map((name, index) => ({
        name,
        price: productPriceList[index],
      }))
    }

    async compareProductsData(product1, product2) {
      const productDiscrepancies = [];

      if (product1.length !== product2.length) {
        productDiscrepancies.push(`${product1.length} details are not matching with ${product2.length} `)
      }

      for (let i = 0; i < product1.length; i++) {
        const products1 = product1[i]
        const products2 = product2[i]

        if (products1.price !== products2.price) {
          productDiscrepancies.push(`${products1.price} details do not match with ${products2.price}`)
        }
        if (products1.name !== products2.name) {
          productDiscrepancies.push(`${products1.name} details do not match with ${products2.name}`)
        }
      }
      return console.log(productDiscrepancies);
    }

    async getAllProductsDetails() {
      const productNameList = await this.page.locator(this.productNames).allTextContents();
      const productPriceList = await this.page.locator(this.productPrices).allTextContents();
      const productDescription = await this.page.locator(this.productDesc).allTextContents();
      //capture all image elements
      const imageElements = await this.page.locator(this.productImageLink).elementHandles();
      const productImg = [];
      //loop through each image to extract the 'src' attributes
      for (let i = 0; i < imageElements.length; i++) {
        const imgSrc = await imageElements[i].getAttribute('src')
        productImg.push(imgSrc);
      }
      const productData = productNameList.map((name, index) => ({
        name,
        price: productPriceList[index],
        description: productDescription[index],
        img: productImg[index]
      }));
      console.log(productData)
      return productData;
    }

    async clickOnProductName(index){
      await this.page.locator(this.productNames).nth(index).click();
    }


  }





