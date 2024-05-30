class paymentDTO {
  constructor(data) {
    this.price_data = {
      product_data: { tilte: data.product_id.tilte },
      currency: "usd",
      unit_amount: data.product_id.price * 100,
    };
    this.quantity = data.quantity;
  }
}

export default paymentDTO;
