module.exports = app => {
    const products = require("../controllers/product.controller");
    const category = require("../controllers/category.controller");

    // Get All Products
    app.get("/products", products.findAll);
    app.post("/products", products.create);
    app.get("/categories/:categoryId", products.findCategory);
    app.get("/products/:productId", products.getProductbyIdController);

    // Delete Product
    app.delete("/products/delete/:productId", products.deleteProduct);

    // Get All Categories

    app.get("/categories", category.findAllCategory);
}
