export const HeadingComponent = ({ activeLink }) => {
   return (
      <h2 className='font-semibold text-2xl text-black'>
         {
            activeLink === "/orders" && "Orders and Details"
         }
      </h2>
   );
}