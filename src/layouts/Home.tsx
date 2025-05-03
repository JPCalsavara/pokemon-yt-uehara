import React, { useCallback, useEffect, useState } from 'react'
import { Header } from '../components/Header'
import { Input } from '../components/Input'
import { SimplePokemon } from '../types'
import { Loader } from '../components/Loader'
import { PokemonService } from '../services/pokemon'
import { Card } from '../components/Card'

export const Home = () => {
  const [pokemons, setPokemons] = useState<SimplePokemon[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const getPokemons = useCallback(async (page:string) => {
    setIsLoading(true);
    
    try{
      const {results, next, previous} = await PokemonService.getPokemons(
        page
      )
      setPokemons(results);
      console.table(results)
    } catch (error) {
      console.log("Erro na busca do pokemon: ", error);
    } finally {
      setIsLoading(false);
    }
  },[])

  useEffect(() => {
    getPokemons("");
  },[getPokemons])

  return (
    <div className='h-full m-full bg-blue-100'>
        <Header title="Pokedex">
            <Input onHandleSearch={() => {}}></Input>
        </Header>

        {isLoading ? (
          <div className='flex justify-center items-center h-screen'>
            <Loader/>
          </div>
        ) : (
          <main className='mt-5 md:mt-10 flex justify-center flex-wrap'>
            {pokemons.map(pokemon => (
              <Card key={pokemon.name} simplePokemon={pokemon}/>
            ))}
          </main>
        )}
    </div>
  )
}
