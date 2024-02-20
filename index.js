const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const ProductRouter = require("./routes/products");
const CartRouter = require("./routes/cart");
const PaymentRouter = require("./routes/payment");
const auth = require("./middleware/auth");

function logger(req, res, next) {
  console.log(new Date(), req.method, req.path);

  next();
}

app.use(logger);
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/products", ProductRouter);
app.use("/api/cart", auth, CartRouter);
app.use("/api/payment", auth, PaymentRouter);

app.get("/*", (req, res) => {
  let file = path.join(__dirname, "public", "index.html");
  res.sendFile(file);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

module.exports = app;
