const Hapi = require('@hapi/hapi');
const uuid = require('uuid');
const {when} = require('jest-when');

const {initCartControllers} = require('../../controllers/cart-controller');
const {
	getAllCarts,
	getCartByCartId,
	getCartsByCustomerId,
	addCart,
	modifyCart,
	removeCartByCartId
} = require('../../services/cart-service');

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

	it('Should return NOT FOUND if customer does not exist looking for their carts', async () => {
		const randomCustomerId = uuid.v4();

		const response = await fakeServer.inject({
			method: 'GET',
			url: '/customers/${randomCustomerId}/carts'
		});

		expect(response.statusCode).toEqual(404);
	});

	it('Should Add a new Cart', async () => {
		expectedCart = {
			cartId: uuid.v4(),
			customerId: uuid.v4(),
			createdDate: "1/1/2020",
			purchasedDate: "1/2/2020"
		};

		const response = await fakeServer.inject({
			method: 'POST',
			payload: expectedCart,
			url: '/carts'
		});

		expect(response.statusCode).toEqual(201);
		expect(response.result).toEqual(expectedCart);
		expect(addCart).toHaveBeenCalledTimes(1);
		expect(addCart).toHaveBeenCalledWith(expectedCart);
	});

	it('Should update an existing Cart', async () => {
		const updatedCart = {
			cartId: expectedCartId,
			customerId: expectedCustomerId,
			createdDate: "1/5/2020",
			purchasedDate: "1/6/2020" 
		};

		const response = await fakeServer.inject({
			method: 'PUT',
			payload: updatedCart,
			url: '/carts/${expectedCartId}'
		});

		expect(response.statusCode).toEqual(204);
		expect(modifyCart).toHaveBeenCalledTimes(1);
		expect(modifyCart).toHaveBeenCalledWith(updatedCart);
	});

	it('Should remove a Cart by Id', async () => {
		const response = await fakeServer.inject({
			method: 'DELETE',
			url: '/carts/${expectedCartId}'
		});

		expect(response.statusCode).toEqual(204);
		expect(removeCartByCartId).toHaveBeenCalledTimes(1);
		expect(removeCartByCartId).toHaveBeenCalledWith(expectedCartId);
	});

});
