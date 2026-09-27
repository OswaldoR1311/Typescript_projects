
interface Book {
    id: number
    title: string
    author: string
    pages: number
}

interface BookParams {
    id: string
}

interface BookError {
    error: string
}

interface BookSuccess {
    message: string
}

type BookInput = Omit<Book, 'id'>

interface BookQueryFilters {
    title?: string,
    author?: string
    minPages?: string
}

export type { Book, BookParams, BookError, BookSuccess, BookInput, BookQueryFilters }