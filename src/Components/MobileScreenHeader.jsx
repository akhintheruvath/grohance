import { MenuIcon } from "../Icons/MenuIcon";

export const MobileScreenHeader = ({ toggleSidebar }) => {
   return (
      <div className={`md:hidden w-full fixed flex shadow-sm justify-between items-center bg-white px-5 py-7 z-30`}>
         <div className='w-1/3 flex items-center'>
            <span className='mr-4 mt-1' onClick={toggleSidebar}><MenuIcon /></span>
            <h2 className='text-xl font-semibold text-[#030229]'>grohance</h2>
         </div>
      </div>
   );
}