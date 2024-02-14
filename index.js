const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const ProductRouter = require('./routes/products');
const CartRouter = require('./routes/cart');
const PaymentRouter = require('./routes/payment');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/api/products", ProductRouter);
app.use("/api/cart", CartRouter);
app.use("/api/payment", PaymentRouter);

app.get('/*', (req, res) => {
    let file = path.join(__dirname, 'public', 'index.html')
    res.sendFile(file)
})

app.listen(process.env.PORT || 3000, () => {
    console.log("Server running on http://localhost:3000");
});

module.exports = app;