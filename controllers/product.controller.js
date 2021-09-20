const Product = require('../models/product.model');

exports.findAll = (req, res) => {
    Product.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving products."
            });
        else res.send(data);
    });
};

exports.findCategory = (req, res) => {
    Product.getProductByCategoryId(req.params.categoryId, (err, data) => {
        console.log(req.params.categoryId);
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving products."
            });
        else res.send(data);
    });
};

exports.getProductbyIdController = (req, res) => {
  Product.getProductById(req.params.productId, (err, data) => {
      console.log(req.params.productId);
      if (err)
          res.status(500).send({
              message:
                  err.message || "Some error occurred while retrieving products."
          });
      else res.send(data);
  });
};

// Create and Save a new Customer
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Customer
  const product = new Product({
    id: null,
    name: req.body.Name,
    categoryId: req.body.CategoryId,
    image: req.body.Image
  });

  // Save Customer in the database
  Product.create(product, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer."
      });
    else res.send(data);
  });
};

exports.deleteProduct = (req, res) => {
    Product.deleteProductById(req.params.productId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.productId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Customer with id " + req.params.productId
          });
        }
      } else res.send({ message: `Customer was deleted successfully!` });
    });
  };
