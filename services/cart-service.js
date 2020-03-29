const {
    selectCarts,
    selectCartByCartId,
    selectCartsByCustomerId,
    insertCart,
    updateCart,
    deleteCartByCartID
} = require('../repositories/cart-repository');

const mapToModel = (cart) => ({
    cartId: cart['cart_id'],
    customerId: cart['customer_id'],
    createdDate: cart['created_date'],
    purchasedDate: cart['purchased_date']
});

const getAllCarts = () => {
    const {rows} = selectCarts();

    return rows.map(mapToModel);
};

const getCartByCartId = (cartId) => {
    const cart = selectCartByCartId(cartId);

    return mapToModel(cart);
};

const getCartsByCustomerId = (customerId) => {
    const {rows} = selectCartsByCustomerId(customerId);

    return rows.map(mapToModel);
};

const mapToDTO = (cart) => ({
    'cart_id': cart.cartId,
    'customer_id': cart.customerId,
    'created_date': cart.createdDate,
    'purchased_date': cart.purchasedDate
});

const addCart = (cart) => insertCart(mapToDTO(cart));

const modifyCart = (cart) => updateCart(mapToDTO(cart));

const removeCartByCartId = (cartId) => deleteCartByCartID(cartId);

module.exports = {
    getAllCarts,
    getCartByCartId,
    getCartsByCustomerId,
    addCart,
    modifyCart,
    removeCartByCartId
};
