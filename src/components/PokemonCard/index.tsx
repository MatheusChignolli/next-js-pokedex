import Image from 'next/image'
import { useEffect, useState } from 'react'

interface PokemonCardProps {
  url: string
  name: string
}

export default function PokemonCard({ url }: PokemonCardProps) {
  const [pokemon, setPokemon] = useState<any>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setPokemon(data)
        setLoading(false)
      })
  }, [url])

  if (loading) return <div>Loading...</div>

  return (
    <div className="bg-green-500">
      <ul>
        <li>{pokemon?.name}</li>
        <li>
          <Image
            height={80}
            width={80}
            alt={pokemon?.name}
            loader={() => pokemon?.sprites?.front_default}
            src="1.png"
          />
        </li>
      </ul>
    </div>
  )
}
