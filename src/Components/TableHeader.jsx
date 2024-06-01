export const TableHeader = ({ extraClasses = '', children }) => {
   return (
      <th
         className={`text-sm text-[#231F20] text-left pt-1 pb-2 pl-5 ${extraClasses}`}
      >
         {children}
      </th>
   );
}