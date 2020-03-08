const uuid = require('uuid');

const {
	getAllCustomers,
	getCustomerByCustomerId
} = require('../../services/customer-service');

const {
	selectCustomers,
	selectCustomerByCustomerId
} = require('../../repositories/customer-repository');

jest.mock('../../repositories/customer-repository');

describe('Testing getAllCustomers', () => {
	let expectedCustomerId;

	beforeEach(() => {
		expectedCustomerId = 'd83ff143-9f8b-445a-8d8f-b9b8fe0f9f28';

		expectedFirstCustomer = {
			customerId: expectedCustomerId
		};

		selectCustomers.mockReturnValue({
			rows: [{
				'customer_id': expectedCustomerId
			}]
		});

		selectCustomerByCustomerId.mockReturnValue({
			'customer_id': expectedCustomerId,
			'first_name': 'Matthew',
			'last_name': 'Antle',
			'email': 'matthew.antle@drake.edu'
		});
	});

	it('should get all customers', () => {
		const actualCustomers = getAllCustomers();

		expect(selectCustomers).toHaveBeenCalledTimes(1);

		expect(actualCustomers).toEqual([
			expectedFirstCustomer
		]);
	});

	it('should get all customers by customer id', () => {
		const actualCustomers = getCustomerByCustomerId(expectedCustomerId);

		expect(selectCustomerByCustomerId).toHaveBeenCalledTimes(1);
		expect(selectCustomerByCustomerId).toHaveBeenCalledWith(expectedCustomerId);

		expect(actualCustomers).toEqual({
			'customerId': expectedCustomerId,
			'firstName': 'Matthew',
			'lastName': 'Antle',
			'email': 'matthew.antle@drake.edu'
		});
	});
});
