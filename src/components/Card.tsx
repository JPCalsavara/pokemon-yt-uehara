import React, { useCallback, useEffect, useState } from 'react'
import { Pokemon, SimplePokemon } from '../types'
import { Skeleton } from './Skeleton';
import { Label } from './Label';
import { PokemonService } from '../services/pokemon';

interface CardProps{
    simplePokemon?: SimplePokemon;
    pokemonSearched?: Pokemon;
}

export const Card = ({simplePokemon, pokemonSearched}: CardProps) => {
    const [pokemon, setPokemon] = useState<Pokemon>();
    const [isLoading, setIsLoading] = useState(false);
    
    const getPokemon = useCallback(async () => {
        setIsLoading(true);
        try{
            const pokemonResponse = await PokemonService.getPokemon(
                simplePokemon ? simplePokemon.url : ""
            )
            setPokemon(pokemonResponse)
        } catch (error) {
            console.log("Erro ao buscar o pokemon")
        } finally {
            setIsLoading(false)
        }
    },[simplePokemon]);

    useEffect(() => {
        if (pokemonSearched){
            setPokemon(pokemonSearched)
        } else{
            getPokemon()
        }
    }, [pokemonSearched, getPokemon])

    return (
    <div className='
    h-44
    w-52
    bg-white
    hover:bg-blue-300
    transition
    m-5
    flex
    justify-between
    rounded-md
    cursor-pointer
    shadow-xl

    '>
        {isLoading ? (
            <div className='w-full h-full'>
                <Skeleton></Skeleton>
            </div>
        ) : (
            <div className='w-full h-full flex flex-col'>
                <div className='w-full flex justify-around items-center mt-2 flex-col'>
                    <h2 className='text-2xl font-medium'>{pokemon?.name}</h2>
                    <p className='text-xl font-normal'>{`#${pokemon?.order}`}</p>
                    <div className='flex items-center justify-around'>
                        <div className='flex flex-col gap-2 ml-2'>
                            {pokemon?.types.map((type,index) => (
                                <Label
                                    key={`${type.type.name}-${index}`}
                                    label={type.type.name}
                                />
                            ))}
                        </div>
                        <img
                            aria-label='Imagem do pokemon'
                            className='h-32 w-32'
                            alt="Pokemon sprite"
                            src={pokemon?.sprites.front_default}
                        />
                    </div>   
                </div>
            </div>
        )}
    </div>
  )
}

