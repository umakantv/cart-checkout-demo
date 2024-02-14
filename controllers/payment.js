const {
  createPaymentOrder,
  initiateCardPayment,
} = require("../services/payment");

async function createOrder(amount) {
  const { orderId } = await createPaymentOrder(amount);

  console.log("orderId", orderId);

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

  return { paymentUrl };
}

module.exports = { createOrder, initiatePaymentViaCard };
