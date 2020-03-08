const uuid = require('uuid');

const {
	selectCustomers,
	selectCustomerByCustomerId
} = require('../../../repositories/customer-repository');

describe('customer repository', () => {
	let expectedCustomerId;

	beforeEach(() => {
		expectedCustomerId = 'd83ff143-9f8b-445a-8d8f-b9b8fe0f9f28';

		expectedCustomer = {
			'customer_id': expectedCustomerId
		};
	});

	describe('Select Customers', () => {
		it('should return all customers', () => {
			const actualCustomers = selectCustomers();
			const [actualCustomer] = actualCustomers.rows;

			expect(actualCustomer).toEqual({
				'customer_id': expectedCustomer['customer_id'],
				'first_name': 'Matthew',
				'last_name': 'Antle',
				'email': 'matthew.antle@drake.edu'
			});
		});
	});

	describe('Select Customer by Customer Id', () => {
		it('should return a specific customer by customer id', () => {
			const actualCustomer = selectCustomerByCustomerId(expectedCustomerId);

			expect(actualCustomer).toEqual({
				'customer_id': expectedCustomerId,
				'first_name': 'Matthew',
				'last_name': 'Antle',
				'email': 'matthew.antle@drake.edu'
			});
		});
	});
});
