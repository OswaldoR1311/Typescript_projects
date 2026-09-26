/* eslint-disable prefer-const */
interface Data {
    id?: number,
    title: string
    author: string
    pages: number
}

export let data: Data[] = [
    {
        id: 1,
        title: 'Dummy title 1',
        author: 'Author 1',
        pages: 362
    },
    {
        id: 2,
        title: 'Dummy title 2',
        author: 'Author 2',
        pages: 485
    },
    {
        id: 3,
        title: 'Dummy title 3',
        author: 'Author 3',
        pages: 140
    },
    {
        id: 4,
        title: 'Dummy title 4',
        author: 'Author 4',
        pages: 123
    }
]