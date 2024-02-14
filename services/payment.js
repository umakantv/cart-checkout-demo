const axios = require("axios");
const { randomUUID } = require("crypto");
const qs = require('qs');

var username = process.env.JUSPAY_API_KEY; // Juspay API secret key
var password = "";
var credentials = btoa(username + ":" + password);
var basicAuth = "Basic " + credentials;

async function createPaymentOrder(amount) {
  const orderId = randomUUID();

  console.log(basicAuth, orderId, amount);

  const data = qs.stringify({
    order_id: orderId,
    amount: amount,
    currency: "INR",

    customer_id: "guest_user_101",
    customer_email: "customer@gmail.com",
    customer_phone: "9988665522",
    product_id: "prod-141833",
    return_url: "http://localhost:3000/payment_result", // juspay: status = CHARGED, razorpay: status = paid
    description: "Generate Order",

    billing_address_first_name: "Juspay",
    billing_address_last_name: "Technologies",
    billing_address_line1: "Girija Building",
    billing_address_line2: "Ganapathi Temple Road",
    billing_address_line3: "8th Block, Koramangala",
    billing_address_city: "Bengaluru",
    billing_address_state: "Karnataka",
    billing_address_country: "India",
    billing_address_postal_code: "560095",
    billing_address_phone: "9988775566",
    billing_address_country_code_iso: "IND",

    shipping_address_first_name: "Juspay",
    shipping_address_last_name: "Technologies",
    shipping_address_line1: "Girija Building",
    shipping_address_line2: "Ganapathi Temple Road",
    shipping_address_line3: "8th Block, Koramangala",
    shipping_address_city: "Bengaluru",
    shipping_address_state: "Karnataka",
    shipping_address_postal_code: "560095",
    shipping_address_phone: "9962881912",
    shipping_address_country_code_iso: "IND",
    shipping_address_country: "India",
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
    
    await axios.request(requestConfig);

  } catch(err) {
    console.log(JSON.stringify(err.response.data, null, 2));
    throw new Error('Error while creating payment order');
  }

  return { orderId };
}

async function initiateCardPayment(
  orderId,
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
