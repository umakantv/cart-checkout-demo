const axios = require("axios");
const { randomUUID } = require("crypto");

async function createPaymentOrder(order, customer) {
  const orderId = randomUUID();

  const data = {
    amount: order.amount * 100, // Razorpay uses amount in paise
    currency: "INR",
    receipt: orderId,
    notes: {
      order_id: orderId,
      product_id: order.id,
      customer_id: customer.id,
      customer_email: customer.email,
      customer_phone: customer.phone,
      // Add any other data from Juspay's API that's not directly used by Razorpay here
    },
  };

  try {
    const response = await axios.post('https://api.razorpay.com/v1/orders', data, {
      auth: {
        username: process.env.RAZORPAY_KEY_ID,
        password: process.env.RAZORPAY_KEY_SECRET,
      },
    });

    return {orderId: response.data.id};
  } catch(err) {
    console.log(JSON.stringify(err.response.data, null, 2));
    throw new Error('Error while creating payment order');
  }

  // return { orderId };
}

async function initiateCardPayment(
  {orderId, amount},
  { cardNumber, cardExpiryMonth, cardExpiryYear, cardSecurityCode, nameOnCard }
) {
  const data = {
    amount: amount * 100, // Razorpay uses amount in paise
    currency: "INR",
    order_id: orderId,
    method: "card",
    card: {
      number: cardNumber,
      expiry_month: cardExpiryMonth,
      expiry_year: cardExpiryYear,
      cvv: cardSecurityCode,
      name: nameOnCard,
    },
    // Add dummy values for required fields
    contact: "9900008989",
    email: "gaurav.kumar@example.com",
    authentication: {
      authentication_channel: "browser",
    },
    browser: {
      java_enabled: false,
      javascript_enabled: false,
      timezone_offset: 11,
      color_depth: 23,
      screen_width: 23,
      screen_height: 100,
    },
    ip: "105.106.107.108",
    referer: "https://merchansite.com/example/paybill",
    user_agent: "Mozilla/5.0",
    notes: {
      key1: "value1",
    },
  };

  try {
    const response = await axios.post('https://api.razorpay.com/v1/payments/create/json', data, {
      auth: {
        username: process.env.RAZORPAY_KEY_ID,
        password: process.env.RAZORPAY_KEY_SECRET,
      },
    });

    const {
      next: [
        {
          url,
        },
      ],
    } = response.data;

    return { url };
  } catch(err) {
    console.log(err.response.data);
    throw new Error('Error while initiating card payment');
  }
}

module.exports = {
  createPaymentOrder,
  initiateCardPayment,
};