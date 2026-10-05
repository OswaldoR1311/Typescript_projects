import { useEffect, useState } from 'react'
import { getCharacters } from '../services/api'
import type { Character, ApiInfo } from '../types/character'

export const useCharacters = () => {
  const [characters, setCharacters] = useState<Character[]>([])
  const [info, setInfo] = useState<ApiInfo | null>(null)
  const [page, setPage] = useState<number>(1)
  const [search, setSearch] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const handleSearchChange = (value: string) => {
    setSearch(value)
    setPage(1)
  }

  useEffect(() => {
    const fetchCharactersData = async () => {
      setLoading(true)
      setError(null)

      try {
        const data = await getCharacters(page, search)
        setCharacters(data.characters.results)
        setInfo(data.characters.info)
      }
      catch (err) {
        setError('Could not load characters. Please check your connection')
      }
      finally {
        setLoading(false)
      }
    }
    fetchCharactersData()
  }, [page, search])
  return {
    search,
    setSearch: handleSearchChange,
    characters,
    info,
    page,
    setPage,
    loading,
    error,
  }
}
