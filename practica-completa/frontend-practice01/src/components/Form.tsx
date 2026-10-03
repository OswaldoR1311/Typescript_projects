import { useState } from 'react'
import { data } from '../data'
import type { Product } from '../types'


interface FormProps {
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>
}

const Form: React.FC<FormProps> = ({ setProducts }) => {
    const [name, setName] = useState<string>('')
    const [price, setPrice] = useState<string>('')
    const [description, setDescription] = useState<string>('')

    const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!name || !price || !description) {
            throw new Error('An error ocurrs')
        }

        const newProduct = {
            id: Date.now(),
            name,
            price,
            description
        }

        setProducts((prevProducts) => [...prevProducts, newProduct])
        setName('')
        setPrice('')
        setDescription('')
        console.log(data)
        return newProduct
    }



    return (
        <>
            <h2>Agregate product</h2>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>
                            Name
                            <input required={true} type="text" value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Price
                            <input required={true} type="text" value={price} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrice(e.target.value)} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Description
                            <textarea value={description} required={true} name="" id="" onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}></textarea>
                        </label>
                    </div>
                    <button type="submit">Add</button>
                </form>
            </div>
        </>

    )

}

export default Form