import type { CartItem } from "../types/store"

interface ShopCartProps {
    productsCart: CartItem[]
}

const ShopCart: React.FC<ShopCartProps> = ({ productsCart }) => {

    if (!productsCart || productsCart.length === 0) {
        return <p>Your shopping cart is empty</p>
    }

    const increment = (id: number) => {
        if (typeof id !== "number") {
            throw new Error('Something really bad happen')
        }

        productsCart.map(product => (
            product.id === id
                ? { ...product, quantity: product.quantity + 1 }
                : product
        ))
    }

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
                                    <button>-</button>
                                </div>
                                <h4>Quantity: {product.quantity}</h4>
                            </div>
                            <h5>Price: {product.price * product.quantity} $</h5>
                        </div>
                        <hr />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ShopCart