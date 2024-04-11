import { faker } from "@faker-js/faker";
import repository from "../../repositories/users.repository.js";
import createProduct from "./products.mock.js";

function usersMock() {
  return {
    name: faker.person.firstName(),
    email:
      (faker.person.firstName() + faker.person.lastName()).toLowerCase() +
      "@mail.com",
    password: "hello123",
  };
}

async function createMocks() {
  try {
    const user = await repository.create(usersMock());
    for (let i = 1; i <= 9; i++) {
      await createProduct(user._id);
    }
  } catch (error) {
    console.log(error);
  }
}
for (let i = 1; i <= 10; i++) {
  await createMocks();
}
console.log("MOCKED!");

createMocks();
