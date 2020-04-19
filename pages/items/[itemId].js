const Index = props => (
  <section>
    <h1>Item Details</h1>
    <p>Description: {props.item.description}</p>
    <p>Price: {props.item.price}</p>
    <img src={props.item.image}</img>
  </section>
);

Index.getInitialProps = async function(context) {

  const {itemId} = context.query;
  const res = await fetch('http://localhost:5555/items/${itemId}');
  const item = await res.json();

  return {
    item
  };

};

export default Index;
