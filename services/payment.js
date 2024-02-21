const axios = require("axios");
const { randomUUID } = require("crypto");
const qs = require('qs');

var username = process.env.JUSPAY_API_KEY; // Juspay API secret key
var password = ""; // Password is empty
var credentials = btoa(username + ":" + password);
var basicAuth = "Basic " + credentials;

async function createPaymentOrder(order, customer) {

  const data = qs.stringify({
    order_id: randomUUID(),
    amount: order.amount,
    currency: "INR",

    customer_id: customer.id,
    customer_email: customer.email,
    customer_phone: customer.phone,
    product_id: order.id,

    return_url: "http://localhost:3000/payment_result", // juspay: status = CHARGED, razorpay: status = paid
    description: "Generate Order",

    billing_address_first_name: order.billing_address_first_name,
    billing_address_last_name: order.billing_address_first_name,
    billing_address_line1: order.billing_address_first_name,
    billing_address_line2: order.billing_address_first_name,
    billing_address_line3: order.billing_address_first_name,
    billing_address_city: order.billing_address_first_name,
    billing_address_state: order.billing_address_first_name,
    billing_address_country: order.billing_address_first_name,
    billing_address_postal_code: order.billing_address_first_name,
    billing_address_phone: order.billing_address_first_name,
    billing_address_country_code_iso: order.billing_address_first_name,

    shipping_address_first_name: order.shipping_address_first_name,
    shipping_address_last_name: order.shipping_address_last_name,
    shipping_address_line1: order.shipping_address_line1,
    shipping_address_line2: order.shipping_address_line2,
    shipping_address_line3: order.shipping_address_line3,
    shipping_address_city: order.shipping_address_city,
    shipping_address_state: order.shipping_address_state,
    shipping_address_postal_code: order.shipping_address_postal_code,
    shipping_address_phone: order.shipping_address_phone,
    shipping_address_country_code_iso: order.shipping_address_country_code_iso,
    shipping_address_country: order.shipping_address_country,
  });

  let requestConfig = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://api.juspay.in/orders',
    headers: { 
      'version': '2023-06-30',
      'Content-Type': 'application/x-www-form-urlencoded',
      'x-merchantid': process.env.JUSPAY_MERCHANT_ID,
      'Authorization': basicAuth,
    },
    data: data
  };

  try {
    
    const res = await axios.request(requestConfig);
    console.log("Response", res);
    return {orderId: res.data.order_id};

  } catch(err) {
    console.log(JSON.stringify(err.response.data, null, 2));
    throw new Error('Error while creating payment order');
  }
}

async function initiateCardPayment(
  {orderId, amount},
  { cardNumber, cardExpiryMonth, cardExpiryYear, cardSecurityCode, nameOnCard }
) {
  let data = qs.stringify({
    order_id: orderId,
    merchant_id: process.env.JUSPAY_MERCHANT_ID,
    payment_method_type: "CARD",
    payment_method: "VISA",
    card_number: cardNumber,
    card_exp_month: cardExpiryMonth,
    card_exp_year: cardExpiryYear,
    name_on_card: nameOnCard,
    card_security_code: cardSecurityCode,
    save_to_locker: "true",
    tokenize: "true",
    redirect_after_payment: "true",
    format: "json",
  });

  let requestConfig = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://api.juspay.in/txns',
    headers: { 
      'Content-Type': 'application/x-www-form-urlencoded', 
      'Authorization': basicAuth,
    },
    data,
  };

  try {
    const response = await axios.request(requestConfig);

    const {
      payment: {
        authentication: { url },
      },
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
