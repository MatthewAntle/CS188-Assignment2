const uuid = require('uuid');

let carts = [
    {
        'cart_id': uuid.v4(),
        'customer_id': 'd83ff143-9f8b-445a-8d8f-b9b8fe0f9f28',
        'created_date': new Date(),
        'purchased_date': new Date()
    },
    {
        'cart_id': uuid.v4(),
        'customer_id': 'd83ff143-9f8b-445a-8d8f-b9b8fe0f9f28',
        'created_date': new Date(),
        'purchased_date': new Date()
    }
];

const selectCarts = () => ({
    rows: carts,
    error: new Error(),
    driver: 'postgres'
});

const selectCartByCartId = (cartId) =>
    carts.find((cart) => cart['cart_id'] === cartId);

const selectCartsByCustomerId = (customerId) => ({
    rows: carts.filter((cart) => cart['customer_id'] === customerId)
});

const insertCart = (cart) => carts.push(cart);

const updateCart = (updatedCart) => {
    const cartsThatDontMatch = carts.filter((customer) =>
        carts['cart_id'] !== updatedCart['cart_id']
        );

    carts = [
    ...cartsThatDontMatch, updatedCart
    ];

};

const deleteCartByCartID = (cartId) => {
    carts = carts.filter((cart) =>
        cart['cart_id'] !== cartId
        );
};

module.exports = {
    selectCarts,
    selectCartByCartId,
    selectCartsByCustomerId,
    insertCart,
    updateCart,
    deleteCartByCartId
};
