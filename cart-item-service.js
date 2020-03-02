const {
	selectCartItemByCartItemId, 
	selectCartItemsByCartId
	} = require('../repositories/cart-item-repository');

const mapToModel = (ci) => ({
	cartItemId: ci['cart_item_id'],
	cartId: ci['cart_id']
});

const getCartItemsByCartItemId = (cartItemId) => {
	const cartItems = selectCartItemByCartItemId(cartItemId);

	return mapToModel(cartItems);
};

const getCartItemsByCartId = (cartId) => {
	const {cartItems} = selectCartItemsByCartId(cartId);

	return cartItems.map(mapToModel);
};

module.exports = {
	getCartItemsByCartItemId,
	getCartItemsByCartId
};