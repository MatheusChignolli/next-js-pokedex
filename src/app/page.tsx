'use client'

import PokemonCard from '@/components/PokemonCard'
import UseListPokemons from '@/hooks/UseListPokemons'

export default function Home() {
  const { data, loading, next } = UseListPokemons()

  if (loading) return <p>Loading...</p>
  if (!data) return <p>No profile data</p>

  return (
    <main>
      <button
        onClick={() => {
          if (!!next) {
            next()
          }
        }}
      >
        Click on me
      </button>
      {data?.map((pokemon, index) => (
        <PokemonCard
          key={`pokemon-${index}`}
          url={pokemon.url}
          name={pokemon.name}
        />
      ))}
    </main>
  )
}
