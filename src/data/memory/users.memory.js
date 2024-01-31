class userManager {
  static #users = [];

  create(data) {
    const user = {
      id:
        userManager.#users.length === 0
          ? 1
          : userManager.#users[userManager.#users.length - 1].id + 1,
      name: data.name,
      photo: data.photo,
      email: data.email,
    };
    userManager.#users.push(user);
  }
  read() {
    return userManager.#users;
  }
  readOne(id) {
    return userManager.#users.find((each) => each.id === Number(id));
  }
  readByEmail(email) {
    try {
      const one = userManager.#users.find(
        (each) => each.email === String(email)
      );
      if (!one) {
        throw new Error("Not found email");
      } else {
        return one;
      }
    } catch (error) {
      return error.message;
    }
  }
  destroy(id) {
    try {
      const one = userManager.#users.find((each) => each.id === Number(id));
      if (!one) {
        throw new Error("Not found user!");
      } else {
        userManager.#users = userManager.#users.filter(
          (each) => each.id !== Number(id)
        );
        console.log("destroy the ID: " + Number(id));
        return one.id;
      }
    } catch (error) {
      return error.message;
    }
  }

  update(id, data) {
    try {
      const upOne = userManager.#users.findIndex(
        (each) => each.id === Number(id)
      );

      if (upOne === -1) {
        throw new Error(`user with ID ${id} not found.`);
      }

      const updateduser = {
        id: Number(id),
        name: data.name || userManager.#users[upOne].name,
        photo: data.photo || userManager.#users[upOne].photo,
        email: data.email || userManager.#users[upOne].email,
      };

      userManager.#users[upOne] = updateduser;

      console.log(`Updated user with ID: ${id}`);
      return updateduser.id;
    } catch (error) {
      console.error(error.message);
      return error.message;
    }
  }
}

const users = new userManager();

users.create({
  name: "Samuel",
  photo:
    "https://img.freepik.com/psd-gratis/3d-ilustracion-persona_23-2149436179.jpg?t=st=1702018581~exp=1702019181~hmac=15d317d4dafd03eb79f4cbd733fff447f3b95fdb6de51906b2037018f9d532e5",
  email: "sam123@mail.com",
});
users.create({
  name: "Hector",
  photo:
    "https://img.freepik.com/psd-gratis/ilustracion-3d-persona-pelo-punk-chaqueta_23-2149436198.jpg",
  email: "Hector90@Gmail.com",
});
users.create({
  name: "Sophia",
  photo:
    "https://img.freepik.com/psd-gratis/3d-ilustracion-persona-gafas_23-2149436185.jpg?w=740&t=st=1702018581~exp=1702019181~hmac=e303367fc9e292eb7cef43e9760278a4b035a858b5d5ffd7ae0b294de9560dc0",
  email: "SophiS@yahoo.com.ar",
});

// console.log(users.read());
// console.log(users.readOne(3));
// console.log(users.destroy(1));
// console.log(users.destroy(10));
// users.update(2, {
//     name: "sheyla",
//     photo: "https://profile/photo/img",
//     email: "sh@hotmail.com",
// });

// console.log(users.read());
// console.log(users.readByEmail("Hector90@Gmail.com"));
// console.log(users.readByEmail("Homer@Gmail.com"));
