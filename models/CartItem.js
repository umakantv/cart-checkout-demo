const { DataTypes } = require("sequelize");
const sequelize = require("./sequelize");

const CartItem = sequelize.define(
  "cart_items",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    productId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    amount: DataTypes.DECIMAL(4, 2),
  },
  { timestamps: true }
);

module.exports = CartItem;
