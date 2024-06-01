import { useState } from "react";
import { useLocation } from 'react-router-dom';
import { Sidebar } from "../Components/Sidebar";
import { Orders } from "../Components/Orders";
import { HeadingComponent } from "../Components/HeadingComponent";
import { MobileScreenHeader } from "../Components/MobileScreenHeader";

export const Dashboard = () => {
   const [isSidebarVisible, setSidebarVisible] = useState(false);
   const location = useLocation();
   const activeLink = location.pathname;

   const toggleSidebar = () => {
      setSidebarVisible(prev => !prev);
   };

   return (
      <div className="flex min-h-screen">
         <div className={`w-5/6 md:w-72 fixed top-0 left-0 md:static transition-transform transform ${isSidebarVisible ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 z-40`}>
            <Sidebar
               isSidebarVisible={isSidebarVisible}
               toggleSidebar={toggleSidebar}
               activeLink={activeLink}
            />
         </div>
         <div className='w-full bg-[#F8FAFF] md:p-8 overflow-hidden'>
            <MobileScreenHeader
               toggleSidebar={toggleSidebar}
            />
            <div className="md:hidden mt-28 pt-4 justify-between items-center pl-8">
               <HeadingComponent activeLink={activeLink} />
            </div>
            <div className='pt-3 hidden md:flex justify-between items-center'>
               <HeadingComponent activeLink={activeLink} />
            </div>
            {
               activeLink === "/orders" && (
                  <div className="pl-8 md:p-0">
                     <Orders />
                  </div>
               )
            }
         </div>
      </div>
   );
}