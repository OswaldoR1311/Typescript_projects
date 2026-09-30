import { useState } from 'react'
import type { Product } from '../types'
import { data } from '../data'

const ProductList = () => {
    const [products, setProducts] = useState<Product[]>(data)

    return (
        <ul>
            {products.length === 0 ? (
                <div>
                    <h3>There is no products</h3>
                </div>
            ) : (
                products.map(p => (
                    <li key={p.id}>
                        <div>
                            <h4>{p.name}</h4>
                            <strong>{p.price}</strong>
                            <h5>{p.description}</h5>
                        </div>
                    </li>
                ))
            )}
        </ul>
    )
}

export default ProductList