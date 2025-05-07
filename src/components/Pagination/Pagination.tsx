interface PaginationProps{
    previousPage?: string;
    onHandlePrevious: VoidFunction;
    onHandleNext: VoidFunction;
}
export const Pagination = ({
    previousPage,
    onHandlePrevious,
    onHandleNext,
}: PaginationProps) => {
  return(
  <>
    <label className={`
        mr-2 
        ${
            previousPage != null 
            ? "text-blue-600 hover:text-blue-800 cursor-pointer dark:text-white hover:dark:text-gray-400" 
            : "text-gray-500"
            }`}
            onClick={previousPage != null ? onHandlePrevious : () => {}}
            >
                {"<<"} Anterior
    </label>
    <label className="text-blue-600 dark:text-white">||</label>
    <label className={`
        mr-2 
        ${
            "ml-2 text-blue-600 hover:text-blue-800 cursor-pointer dark:text-white  hover:dark:text-gray-400" 
            }`}
            onClick={onHandleNext}
            >
            Próximo {">>"} 
    </label>
  </>
  )
}
