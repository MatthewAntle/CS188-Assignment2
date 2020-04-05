const uuid = require('uuid');

const {
    selectCarts,
    selectCartByCartId,
    selectCartsByCustomerId,
    insertCart,
    updateCart,
    deleteCartByCartId
} = require('../../repositories/cart-repository');

describe('cart repository', () => {
    let firstCartId,
        secondCartId,
        expectedCustomerId,
        expectedFirstCart,
        expectedSecondCart,
        expectedFirstCartCreatedDate,
        expectedFirstCartPurchasedDate,
        expectedSecondCartCreatedDate,
        expectedSecondCartPurchasedDate;

    beforeEach(() => {
        firstCartId = '44ef41f4-485b-44d6-8635-7418e026be89';
        secondCartId = '5581858f-a20e-4ada-9ccf-dd3e2cea0eb3';
        expectedCustomerId = 'd83ff143-9f8b-445a-8d8f-b9b8fe0f9f28';
        expectedFirstCartCreatedDate = '1/1/2020';
        expectedFirstCartPurchasedDate = '1/2/2020';
        expectedSecondCartCreatedDate = '1/3/2020';
        expectedSecondCartPurchasedDate = '1/4/2020';

        expectedFirstCart = {
            'cart_id': firstCartId,
            'customer_id': expectedCustomerId,
            'created_date': expectedFirstCartCreatedDate,
            'purchased_date': expectedFirstCartPurchasedDate
        };

        expectedSecondCart = {
            'cart_id': secondCartId,
            'customer_id': expectedCustomerId,
            'created_date': expectedSecondCartCreatedDate,
            'purchased_date': expectedSecondCartPurchasedDate
        };
    });

    describe('selectCarts', () => {
        it('should return all the carts', () => {
            const actualCarts = selectCarts();
            const [actualFirstCart, actualSecondCart] = actualCarts.rows;

            expect(actualFirstCart).toEqual(expectedFirstCart);
            expect(actualSecondCart).toEqual(expectedSecondCart);
        });
    });

    describe('selectCartByCartId', () => {
        it('should return a specific cart by cartId', () => {
            const actualFirstCart = selectCartByCartId(firstCartId);

            expect(actualFirstCart).toEqual({
                'cart_id': firstCartId,
                'customer_id': expectedCustomerId,
                'created_date': expectedFirstCartCreatedDate,
                'purchased_date': expectedFirstCartPurchasedDate
            });

            const actualSecondCart = selectCartByCartId(secondCartId);

            expect(actualSecondCart).toEqual({
                'cart_id': secondCartId,
                'customer_id': expectedCustomerId,
                'created_date': expectedSecondCartCreatedDate,
                'purchased_date': expectedSecondCartPurchasedDate
            });
        });
    });

    describe('selectCartsByCustomerId', () => {
        it('should return carts by a customerId', () => {
            const actualCarts = selectCartsByCustomerId(expectedCustomerId);

            expect(actualCarts.rows).toEqual([
                expectedFirstCart,
                expectedSecondCart
            ]);
        });

        it('should return no rows if there are no carts for a customerId', () => {
            const actualCarts = selectCartsByCustomerId(uuid.v4());

            expect(actualCarts.rows).toEqual([]);
        });
    });

    describe('insertCart', () => {
        it('Should insert a new cart', () => {
            const newCart = {
                'cart_id': uuid.v4(),
                'customer_id': uuid.v4(),
                'created_date': new Date(),
                'purchased_date': new Date()
            };

            insertCart(newCart);

            const actualCarts = selectCarts();

            expect(actualCarts).toEqual({rows: [newCart]});
        });
    });

    describe('updateCart', () => {
        it('Should update an existing cart', () => {
            const updatedCart = {
                'cart_id': firstCartId,
                'customer_id': expectedCustomerId,
                'created_date': new Date(),
                'purchased_date': new Date()
            };

            updateCart(updatedCart);

            const actualCart = selectCartByCartId(firstCartId);

            expect(actualCart).toEqual(updatedCart);
        });
    });

    describe('deleteCartByCartId', () => {
        it('should delete a cart by its cartId', () => {
            deleteCartByCartId(firstCartId);

            const actualCart = selectCarts();

            expect(actualCarts).toEqual({ rows: [expectedSecondCart]});
        });
    });
    
});
