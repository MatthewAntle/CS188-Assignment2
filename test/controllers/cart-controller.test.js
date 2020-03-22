const Hapi = require('@hapi/hapi');
const uuid = require('uuid');
const {when} = require('jest-when');

const {initCartControllers} = require('../../controllers/cart-controller');
const {getAllCarts, getCartByCartId, getCartsByCustomerId} = require('../../services/cart-service');

describe('Testing the Cart Controller', () => {
	let fakeServer,
		expectedCart,
		expectedCustomerId,
		expectedCartId,
		expectedCarts;

	beforeAll(() => {
		fakeServer = Hapi.server({
			host: 'localhost',
			port: 3000
		});
		
		expectedCustomerId = uuid.v4();
		expectedCartId = uuid.v4();
		expectedCart = {cartId: expectedCartId};
		expectedCarts = [expectedCartId, uuid.v4()];

		getAllCarts.mockReturnValue(expectedCarts);

		when(getCartByCartId).calledWith(expectedCartId).mockReturnValue(expectedCart);

		initCartControllers(fakeServer);
	});

	it('Should Return All Carts', async () => {
		const response = await fakeServer.inject({
			method: 'GET',
			url: '/carts'
		});

		expect(response.statusCode).toEqual(200);
		expect(response.result).toEqual(expectedCarts);
	});

	it('Should Return a Cart by its CartId', async () => {
		const response = await fakeServer.inject({
			method: 'GET',
			url: '/carts/${expectedCartId}'
		});

		expect(getCartByCartId).toHaveBeenCalledWith(expectedCartId);
		expect(response.statusCode).toEqual(200);
		expect(response.result).toEqual(expectedCart);
	});

	it('Should Return NOT FOUND if a Cart does not exist', async () => {
		const randomCartId = uuid.v4();

		const response = await fakeServer.inject({
			method: 'GET',
			url: '/carts/${randomCartId}'
		});

		expect(getCartByCartId).toHaveBeenCalledWith(randomCartId);
		expect(response.statusCode).toEqual(404);
	});

	it('Should return all carts given customer id', async () => {
		const response = await fakeServer.inject({
			method: 'GET',
			url: '/customers/${expectedCustomerId}/carts'
		});

		expect(response.statusCode).toEqual(200);
		expect(response.result).toEqual(expectedCarts);
	});

	it('Should return NOT FOUND if customer does not looking for their carts', async () => {
		const randomCustomerId = uuid.v4();

		const response = await fakeServer.inject({
			method: 'GET',
			url: '/customers/${randomCustomerId}/carts'
		});

		expect(response.statusCode).toEqual(404);
	});

});
