const sql = require('./db')

const Category = function (category) {
    this.id = category.id;
    this.name = category.name;
    this.image = category.image;
}

Category.getAllCategory = result => {
    sql.query("SELECT * FROM categories", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("products: ", res);
        result(null, res);
    });
}

module.exports = Category;
