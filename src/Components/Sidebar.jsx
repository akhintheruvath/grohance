import React from 'react';

import { NavLink } from './NavLink';
import { OrdersIcon } from '../Icons/OrdersIcon';
import { MenuCloseIcon } from '../Icons/MenuCloseIcon';

export const Sidebar = ({ activeLink, isSidebarVisible, toggleSidebar }) => {

  return (
    <div className={`pt-4 md:pt-9 bg-white h-screen md:h-auto rounded-r-3xl md:rounded-none md:shadow-none ${isSidebarVisible && 'shadow-2xl'}`}>
      <div className='flex items-center justify-between md:justify-center py-2 md:pb-11'>
         <div className='flex items-center'>
            <h2 className='ml-8 md:ml-0 text-[#030229] font-semibold text-3xl leading-8'>grohance</h2>
         </div>
         <div className='md:hidden mr-5' onClick={toggleSidebar}><MenuCloseIcon /></div>
      </div>
      <nav>
         <ul>
            <li><NavLink active={activeLink === "/orders"} to="/orders"><span className="pl-9 mr-4 h-full flex items-center"><OrdersIcon active={activeLink === "/orders"} /></span>Orders</NavLink></li>
         </ul>
      </nav>
    </div>
  );
}