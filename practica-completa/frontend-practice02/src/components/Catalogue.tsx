import type { Product, CartItem } from '../types/store';

interface CatalogueProps {
  products: Product[],
  addToCart: React.Dispatch<React.SetStateAction<CartItem[]>>
}

const Catalogue: React.FC<CatalogueProps> = ({ products, addToCart }) => {

  const addProduct = (product: Product) => {
    addToCart((prevItems) => {
      const existingItem = prevItems.find(i => i.id === product.id);

      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  if (products.length === 0) {
    return <p>There are no products available.</p>;
  }

  return (
    <div>
      <ul>
        {products.map(p => (
          <li key={p.id}>
            <div>
              <h4>{p.name}</h4>
              <h5>Price: {p.price}</h5>
              <p>Category: {p.category}</p>
              <button type="button" onClick={() => addProduct(p)}>add to cart</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Catalogue;