const uuid = require('uuid');

let items = [
	{
		'item_id': 'd83ff143-9f8b-445a-8d8f-b9b8fe0f9f64',
		'item_name': 't-shirt',
		'item_description': 'basketball t-shirt',
		'item_price': '65.99'
	}
];

const selectItems = () => ({
	rows: items,
	error: new Error(),
	driver: 'postgres'
});

const selectItemByItemId = (itemId) =>
	items.find((it) => it['item_id'] === itemId);

module.exports = {
	selectItems,
	selectItemByItemId
};

