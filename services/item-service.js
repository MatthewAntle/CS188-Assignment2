const {
	selectItems,
	selectItemByItemId
} = require('../repositories/item-repository');

const mapToModel = (item) => ({
	itemId: item['item_id'],
	itemName: item['item_name'],
	itemDescription: item['item_description'],
	itemPrice: item['item_price']
});

const getAllItems = () => {
	const {rows} = selectItems();

	return rows.map(mapToModel);
};

const getItemByItemId = (itemId) => {
	const item = selectItemByItemId(itemId);

	return mapToModel(item);
};

module.exports = {
	getAllItems,
	getItemByItemId
};
