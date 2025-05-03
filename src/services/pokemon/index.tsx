import { Pokemon, PokemonResults } from "../../types";

const API_BASE_URL = "https://pokeapi.co/api/v2/pokemon"

export class PokemonService{
    static async getPokemons(page: string): Promise<PokemonResults>{
        const pokemonURL = page ? page : `${API_BASE_URL}?limit=20&offset=0`;
        const response = await fetch(pokemonURL);
        const pokemons: PokemonResults = await response.json();
        return pokemons;
    }

    static async getPokemon(url: string): Promise<Pokemon>{
        const response = await fetch(url);
        const pokemon: Pokemon = await response.json();
        return pokemon;
    }
}