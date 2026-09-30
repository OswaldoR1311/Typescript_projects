import { useState } from 'react'

const Form = () => {
    const [name, setName] = useState<string>('')
    const [price, setPrice] = useState<string>('')
    const [description, setDescription] = useState<string>('')

    const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log('Hola mundo estamos probando')
    }

    return (
        <>
            <h2>Agregate product</h2>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <form>
                    <div>
                        <label>
                            Name
                            <input type="text" value={name} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Price
                            <input type="number" value={price} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Description
                            <textarea name="" id=""></textarea>
                        </label>
                    </div>
                </form>
            </div>
        </>

    )
}

export default Form