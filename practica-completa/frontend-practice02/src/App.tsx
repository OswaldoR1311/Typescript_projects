import { useState } from 'react';
import { data } from './data';
import Catalogue from './components/Catalogue';
import ShopCart from './components/ShopCart';
import type { Product, CartItem } from './types/store';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(data);
  const [cart, setCart] = useState<CartItem[] | []>([]);

  return (
    <div>
      <Catalogue products={products} addToCart={setCart} />
      <hr />
      <ShopCart productsCart={cart} setCart={setCart} />
    </div>
  );
};

export default App;