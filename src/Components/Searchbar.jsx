import { LensIcon } from "../Icons/LensIcon";

export const Searchbar = ({ searchText, setSearchText }) => {
   return (
      <div className="relative flex items-center">
         <div className="absolute left-4">
            <LensIcon />
         </div>
         <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search"
            className="border border-[#F5F5F5] pl-12 pr-3 h-10 text-sm placeholder-text-[#7E858E99] placeholder-opacity-80 rounded-md focus:outline-none"
         />
      </div>
   );
}