const { connection } = require('./config/database')
const mysql = require('mysql');
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const multer = require('multer');

const app = express();
// parse requests of content-type - application/json
app.use(express.json());
app.use(bodyParser.json());

// configure cors
var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}

const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'uploads')
    },
    filename: (req, file, callBack) => {
        callBack(null, `FunOfHeuristic_${file.originalname}`)
    }
  })
  
const upload = multer({ storage: storage })

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }), cors(corsOptions));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to tropicint application." });
});

app.post('/file', upload.single('file'), (req, res, next) => {
    const file = req.file;
    console.log(file.filename);
    if (!file) {
      const error = new Error('No File')
      error.httpStatusCode = 400
      return next(error)
    }
      res.send(file);
  })

require("./routes/product.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

// Connecytion to mysql
connection.connect((err) => {
    if (err) {
        throw err;
    } else {
        console.log('Connected!');
    }
});
