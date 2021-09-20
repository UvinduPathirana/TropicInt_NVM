const sql = require('./db')

const Product = function (product) {
    this.id = product.id;
    this.categoryId = product.categoryId;
    this.name = product.name;
    this.image = product.image;
}

Product.getAll = result => {
    sql.query("SELECT * FROM products", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("products: ", res);
        result(null, res);
    });
}

Product.getProductByCategoryId = (categoryId, result) => {
    console.log("product categoryId", categoryId)
    sql.query("SELECT * FROM tropicint.products where CategoryId=" + parseInt(categoryId), (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("products: ", res);
        result(null, res);
    });
}

Product.getProductById = (productId, result) => {
    console.log("product id is", productId)
    sql.query("SELECT * FROM tropicint.products where Id =" + parseInt(productId), (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        let object = res[0];
        console.log("product: ", object);
        result(null, object);
    }
    )
}

// Add a new product 
Product.postProduct = (product, result, req) => {
    console.log("product is", product)
    let prod = req.body;
    var sql = "SET @Id = ?; SET @Name = ?; SET @CategoryId = ?; SET @Image = ?; CALL ProductAddOrEdit(@Id,@Name,@EmpCode,@Salary);";
    sql.query(sql,[prod.Id, prod.Name, prod.CategoryId, prod.Image], (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("product: ", res);
        result(null, res);
    }
    )
}

Product.create = (newProduct, result) => {
    sql.query("INSERT INTO products SET ?", newProduct, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created customer: ", { id: res.insertId, ...newProduct });
      result(null, { id: res.insertId, ...newProduct });
    });
  };

// Delete product
Product.deleteProductById = (id, result) => {
    sql.query("Delete FROM tropicint.products where id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
            return;
        }

        console.log("products: ", res);
        result(null, res);
    });
}

module.exports = Product;
