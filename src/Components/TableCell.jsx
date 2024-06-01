export const TableCell = ({ extraClasses = '', children }) => {
   return (
      <td className={`border-[#F5F5F5] border-t-8 text-left text-sm text-[#231F20] px-5 py-4 ${extraClasses}`}>
         {children}
      </td>
   );
}