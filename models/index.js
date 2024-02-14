const Product = require("./Product");
const CartItem = require("./CartItem");

Product.hasMany(CartItem, { foreignKey: "productId" });
CartItem.belongsTo(Product, { foreignKey: "productId" });

async function init() {
    await Product.sync({ force: true });
    await CartItem.sync({ force: true });

    await Product.bulkCreate([
        {
            name: "Tshirt",
            price: 10,
            description: "Super Comfortable Tshirt",
            image: "https://cdn.pixabay.com/photo/2017/09/03/14/41/mock-up-2710535_960_720.jpg",
        },
        {
            name: "Shoes",
            price: 20,
            description: "Light weight shoes",
            image: "https://assets.solesense.com/en/images/products/500/puma-j-cole-x-rs-dreamer-time-square-194639-03_1.jpg",
        },
        {
            name: "Jeans",
            price: 15,
            description: "Slim fit jeans",
            image: "https://www.ariat.com/dw/image/v2/AAML_PRD/on/demandware.static/-/Sites-ARIAT/default/dw496f8f9d/images/zoom/10010134_lifestyle.jpg?sw=800&sh=800",
        },
    ]);

    // await CartItem.bulkCreate([
    //     {
    //         productId: 1,
    //         quantity: 1,
    //         amount: 10,
    //     }
    // ]);
}

init();

const models = {
    Product,
    CartItem,
};

module.exports = models;