const Category = require('../models/category.model');

exports.findAllCategory = (req, res) => {
    Category.getAllCategory((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving products."
            });
        else res.send(data);
    });
};