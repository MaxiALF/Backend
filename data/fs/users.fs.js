import fs from "fs";
import crypto from "crypto"; 

class userManager {
  constructor(path) {
    this.path = path;
    this.users = [];
    this.init();
  }
  init() {
    try {
      const file = fs.existsSync(this.path);
      if (file) {
        this.users = JSON.parse(fs.readFileSync(this.path, "utf-8"));
      } else {
        const data = JSON.stringify([], null, 2);
        fs.writeFileSync(this.path, data);
      }
    } catch (error) {
      return error.message
    }
  }
  async create(data) {
    try {
      if (!data) {
        throw new Error("please  insert data");
      } else {
        const user = {
          id: crypto.randomBytes(12).toString("hex"),
          name: data.name,
          photo: data.photo,
          email: data.email,
        };
        this.users.push(user);
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(this.users, null, 2)
        );
        console.log("Created ID: " + user.id);
        return user.id;
      }
    } catch (error) {
      return error.message;
    }
  }
  read() {
    try {
      if (this.users.length === 0) {
        throw new Error("Not found users!");
      } else {
        return this.users;
      }
    } catch (error) {
      return error.message;
    }
  }
  readOne(id) {
    try {
      const one = this.users.find((each) => each.id === id);
      if (!one) {
        throw new Error("Not found user!");
      } else {
        return one;
      }
    } catch (error) {
      return error.message;
    }
  }
  async destroy(id) {
    try {
      const one = this.users.find((each) => each.id === id);
      if (!one) {
        throw new Error("Not found users!");
      } else {
        this.users = this.users.filter((each) => each.id !== id);
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(this.users, null, 2)
        );
        console.log("destroy the ID: " + id);
        return one;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
}

const users = new userManager("./fs/files/users.json");
// async function manage() {

  // user.create({
  //   name: "Juan",
  //   photo: "https://profiles_photo_Juan",
  //   email: "JuanV@gmail.com",
  // });

  // user.create({
  //   name: "Lorena",
  //   photo: "https://Profiles_photos_Lorena",
  //   email: "LoreS@hotmail.com",
  // });

  // user.create({
  //   name: "Viviana",
  //   photo: "https://Profiles_photos_Viviana",
  //   email: "Vivi92@yahoo.com",
  // });

  // console.log(user.users);
  // console.log(user.read())
  // console.log(user.readOne("2"));
  // console.log(user.readOne('b62c850ff2e95d0bbfe3fccf'));
//   user.destroy('3');
//   user.destroy('1f05ef82b0928da30a89a3c5');
// }

// manage() 

export default users;