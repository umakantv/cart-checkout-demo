const {
  createPaymentOrder,
  initiateCardPayment,
} = require("../services/payment");
const { getCartItems } = require("./cart");
const { Order, Customer } = require("../models/index");

async function createOrder(customerId, addressDetails) {
  const customer = await Customer.findByPk(customerId);
  const cartItems = await getCartItems({ customer });

  const totalAmount = cartItems.reduce(
    (acc, cartItem) => cartItem.amount + acc,
    0
  );

  const order = await Order.create({
    customerId,
    amount: totalAmount,
    ...addressDetails,
  });

  const { orderId } = await createPaymentOrder(order, customer);

  order.orderId = orderId;
  await order.save();

  return { orderId };
}

async function initiatePaymentViaCard(
  orderId,
  { cardNumber, cardExpiryMonth, cardExpiryYear, cardSecurityCode, nameOnCard }
) {
  const { url: paymentUrl } = await initiateCardPayment(orderId, {
    cardNumber,
    cardExpiryMonth,
    cardExpiryYear,
    cardSecurityCode,
    nameOnCard,
  });

  console.log({ paymentUrl });

  return { paymentUrl };
}

module.exports = { createOrder, initiatePaymentViaCard };
