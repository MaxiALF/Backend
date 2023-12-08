class productManager {
    static #products = [];

    create(data) {
    const product = {
        id:
        productManager.#products.length === 0
            ? 1
            : productManager.#products[productManager.#products.length - 1].id +
            1,
        title: data.title,
        photo: data.photo,
        price: data.price,
        stock: data.stock,
        };
        productManager.#products.push(product);
    }
    read(){
        return productManager.#products;
    }
    readOne(id){
        return productManager.#products.find((each) => each.id === Number(id));
    }
}

const products = new productManager();

products.create ({
    title: "Rueda BBS negra",
    photo: "https://www.llantasonline.es/storage/images/image?remote=https%3A%2F%2Fwww.llantasonline.es%2FWebRoot%2FStoreES2%2FShops%2F17707068%2F5D48%2F596F%2F6BD7%2F6830%2FD132%2F0A0C%2F6D0D%2F24B5%2Fbbs-ch-r-n-rburgring-edition.jpg&shop=17707068",
    price: "$505.000",
    stock: "8",
})
products.create ({
    title: "Conjunto de freno Brembo",
    photo: "https://www.brembo.com/en/Photogallery/Sistemi%20GT/10423300_742874315777057_8373732884425033845_n.jpg",
    price: "$350.500",
    stock: "4",
})
products.create ({
    title: "Aleron deportivo universal",
    photo: "https://www.visualcar.cl/wp-content/uploads/2020/08/3-1.jpg",
    price: "$35.450",
    stock: "2",
})

// console.log(products.read());
console.log(products.readOne(2));