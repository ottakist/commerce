const stripe = require('stripe')(
  'sk_test_51MkTZkHRxMBDPmELclpV8qJjcFse9Oe6r060vdCWOBPh9Z4ivcKHQpJFcsRijEtFibohJ0qEhhrJy7qcbpRQtOOe00SuwepNoM'
);

exports.handler = async function(event, context) {
  if (event.body) {
    const { cart, fee, total_amount } = JSON.parse(event.body);
    const calculateOrderAmount = () => {
      return fee + total_amount;
    };
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(),
        currency: 'usd',
      });
      return {
        statusCode: 200,
        body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: error.message }),
      };
    }
  }
  return { statusCode: 200, body: 'Create Payment Intent' };
};
