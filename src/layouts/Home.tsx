import React, { useCallback, useEffect, useState } from 'react'
import { Header } from '../components/Header/Header'
import { Input } from '../components/Input/Input'
import { Pokemon, SimplePokemon } from '../types'
import { Loader } from '../components/Loader/Loader'
import { PokemonService } from '../services/pokemon'
import { Card } from '../components/Card/Card'
import { Pagination } from '../components/Pagination/Pagination'
import { Toogle } from '../components/Toogle/Toggle'
import { useIsDark } from '../hooks/useTheme'
import { useAtom } from 'jotai'

export const Home = () => {
  const [pokemons, setPokemons] = useState<SimplePokemon[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [nextPage, setNextPage] = useState('');
  const [previousPage, setPreviousPage] = useState<string | undefined>('');
  const [pokemon, setPokemon] = useState<Pokemon>()
  const [isDark, setIsDark] = useAtom(useIsDark);

  const getPokemons = useCallback(async (page:string) => {
    setIsLoading(true);
    
    try{
      const {results, next, previous} = await PokemonService.getPokemons(
        page
      )
      setPokemons(results);
      setNextPage(next);
      setPreviousPage(previous);
    } catch (error) {
      console.log("Erro na busca do pokemon: ", error);
    } finally {
      setIsLoading(false);
    }
  },[])

const onHandleSearch = async (value: string) => {
  try{
    const searchedPokemonResult = await PokemonService.searchedPokemon(value);
    if(searchedPokemonResult){
      setPokemon(searchedPokemonResult);
    } 
    
    if (!value){
      setPokemon(undefined);
    }
  } catch (error){
    console.error("Erro ao pesquisar pokémon: " + error)
  }
}

  useEffect(() => {
    getPokemons("");
  },[getPokemons])

  const handleNextPage = () => {
    getPokemons(nextPage);
  }

  const handlePreviousPage = () => {
   if(!previousPage) return;
   
    getPokemons(nextPage);
  }

  const handleDarkMode = () => {
    const newDarkValue = !isDark;
    setIsDark(newDarkValue);
    sessionStorage.setItem("isDark", newDarkValue.toString());
  }

  useEffect(() => {
    if (sessionStorage.getItem("isDark")){
      const isDarkMode = sessionStorage.getItem("isDark");
      setIsDark(isDarkMode === "true")
    }
  }, [setIsDark])

  return (
    <div className={`h-full m-full bg-blue-100 ${isDark ? 'dark' : ""}`}>
        <div className='dark:bg-gray-700'>
        <Header title="Pokedex">
            <Input onHandleSearch={onHandleSearch}></Input>
              <div className='absolute top-[150px] md:top-[70px] md:bottom-2 left-5'>
                <Toogle isDark={isDark} handleDark={handleDarkMode} />
              </div>
        </Header>

        {isLoading ? (
          <div className='flex justify-center items-center h-screen'>
            <Loader/>
          </div>
        ) : (
          <main className='mt-5 md:mt-10 flex justify-center flex-wrap'>
            {!pokemon &&pokemons.map(pokemon => (
              <Card key={pokemon.name} simplePokemon={pokemon}/>
            ))}

            {pokemon && <Card pokemonSearched={pokemon}/>}
          </main>
        )}

        {!pokemon && (
          <footer className="flex w-full justify-center p-5 text-xl">
            <Pagination
            previousPage={previousPage}
            onHandleNext={handleNextPage}
            onHandlePrevious={handlePreviousPage}
            />
          </footer>
        )
        }
        </div>
    </div>
  )
}
