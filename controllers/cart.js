const { Product, CartItem } = require("../models/index.js");

const addItemToCart = async ({ productId, quantity }) => {
  const product = await Product.findByPk(productId);

  if (!product) {
    throw new Error("Product not found");
  }

  let cartItem = await CartItem.findOne({
    where: {
      productId,
    },
  });

  if (cartItem) {
    if (quantity <= 0) {
      await cartItem.destroy();
      return;
    }

    cartItem.quantity = quantity;
    cartItem.amount = cartItem.quantity * product.price;
    await cartItem.save();
  } else {
    cartItem = await CartItem.create({
      productId,
      quantity,
      amount: quantity * product.price,
    });
  }

  return cartItem;
};

const getCartItems = async () => {
  return CartItem.findAll({
    include: Product,
  });
};

const removeCartItem = async (productId) => {
  const cartItem = await CartItem.findOne({
    productId,
  });

  if (!cartItem) {
    throw new Error("Cart item not found");
  }

  await cartItem.destroy();
};

const clearCartItems = async () => {
  // await CartItem.bulkCreate([
  //   {
  //     productId: 1,
  //     quantity: 1,
  //     amount: 40,
  //   },
  // ]);
};

module.exports = {
  addItemToCart,
  getCartItems,
  removeCartItem,
  clearCartItems,
};
