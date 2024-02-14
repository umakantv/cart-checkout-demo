const {
  removeCartItem,
  addItemToCart,
  getCartItems,
  clearCartItems,
} = require("../controllers/cart");

const CartRouter = require("express").Router();

CartRouter.get("/", async (req, res) => {
  try {
    const cartItems = await getCartItems();
    res.json({ data: cartItems});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

CartRouter.post("/", async (req, res) => {
  try {
    const cartItem = await addItemToCart(req.body);
    res.json({ data: cartItem});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

CartRouter.delete("/:productId", async (req, res) => {
  try {
    await removeCartItem(req.params.productId);
    res.json({ message: "Cart item removed" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

CartRouter.delete("/", async (req, res) => {
  try {
    await clearCartItems();
    res.json({ message: "Cart cleared" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = CartRouter;
