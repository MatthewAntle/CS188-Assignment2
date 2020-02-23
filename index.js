const Hapi = require('@hapi/hapi');
const uuid = require('uuid');

const init = async () => {

	const server = Hapi.server({
		port: 3000,
		host: 'localhost'
	});

	const customerDave = {
		customerId: uuid.v4(),
		firstName: "Dave",
		lastName: "David",
		email: "dave.david@drake.edu",
		phoneNumber: "123-456-7890"
	};

	const customerMike = {
		customerId: uuid.v4(),
		firstName: "Mike",
		lastName: "Michael",
		email: "mike.michael@drake.edu",
		phoneNumber: "123-456-7891"
	};
	
	const customerJake = {
		customerId: uuid.v4(),
		firstName: "Jake",
		lastName: "Jacob",
		email: "jake.jacob@drake.edu",
		phoneNumber: "123-456-7892"
	};

	let customers = [customerDave, customerMike, customerJake];

	server.route({
		method: 'GET',
		path: '/customers',
		handler: (request, h) => {
			return customers;
		}
	});

	server.route({
		method: 'GET',
		path: '/customers/{customerId}',
		handler: (request, h) => {
			const {customerId} = request.params;
			const customer = customers.find((cust) => cust.customerId === customerId);

			if (!customer) {
				return h.response().code(404);
			}

			return customer;
		}
	});

	server.route({
		method: 'POST',
		path: '/customers',
		handler: (request, h) => {
			const customer = request.payload;
			const existingCustomer = customers.find((cust) => cust.customerId === customer.customerId);

			if (existingCustomer) {
				return h.response(existingCustomer).code(303);
			} else {
				customers.push(customer);
				return h.response(customer).code(201);
			}
		}
	});

	server.route({
		method: 'DELETE',
		path: '/customers/{customerId}',
		handler: (request, h) => {
			const {customerId} = request.params;
			const customer = customers.find((cust) => cust.customerId === customerId);

			if (!customer) {
				return h.response().code(404);
			}

			let newCustomers = [];

			customers.forEach((cust) => {
				if (cust.customerId !== customerId) {
					newCustomers.push(cust);
				}
			});

			customers = newCustomers;

			return '';
		}
	});

	server.route({
		method: 'PUT',
		path: '/customers/{customerId}',
		handler: (request, h) => {
			const {customerId} = request.params;
			const updatedCustomer = request.payload;

			let newCustomers = [];

			customers.forEach((cust) => {
				if (cust.customerId === customerId) {
					newCustomers.push(updatedCustomer);
				} else {
					newCustomers.push(cust);
				}
			});

			customers = newCustomers;

			return '';
		}
	});

await server.start();
console.log('Server running on %s', server.info.uri);

};

process.on("unhandledRejection", (err) => {
	console.log(err);
	process.exit(1);
});
