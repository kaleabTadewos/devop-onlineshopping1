let cart = [];

module.exports = class Cart {

  static addProduct(id, productPrice) {
    if (cart.length == 0) {
      cart = { products: [], totalPrice: 0 };
    }
    const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
    const existingProduct = cart.products[existingProductIndex];
    let updatedProduct;

    // Add new product/ increase quantity
    if (existingProduct) {
      updatedProduct = { ...existingProduct };
      updatedProduct.qty = updatedProduct.qty + 1;
      cart.products = [...cart.products];
      cart.products[existingProductIndex] = updatedProduct;
    } else {
      updatedProduct = { id: id, qty: 1 };
      cart.products = [...cart.products, updatedProduct];
    }
    cart.totalPrice = cart.totalPrice + +productPrice;
  }

  static deleteProduct(id, productPrice) {
    let updatedCart = cart;
    const product = updatedCart.products.find(prod => prod.id === id);
    if (!product) {
      return;
    }
    const productQty = product.qty;
    updatedCart.products = updatedCart.products.filter(
      prod => prod.id !== id
    );
    updatedCart.totalPrice =
      updatedCart.totalPrice - productPrice * productQty;
  }

  static getCart() {
    return cart;
  }

  static isEmpty() {
    return cart.length <= 0;
  }

};
