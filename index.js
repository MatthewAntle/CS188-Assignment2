const item = {
  itemId: '02bbdbc7-e22e-4153-abd8-b5732a4ba6a7',
  name: 'Basketball T-Shirt',
  description: "Women's Basketball T-Shirt",
  price: 32.99,
  size: 'Medium'
};

const customer = {
  customerId: '02bbdbc7-e22e-4153-abd8-b5732a4ba6a8',
  firstName: 'random',
  lastName: 'person',
  email: 'random.person@drake.edu',
  phoneNumber: '1234567890'
};

const cart = {
  cartId: '09bbdbc9-e22e-3514-abd8-b5732a4ba6a9',
  customerId : '02bbdbc7-e22e-4153-abd8-b5732a4ba6a8',
  createdDate : '2-01-2020',
  purchasedDate : '2-02-2020'  
};

const cartItems = [{
  cartId: '09bbdbc9-e22e-3514-abd8-b5732a4ba6a9',
  itemId : '02bbdbc7-e22e-4153-abd8-b5732a4ba6a7',
  itemName : "Basketball T-Shirt",
  quantity : 3
}, {
  cartId: '09bbdbc9-e22e-3514-abd8-b5732a4ba6a9',
  itemId : '03bbdbc7-e22e-4153-abd8-b5732a4ba6a5',
  itemName : "Football T-Shirt",
  quantity : 2
}, {
  cartId: '09bbdbc9-e22e-3514-abd8-b5732a4ba6a9',
  itemId : '01bbdbc7-e22e-4153-abd8-b5732a4ba2a9',
  itemName : "Baseball T-Shirt",
  quantity : 1
}];

console.log(item);
console.log(customer);
console.log(cart);
console.log(cartItems);
