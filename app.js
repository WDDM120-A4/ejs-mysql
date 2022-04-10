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

const connection = mysql.createConnection({
    user: "root",
    password: "root",
    host: "localhost",
    port: 8889,
    database: "nodejs"
})

router.get("/", function (req, res) {
    
    const queryStr = "SELECT * FROM inventory;";

    connection.query(queryStr, function (err, result) {
        res.render("index", { data: result });
    });
});

router.get("/add-product", function (req, res) {
    res.render("./add-product");
});

router.post("/add-product-submit", function (req, res) {
    // console.log(req);
    const queryStr = `INSERT INTO inventory (product_name, category, quantity, warehouse, product_cost) VALUES ('${req.body.product_name}', '${req.body.category}', '${req.body.quantity}', '${req.body.warehouse}', '${req.body.product_cost}' );`
    
    connection.query(queryStr);
    
    res.writeHead(302, { Location: "/" });
    res.end();
    
})


router.delete("/delete-product-submit", function (req, res) {
    console.log(req);
    const queryStr = `DELETE FROM inventory WHERE id=9;`

    connection.query(queryStr);

    res.writeHead(302, { Location: "/" });
    res.end();
})

app.use("/", router);

app.listen(SERVER_PORT);
console.log(`Server is running in port ${SERVER_PORT}`);