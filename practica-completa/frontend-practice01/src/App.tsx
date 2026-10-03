import { useState } from 'react'
import './App.css'
import type { Product } from './types'
import { data } from './data'
import ProductList from './components/ProductsList'
import Form from './components/Form'



const App = () => {
    const [products, setProducts] = useState<Product[] | []>(data)

    return (
        <div>
            Hola mundo, vamos a comenzar a probar los tipados con el frontend.
            <ProductList products={products} />
            <Form setProducts={setProducts} />
        </div>
    )
}

export default App