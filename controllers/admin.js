const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product'
    });
};

exports.getProducts = (req, res, next) => {
    res.render('admin/products', {
        pageTitle: 'Products',
        path: '/admin/products',
        prods: Product.fetchAll()
    });
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(null, title, imageUrl, price, description);
    product.save();
    res.redirect('/');
};

exports.getEditProduct = (req, res, next) => {
    const prodId = req.params.prodId;
    res.render('admin/edit-product', {
        product: Product.findById(prodId),
        pageTitle: 'Edit Product',
        path: '/admin/products',
    })
}

exports.postEditProduct = (req, res, next) => {
    const id = req.body.id;
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(id, title, imageUrl, price, description);
    product.update();
    res.redirect('/admin/products');
}

exports.postDeleteProduct = (req, res, next) => {
    Product.deleteById(req.body.id);
    res.redirect('/admin/products');
}