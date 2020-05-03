import fetch from 'isomorphic-unfetch';
import uuid from 'uuid';
import {getCustomersCart} from '../../services/cart-item-service';

const addItemToCart = async (itemId) => {

  const customerResponse = await fetch('http://localhost:5555/customers');
  const [customer] = await customerResponse.json();

  const cartResponse = await fetch('http://localhost:5555/customers/${customer.customerId}/carts');
  const [cart] = await cartResponse.json();

  await fetch(input:'http://localhost:5555/cart-items', init: {
      method: 'POST',
      body: JSON.stringify({
          cartItemId: uuid.v4(),
          cartId: cart.cartId,
          itemId,
          quantity: 1
      }),
      headers: {
          'Content-Type': 'application/json'
      }
  })
};

const Index = props => (
  <section>
    <h1>Item Details</h1>
    <p>Description: {props.item.description}</p>
    <p>Price: {props.item.price}</p>
    <img src={props.item.image} />
    <button type="button" onClick={() => addItemToCart(props.item.itemId)}
    Add To Cart
    </button>
    <p>Quantity already in cart: {props.quantityInCart}</p>
    <Link href="/cart">
        <a title="Cart Page">View Cart</a>
    </Link>
  </section>
);

Index.getInitialProps = async function(context) {

  const {itemId} = context.query;
  const res = await fetch('http://localhost:5555/items/${itemId}');
  const item = await res.json();

  const {cartItems} = await getCustomersCart();

  const quantityInCart = cartItems.filter((cartItem) => cartItem.itemId === itemId).length;

  return {
    item,
    cartItems,
    quantityInCart
  };

};

export default Index;