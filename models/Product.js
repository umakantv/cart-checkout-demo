const { DataTypes } = require("sequelize");
const sequelize = require("./sequelize");

const Product = sequelize.define(
  "product",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL(4, 2),
    description: DataTypes.TEXT,
    image: DataTypes.STRING,
  },
  { timestamps: true }
);

module.exports = Product;
