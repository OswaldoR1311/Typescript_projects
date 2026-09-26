import express from 'express'
import { data } from './data.ts'

const app = express()
const PORT = 4000

interface BookInput {
    title: string
    author: string
    pages: number
}


app.get('/books', (_req, res) => {
    res.send(data)
})

app.get('/books/:id', (req, res) => {
    const id = Number(req.params.id)
    const bookFinded = data.find(b => b.id === id)

    if (bookFinded) {
        return res.json(bookFinded)
    } else return res.status(404).json({ error: 'bad user input' })
})

app.post('/books', (req, res) => {
    const { title, author, pages } = req.body as BookInput

    if (!title || !author || !pages) {
        return res.status(400).json({ error: 'something went wrong' })
    }
    const newBook: BookInput = { title, author, pages }
    data.push(newBook)

    return res.status(201).json({ message: 'Success creating book' })
})

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))