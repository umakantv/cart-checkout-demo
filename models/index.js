const Product = require("./Product");
const CartItem = require("./CartItem");
const Customer = require("./Customer");
const Order = require("./Order");

Product.hasMany(CartItem, { foreignKey: "productId" });
CartItem.belongsTo(Product, { foreignKey: "productId" });

Customer.hasMany(CartItem, { foreignKey: "customerId" });
CartItem.belongsTo(Customer, { foreignKey: "customerId" });

async function init() {
    await Product.sync({ force: true });
    await Customer.sync({ force: true });
    await CartItem.sync({ force: true });
    await Order.sync({ force: true });

    await Product.bulkCreate([
        {
            name: "Tshirt",
            price: 10,
            description: "Super Comfortable Tshirt",
            image: "https://www.supreme-creations.in/wp-content/uploads/2022/05/wholesale-pre-printed-t-shirt-by-supreme-creations-400x400.jpg",
        },
        {
            name: "Shoes",
            price: 20,
            description: "Light weight shoes",
            image: "https://imgs3.freeup.app/400x400/6ff96e63dc6bd4f5a1bfc1da75b52911.jpg",
        },
        {
            name: "Jeans",
            price: 15,
            description: "Slim fit jeans",
            image: "https://www.ariat.com/dw/image/v2/AAML_PRD/on/demandware.static/-/Sites-ARIAT/default/dw496f8f9d/images/zoom/10010134_lifestyle.jpg?sw=800&sh=800",
        },
    ]);

    await Customer.create({
        name: "Umakant Vashishtha",
        email: "umakant.vashishtha@example.com",
        phone: "1234567890",
        billing_address_first_name: "Umakant",
        billing_address_last_name: "Vashishtha",
        billing_address_line1: "221B Baker Street",
        billing_address_line2: "Koramangala 8th Block",
        billing_address_line3: "",
        billing_address_city: "Bangalore",
        billing_address_state: "KA",
        billing_address_country: "India",
        billing_address_postal_code: "560095",
        billing_address_country_code_iso: "IN",
        billing_address_phone: "1234567890",
        shipping_address_first_name: "John",
        shipping_address_last_name: "Doe",
        shipping_address_line1: "221B Baker Street",
        shipping_address_line2: "Koramangala 8th Block",
        shipping_address_line3: "",
        shipping_address_city: "Bangalore",
        shipping_address_state: "KA",
        shipping_address_country: "India",
        shipping_address_postal_code: "560095",
        shipping_address_country_code_iso: "IN",
        shipping_address_phone: "1234567890",
    });
}

init();

const models = {
    Product,
    Customer,
    CartItem,
    Order,
};

module.exports = models;