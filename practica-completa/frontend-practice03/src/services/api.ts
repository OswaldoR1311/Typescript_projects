import type { CharactersResponse } from '../types/character'

const API_URL = 'https://rickandmortyapi.com/graphql'

const fetchGraphql = async (query: string, variables = {}) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables }),
    })
    const json = await response.json()

    if (json.errors) {
      console.error('Graphql Errors: ', json.errors)
      throw new Error('Error querying the Graphql API')
    }

    return json.data
  }
  catch (error) {
    console.error('Network Error: ', error)
    throw error
  }
}

export const getCharacters = async (page: number = 1, name: string = ''): Promise<CharactersResponse> => {
  const query = `
    query GetCharacters($page: Int!, $name: String) {
      characters(page: $page, filter: { name: $name }) {
        info {
          count
          pages
          next
          prev
        }
        results {
          id
          name
          status
          species
          gender
          image
          origin {
            name
          }
          location {
            name
          }
          episode {
            id
          }
        }
      }
    }
  `

  const data = await fetchGraphql(query, { page, name: name || undefined })
  return data
}
