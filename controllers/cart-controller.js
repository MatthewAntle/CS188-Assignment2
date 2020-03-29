const {
    getAllCarts,
    getCartByCartId,
    getCartsByCustomerId,
    addCart,
    modifyCart,
    removeCartByCartId
} = require('../services/cart-service');

const getCartsRoute = (server) => {
    server.route({
        path: '/carts',
        method: 'GET',
        handler: () => getAllCarts
    });
};

const getCartByCartIdRoute = (server) => {
    server.route({
        path: '/carts/{cartId}',
        method: 'GET',
        handler: (request, h) => {
            const cart = getCartByCartId(request.params.cartId);

            if (!cart) {
                return h.response().code(404);
            }

            return cart;
        }
    });
};

const getCartsByCustomerIdRoute = (server) => {
    server.route({
        path: '/customers/{customerId}/carts',
        method: 'GET',
        handler: (request, h) => {
            const carts = getCartsByCustomerId(request.params.customerId);

            if (!carts) {
                return h.response().code(404);
            }

            return carts;
        }
    });
};

const addCartsRoute = (server) => {
    server.route({
        handler: (request, h) => {
            const cart = request.payload;
            addCart(cart);
            return h.response(cart).code(201);
        },

        method: 'POST',
        path: '/carts'
    });
};

const modifyCartRoute = (server) => {
    server.route({
        handler: (request) => {
            modifyCart(request.payload);
            return '';
        },

        method: 'PUT',
        path: '/carts/{cartId}'
    });
};

const deleteCartRoute = (server) => {
    server.route({
        handler: (request) => {
            removeCartByCartId(request.params.cartId);
            return '';
        },

        method: 'DELETE',
        path: '/carts/{cartId}'
    });
};

const initCartControllers = (server) => {
    getCartsRoute(server);
    getCartByCartIdRoute(server);
    getCartsByCustomerId(server);
    addCartsRoute(server);
    modifyCartRoute(server);
    deleteCartRoute(server);
};

module.exports = {
    initCartControllers
};
