import { faker } from "@faker-js/faker";
import repository from "../../repositories/products.repository.js";
import logger from "../../utils/logger/index.js";

function productMock(id) {
  return {
    title: faker.commerce.product(),
    user_id: id,
    price: faker.commerce.price({ min: 10000, max: 10000000 }),
    stock: faker.number.int({ min: 1, max: 500 }),
  };
}

export default async function createProduct(id) {
  try {
    await repository.create(productMock(id));
  } catch (error) {
    logger.ERROR(error);
  }
}

createProduct();
