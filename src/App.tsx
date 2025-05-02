import { useCallback, useEffect, useMemo, useState } from "react";
import { Filho } from "./Filho";

interface PokemonResult{
  count:number;
  next: string;
  previous: string;
  results:SimplePokemon[]
}

interface SimplePokemon{
  name:string;
  url:string
}

function App() {
  // get e set
  const [count, setCount] = useState(0)
  const [pokemons, setpokemons] = useState<PokemonResult>()

  const getSimplePokemons = async () => {
    const reponse = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0"
    );

    const pokemon: PokemonResult = await reponse.json();
    setpokemons(pokemon);
    return pokemon;
  }

useEffect(() => {
  getSimplePokemons();
}, []);

useEffect(() => {
  console.log("count mudou no use Effect");
}, [count]);

  return (
    <div className="w-full flex flex-col">
      <h1 className="text-blue-600 font-semibold text-2xl">Bem vindo</h1>


      <label>{count}</label>
      
      <button onClick={() => setCount((prop) => prop + 1)} className="bg-blue-800 hover:bg-blue-600 text-white">
        Incrementar
      </button>
    
      <hr />

      <h1>Pokemons</h1>
      {pokemons?.results.map(pokemon => (
        <div key={pokemon.name} className="mt-2">
          <p className="bg-pink-600">{pokemon.name}</p>
        </div>
      )
      )}
    </div>
  );
}

export default App;
function UseMemo(arg0: () => number, arg1: never[]) {
  throw new Error("Function not implemented.");
}

