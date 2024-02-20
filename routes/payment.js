const {
  createOrder,
  initiatePaymentViaCard,
} = require("../controllers/payment");

const PaymentRouter = require("express").Router();

PaymentRouter.post("/order", async (req, res) => {
  try {
    const customerId = req.auth.id;

    const { address_details: addressDetails } = req.body;

    console.log("customerId", customerId);

    const { orderId } = await createOrder(customerId, addressDetails);

    res.json({ data: { orderId } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

PaymentRouter.post("/pay_via_card", async (req, res) => {
  try {
    const {
      orderId,
      cardNumber,
      cardSecurityCode,
      nameOnCard,
      cardExpiryMonth,
      cardExpiryYear,
    } = req.body;

    const { paymentUrl } = await initiatePaymentViaCard(orderId, {
      cardNumber,
      cardExpiryMonth,
      cardExpiryYear,
      cardSecurityCode,
      nameOnCard,
    });

    res.json({ data: { paymentUrl } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = PaymentRouter;
