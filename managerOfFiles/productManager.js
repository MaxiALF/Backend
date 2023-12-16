const fs = require("fs");

class productManager {
    constructor(path) {
    this.path = path;
    this.products = [];
    this.init();
    }
    init() {
    const file = fs.existsSync(this.path);
    if (file) {
        this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
    } else {
        fs.writeFileSync(this.path, JSON.stringify([], null, 2));
    }
    }
    async create(data) {
    try {
        if (!data) {
        throw new Error("please  insert data");
        }
        const product = {
        id:
            this.products.length === 0
            ? 1
            : this.products[this.products.length - 1].id + 1,
        title: data.title,
        photo: data.photo,
        price: data.price,
        stock: data.stock,
        };
        this.products.push(product);
        await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.products, null, 2)
        );
        return true;
    } catch (error) {
        return error.message;
    }
    }
    read(){
        try {
            if (this.products.length === 0) {
                throw new Error ( "Not found products!" );
            }
            else{
                return this.products;
            }
        } catch (error) {
            return error.message;
        }
    }
    readOne(id){
        try {
            const one = this.products.find(each => each.id === Number(id));
            if (!one) {
                throw new Error ("Not found product!");
            }
            else {
                return one;
            }
        } catch (error) {
            return error.message;
        }
    }
}

const product = new productManager("./managerOfFiles/data/products.json");

product.create({
    title: "wheel dark BBS",
    photo: "https://bbs.wheel_dark_nurburgring_edition",
    price: "$500.000",
    stock: "6"
});

product.create({
    title: "spark plug NGK Es8",
    photo: "https://NGK_spark_plus_es8",
    price: "$3.000",
    stock: "3"
});

product.create({
    title: "piston Porsche 918 spyder",
    photo: "https://Porsche_piston_918_spyder",
    price: "$230.000",
    stock: "8"
});

// console.log(product.products);
// console.log(product.read()); 
// console.log(product.readOne(2));