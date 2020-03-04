const uuid = require('uuid');

let cartItems = [
    {
        'cart_item_id': 'd83ff143-9f8b-445a-8d8f-b9b8fe0f6543',
        'cart_id': 'd83ff143-9f8b-445a-8d8f-b9b8fe0f6544'
    }
];

const selectCartItemByCartItemId = (cartItemId) =>
    cartItems.find((ci) => cartItems['cart_item_id'] === cartItemId);

const selectCartItemsByCartId = (cartId) => ({
    rows: cartItems.filter((cart) => cart['cart_id'] === cartId)
});

module.exports = {
    selectCartItemByCartItemId,
    selectCartItemsByCartId
};
