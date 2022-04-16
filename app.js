const express = require("express");
const bodyParser = require("body-parser");
const mysql = require('mysql');
const router = express.Router();
const app = express();
const SERVER_PORT = 8080;

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let connectionObj = {
    user: "root",
    password: "root",
    host: "localhost",
    port: 8889,
    database: "nodejs"
}
if(process.argv[2] === 'ola'){
  connectionObj = {
      user: "root",
      password: "",
      host: "localhost",
      port: 3306,
      database: "nodejs"
  }
}

const connection = mysql.createConnection(connectionObj);
connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

router.get("/", function (req, res) {
    
    const queryStr = "SELECT * FROM inventory;";

    connection.query(queryStr, function (err, result) {
        res.render("index", { data: result });
    });
});

router.get("/add-product", function (req, res) {
    res.render("./add-product");
});

//product page
router.get("/product/:id", function (req, res) {
    const queryStr = `SELECT * FROM inventory WHERE id = ${req.params.id};`;
    res.render("./product");
});

//about page
router.get("/about", function (req, res) {
    res.render("./about");
});


router.post("/add-product-submit", function (req, res) {
    // console.log(req);
    const queryStr = `INSERT INTO inventory (product_name, category, quantity, warehouse, product_cost) VALUES ('${req.body.product_name}', '${req.body.category}', '${req.body.quantity}', '${req.body.warehouse}', '${req.body.product_cost}' );`
    
    connection.query(queryStr);
    
    res.writeHead(302, { Location: "/" });
    res.end();
    
})


router.post("/delete-product-submit", function (req, res) {
    const queryStr = `DELETE FROM inventory WHERE id=${req.body.id};`

    connection.query(queryStr);

    res.writeHead(302, { Location: "/" });
    res.end();
})

app.use("/", router);
  
app.listen(SERVER_PORT);
console.log(`Server is running in port ${SERVER_PORT}`);
