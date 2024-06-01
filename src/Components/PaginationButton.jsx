export const PaginationButton = ({ disabled = false, handleClick, children }) => {
   return (
      <button 
         className={`bg-[#605BFF] px-2 py-1 rounded-md text-sm text-white ${disabled && 'cursor-default opacity-50'}`}
         onClick={handleClick}
      >
         {children}
      </button>
   );
}