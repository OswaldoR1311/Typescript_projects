import express from 'express'
import type { Request, Response } from 'express'
import { data } from './data.ts'
import type { Book, BookError, BookInput, BookParams, BookQueryFilters, BookSuccess } from './types.ts'

const app = express()
app.use(express.json())
const PORT = 4000

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
app.get('/books', (req: Request<{}, {}, {}, BookQueryFilters>, res: Response) => {
    const { title, author, minPages } = req.query


    let filteredBooks = [...data]

    if (title) {
        filteredBooks = filteredBooks.filter(b => b.title.toLowerCase().includes(title.toLowerCase()))
    }

    if (author) {
        filteredBooks = filteredBooks.filter(b => b.author.toLowerCase().includes(author.toLowerCase()))
    }

    if (minPages) {
        const pagesNumber = Number(minPages)

        if (isNaN(pagesNumber)) {
            return res.status(404).json({ error: 'minPages must be a number' })
        }

        filteredBooks = filteredBooks.filter(b => b.pages >= pagesNumber)
    }

    if (filteredBooks.length === 0) {
        return res.status(404).json({ error: 'Not matches' })
    }


    return res.status(200).json(filteredBooks)
})

app.get('/books/:id', (req: Request<BookParams>, res: Response) => {
    const id = Number(req.params.id)
    const bookFinded = data.find(b => b.id === id)


    if (bookFinded) {
        return res.json(bookFinded)
    } else return res.status(404).json({ error: 'bad user input' })
})

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
app.post('/books', (req: Request<{}, {}, BookInput>, res: Response) => {
    console.log(req.body)
    const { title, author, pages } = req.body

    if (!title || !author || !pages) {
        return res.status(400).json({ error: 'something went wrong' })
    }
    const newBook: BookInput = { title, author, pages }
    data.push(newBook)

    return res.status(201).json({ message: 'Success creating book' })
})

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
app.put('/books/:id', (req: Request<BookParams, {}, Book>, res: Response<Book | BookError>) => {
    const paramsId = Number(req.params.id)

    const bookIndex = data.findIndex(b => b.id === paramsId)

    if (bookIndex === -1) {
        return res.status(404).json({ error: 'the book to edit is not founded' })
    }

    const { title, author, pages } = req.body
    const modifiedBook = { id: paramsId, title, author, pages }

    data[bookIndex] = modifiedBook
    return res.json(modifiedBook)

})

app.delete('/books/:id', (req: Request<BookParams>, res: Response<BookError | BookSuccess>) => {
    const paramsId = Number(req.params.id)

    const bookIndex = data.findIndex(b => b.id === paramsId)

    if (bookIndex === -1) {
        return res.status(404).json({ error: 'the book to eliminate is not founded' })
    }

    data.splice(bookIndex, 1)

    return res.status(200).json({ message: 'Book deleted successfully' })
})

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))