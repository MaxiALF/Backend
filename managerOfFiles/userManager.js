const fs = require("fs");

class userManager {
    constructor(path) {
    this.path = path;
    this.users = [];
    this.init();
    }
    init() {
    const file = fs.existsSync(this.path);
    if (file) {
        this.users = JSON.parse(fs.readFileSync(this.path, "utf-8"));
    } else {
        fs.writeFileSync(this.path, JSON.stringify([], null, 2));
    }
    }
    async create(data) {
    try {
        if (!data) {
        throw new Error("please  insert data");
        }
        const user = {
        id:
            this.users.length === 0
            ? 1
            : this.users[this.users.length - 1].id + 1,
        name: data.name,
        photo: data.photo,
        email: data.email,
        };
        this.users.push(user);
        await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.users, null, 2)
        );
        return true;
    } catch (error) {
        return error.message;
    }
    }
    read(){
        try {
            if (this.users.length === 0) {
                throw new Error ( "Not found users!" );
            }
            else{
                return this.users;
            }
        } catch (error) {
            return error.message;
        }
    }
    readOne(id){
        try {
            const one = this.users.find(each => each.id === Number(id));
            if (!one) {
                throw new Error ("Not found user!");
            }
            else {
                return one;
            }
        } catch (error) {
            return error.message;
        }
    }
}

const user = new userManager("./managerOfFiles/data/users.json");

user.create({
    name: "Juan",
    photo: "https://profiles_photo_Juan",
    email: "JuanV@gmail.com",
});

user.create({
    name: "Lorena",
    photo: "https://Profiles_photos_Lorena",
    email: "LoreS@hotmail.com",
});

user.create({
    name: "Viviana",
    photo: "https://Profiles_photos_Viviana",
    email: "Vivi92@yahoo.com",
});

// console.log(user.users);
// console.log(user.read()); 
// console.log(user.readOne(3));