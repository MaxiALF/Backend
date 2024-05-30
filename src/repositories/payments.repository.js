import Stripe from "stripe";
import paymentDTO from "../dto/payment.dto,js";
import dao from "../data/index.factory.js";

const { orders } = dao;

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const PaymentsRepository = async (filter) => {
  try {
    let onCart = await orders.read(filter);
    onCart = onCart.map((each) => new paymentDTO(each));
    // console.log(onCart);
    const line_items = onCart;
    const mode = "payment";
    const success_url = "http://localhost:8080/confirmed.html";
    const intent = await stripe.checkout.sessions.create({
      line_items,
      mode,
      success_url,
    });
    return intent;
  } catch (error) {
    throw error;
  }
};

const repository = new PaymentsRepository();
export default repository;
