const { DataTypes } = require("sequelize");
const sequelize = require("./sequelize");

const Order = sequelize.define(
  "order",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    customerId: DataTypes.STRING,
    orderId: DataTypes.STRING, // payment gateway order id
    amount: DataTypes.DECIMAL(10, 2),

    billing_address_first_name: DataTypes.STRING,
    billing_address_last_name: DataTypes.STRING,
    billing_address_line1: DataTypes.STRING,
    billing_address_line2: DataTypes.STRING,
    billing_address_line3: DataTypes.STRING,
    billing_address_city: DataTypes.STRING,
    billing_address_state: DataTypes.STRING,
    billing_address_country: DataTypes.STRING,
    billing_address_postal_code: DataTypes.STRING,
    billing_address_phone: DataTypes.STRING,
    billing_address_country_code_iso: DataTypes.STRING,

    shipping_address_first_name: DataTypes.STRING,
    shipping_address_last_name: DataTypes.STRING,
    shipping_address_line1: DataTypes.STRING,
    shipping_address_line2: DataTypes.STRING,
    shipping_address_line3: DataTypes.STRING,
    shipping_address_city: DataTypes.STRING,
    shipping_address_state: DataTypes.STRING,
    shipping_address_postal_code: DataTypes.STRING,
    shipping_address_phone: DataTypes.STRING,
    shipping_address_country_code_iso: DataTypes.STRING,
    shipping_address_country: DataTypes.STRING,
  },
  { timestamps: true }
);

module.exports = Order;
