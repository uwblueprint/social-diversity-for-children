import Stripe from "stripe";

// set up stripe instance
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2020-08-27",
});

export { stripe };
