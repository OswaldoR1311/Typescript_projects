import type { CartItem } from '../types/store';

interface ShopCartProps {
  productsCart: CartItem[],
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>
}

const ShopCart: React.FC<ShopCartProps> = ({ productsCart, setCart }) => {

  if (!productsCart || productsCart.length === 0) {
    return <p>Your shopping cart is empty</p>;
  }

  const increment = (id: number) => {
    setCart((prevCart) => 
      prevCart.map(item => 
        item.id === id
          ? {...item, quantity: item.quantity + 1}
          : item,
      ),
    );
  };

  const decrement = (id: number) => {
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === id
          ? {...item, quantity: item.quantity === 0 ? 0 : item.quantity - 1}
          : item,
      ),
    );
  };

  const deleteProduct = (id: number) => {
    setCart(prevCart => 
      prevCart.filter(item => item.id !== id),
    );
  };

  const calculateTotal = () => {
    return productsCart.reduce((total, current) => {
      return total + (current.price * current.quantity); 
    }, 0);
  };

  const calculateTotalArticles = () => {
    return productsCart.reduce((total, current) => {
      return total + current.quantity;
    }, 0);
  };

  return (
    <div>
      <ul>
        {productsCart.map(product => (
          <li key={product.id}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4>{product.name}</h4>
                <div>
                  <button onClick={() => increment(product.id)}>+</button>
                  <button onClick={() => decrement(product.id)}>-</button>
                  <button type="button" onClick={() => deleteProduct(product.id)}>delete</button>
                </div>
                <h4>Quantity: {product.quantity}</h4>
              </div>
              <h5>Price: {product.price * product.quantity} $</h5>
            </div>
            <hr />
          </li>
        ))}
      </ul>
      {productsCart.length === 0 ? null : (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h4>Total to pay: {calculateTotal()} $</h4>
            <h4>Total products: {productsCart.length}</h4>
          </div>
          <h5>Total quantity of products: {calculateTotalArticles()}</h5>
        </div>
      )}
      <hr />
    </div>
  );
};

export default ShopCart;