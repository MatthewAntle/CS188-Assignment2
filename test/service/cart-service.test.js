const uuid = require('uuid');

const {
    getAllCarts,
    getCartByCartId,
    getCartsByCustomerId,
    addCart,
    modifyCart,
    removeCartByCartId
} = require('../../services/cart-service');

const {
    selectCarts,
    selectCartByCartId,
    selectCartsByCustomerId,
    insertCart,
    updateCart,
    deleteCartByCartId
} = require('../../repositories/cart-repository');

describe('Cart Service', () => {
    let expectedCart,
        expectedCartId,
        expectedCustomerId;

    beforeEach(() => {
        expectedCartId = uuid.v4();
        expectedCustomerId = uuid.v4();

        expectedCart = {
            cartId: expectedCartId,
            customerId: expectedCustomerId,
            createdDate: new Date(),
            purchasedDate: new Date()
        };

        expectedCartFromDB = {
            'cart_id': expectedCartId,
            'customer_id': expectedCustomerId,
            'created_date': expectedCart.createdDate,
            'purchased_date': expectedCart.purchasedDate
        };

        selectCarts.mockReturnValue({
            rows: [expectedCartFromDB]
        });

        selectCartsByCustomerId.mockReturnValue({
            rows: [expectedCartFromDB]
        });

        selectCartByCartId.mockReturnValue(expectedCartFromDB);

        insertCart.mockReturnValue(expectedCart);

        updateCart.mockReturnValue(expectedCartFromDB);

        deleteCartByCartId.mockReturnValue(expectedCartFromDB);
    });

    it('should get all the carts', () => {
        const actualCarts = getAllCarts();

        expect(selectCarts).toHaveBeenCalledTimes(1);

        expect(actualCarts).toEqual([
            expectedCart
        ]);
    });

    it('should get a cart by a specific cartId', () => {
        const actualCart = getCartByCartId(expectedCartId);

        expect(selectCartByCartId).toHaveBeenCalledTimes(1);
        expect(selectCartByCartId).toHaveBeenCalledWith(expectedCartId);

        expect(actualCart).toEqual(expectedCart);
    });

    it('Should return NULL if the cartId does not exist', () => {
        selectCartByCartId.mockReturnValue(null);
        const actualCart = getCartByCartId(expectedCartId);
        expect(actualCart).toBeNull();
    });

    it('should get all the carts by customerId', () => {
        const actualCarts = getCartsByCustomerId(expectedCustomerId);

        expect(selectCartsByCustomerId).toHaveBeenCalledTimes(1);
        expect(selectCartsByCustomerId).toHaveBeenCalledWith(expectedCustomerId);

        expect(actualCarts).toEqual([
            expectedCart
        ]);
    });

    it('Should return NULL if the CustomerId does not exist', () => {
        selectCartsByCustomerId.mockReturnValue(null);
        const actualCarts = getCartsByCustomerId(expectedCustomerId);
        expect(actualCarts).toBeNull();
    });

    it('Should insert a new cart', () => {
        const actualNewCart = addCart(expectedCart);

        expect(insertCart).toHaveBeenCalledTimes(1);
        expect(insertCart).toHaveBeenCalledWith(expectedCartFromDB);

        expect(actualNewCart).toEqual(expectedCart);
    });

    it('Should update a cart by cartId', () => {
        const actualCart = modifyCart(expectedCart);

        expect(updateCart).toHaveBeenCalledTimes(1);
        expect(updateCart).toHaveBeenCalledWith(expectedCartFromDB);

        expect(actualCart).toEqual(expectedCartFromDB)
    });

    it('Should delete a cart by cartId', () => {
        const actualCart = removeCartByCartId(expectedCartId);

        expect(deleteCartByCartId).toHaveBeenCalledTimes(1);
        expect(deleteCartByCartId).toHaveBeenCalledWith(expectedCartId);

        expect(actualCart).toEqual(expectedCartFromDB);
    });
});
