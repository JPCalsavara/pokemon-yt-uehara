import { PropsWithChildren } from "react";

interface HeaderProps{
    title: string;
}

export const Header: React.FC<PropsWithChildren<HeaderProps>> = ({
    children, 
    title
}) => {
  return (
    <div className="bg-blue-600 w-full h-32 md:h-[100p] rounded-sm relative">
        <div className="flex justify-between md:items-center w-full">
            <h1 className="text-white font-semibold m-5 text-2xl">{title}</h1>
            <img 
            src="/images/pokeball.png" 
            aria-label="pokeball ícone"
            alt="pokeball icon" 
            className="mr-2 mt-5 md:mt-0 h-10 md:h-20"/>
        </div>
        {children}
    </div>
  )
}
