import { useNavigate, useParams } from "react-router"
import { Pokemon } from "../types";
import { useCallback, useEffect, useState } from "react";
import { PokemonService } from "../services/pokemon"
import { Header } from "../components/Header/Header";
import { Loader } from "../components/Loader/Loader";
import { Label } from "../components/Label/Label";
import { useAtom } from "jotai";
import { useIsDark } from "../hooks/useTheme";
import { Toogle } from "../components/Toogle/Toggle"


export const Details = () => {
    const { id } = useParams();
    const [pokemon,setPokemon] = useState<Pokemon>();
    const [isLoading,setIsLoading] = useState(false);
    const navigate = useNavigate();

    const [isDark, setIsDark] = useAtom(useIsDark);

    const getPokemon = useCallback(async (id:string) => {
        setIsLoading(true)
        try{
            const pokemon = await PokemonService.searchedPokemon(id);
            setPokemon(pokemon);
        } catch (error){
            console.error("Erro ao buscar poekmon", error)
        } finally {
            setIsLoading(false)
        }
    },[])

    useEffect(() => {
        if(!id) return;

        getPokemon(id);
    },[getPokemon,id])

   const handleDarkMode = () => {
       const newDarkValue = !isDark;
       setIsDark(newDarkValue);
       sessionStorage.setItem("isDark", newDarkValue.toString());
     }
   
     useEffect(() => {
       if (sessionStorage.getItem("isDark")){
         const isDarkMode = sessionStorage.getItem("isDark");
         setIsDark(isDarkMode === "true" ? true : false)
       }
     }, [setIsDark])
    
    return (
    <div className={`m-screen h-screen flex flex-col  bg-blue-100`}>
        <div className="dark:bg-gray-700 h-screen">
        <div className="h-32">
            <Header title="Pokédex">
                <div className="absolute bottom-2 left-5">
                    <Toogle isDark={isDark} handleDark={handleDarkMode}/>
                </div>
            </Header>
        </div>

        {isLoading ? (
            <div className="flex justify-center items-center mt-15">
                <Loader/>
            </div>
        ) : (
            <main className="h-full">
                <label className="
                text-2xl
                font-semibold
                m-5
                text-blue-600
                cursor-pointer
                hover:text-blue-800
                transition
                "
                onClick={() => navigate("/")}
                >{"<<"} Voltar
                </label>

                <div className="flex justify-center mt-5 md:mt-24">
                    <div className="bg-gray-100 p-5 mt-5 w-full md:w-1/2 rounded-md dark:bg-gray-900">
                        <div className="flex flex-col md:flex-row justify-evenly md:items-center w-full">
                            <div className="flex flex-col items- center">
                                <label className="text-2xl text-blue-700 dark:text-white">{`#${pokemon?.id}`}</label>
                                <img 
                                    src={pokemon?.sprites.front_default} 
                                    className="w-64"
                                    aria-label="Imagem do pokemon"
                                />
                            </div>
                            <div className="flex flex-col">
                                <h1 className="text-2xl font-semibold text-blue-700 dark:text-white"> 
                                    <span className="font-normal">Nome:</span> {pokemon?.name}
                                </h1>
                                <div>
                                    <h1 className="text-2xl font-semibold text-blue-700 dark:text-white">
                                        Tipos:
                                    </h1>
                                    <div className="flex gap-3 mt-2">
                                        {pokemon?.types.map((type,index) => (
                                            <Label
                                            key={`${type.type.name}-${index}`}
                                            label={type.type.name}
                                            />
                                        ))}
                                    </div>

                                    <h1 className="text-2xl font-semibold text-blue-700 mt-2 mb-2 dark:text-white">
                                         Habilidades:
                                    </h1>
                                    <div className="flex flex-col gap-1">
                                        {pokemon?.abilities.map((ability,index) => (
                                            <div key = {index}
                                            className="bg-fuchsia-600 text-white rounded-md p-2 flex justify-center">                             
                                                    {ability.ability.name}
                                            </div>
                                        ))}
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        )}
        </div>
    </div>
  )
}
