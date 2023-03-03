import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'

type PokemonsResult = {
  name: string
  url: string
}

interface Data {
  next?: string
  count: number
  results: PokemonsResult[]
  previous?: string
}

interface UseListPokemonsReturn {
  data: PokemonsResult[]
  next: (() => void) | undefined
  loading: boolean
}

const UseListPokemons = (): UseListPokemonsReturn => {
  const [data, setData] = useState<Data>({ results: [], next: undefined, count: 0 })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    axios.get<Data>('https://pokeapi.co/api/v2/pokemon/').then((data) => {
      setData(data.data)
      setLoading(false)
    })
  }, [])

  const next = useMemo(() => {
    if (data?.next) {
      return () => {
        axios
          .get<Data>(data?.next as string)
          .then((data) => {
            setData((prevState: any) => ({
              ...data.data,
              results: [...prevState.results, ...data.data.results],
            }))
          })
          .finally(() => {
            setLoading(false)
          })
      }
    }

    return undefined
  }, [data])

  return {
    data: data.results,
    next,
    loading,
  }
}

export default UseListPokemons
