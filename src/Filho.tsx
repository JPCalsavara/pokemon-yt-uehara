import { PropsWithChildren, ReactNode, useRef } from "react";

interface FilhoProps{
    text?: string;
    children?: ReactNode;
}

export const Filho: React.FC<PropsWithChildren<FilhoProps>> = ({ 
    text,
    children }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const diminuirTamanhoInput = () => {
        if (inputRef && inputRef.current && inputRef.current.style){
            inputRef.current.style.width = "100px"
        }
    }

    return <div className="w-full flex flex-col">
        <h2>{text}</h2>
        {children}
        <input 
            ref={inputRef}
            type="text" 
            placeholder="Digite aqui"
            className="bg-gray-300 border rounded-md p-1 mx-1 " 
        />
        <button 
        onClick={diminuirTamanhoInput} 
        className="bg-red-800 hover:bg-red-600 text-white "
        >
          Diminuir tamanho de input
        </button>

    </div>
}