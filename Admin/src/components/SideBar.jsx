import React from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';

const SideBar = () => {
  return (
    <div className='w-[18%] min-h-screen border-r-2 '>
        <div className='flex flex-col gap-4 pt-6 pl-[20px] text-[15px]'>
            <NavLink to="/add" className="flex items-center border border-gray-300 gap-3 border-r-0 px-3 py-2 rounded-lg">
            <img src={assets.add_icon} className='w-5 h-5' alt="" />
            <p className='hidden md:block'>Add Items</p>
            </NavLink>
             <NavLink to="/list" className="flex items-center border border-gray-300 gap-3 border-r-0 px-3 py-2 rounded-lg">
            <img src={assets.order_icon} className='w-5 h-5' alt="" />
            <p className='hidden md:block'>List Items</p>
            </NavLink>
             <NavLink to="/orders" className="flex items-center border border-gray-300 gap-3 border-r-0 px-3 py-2 rounded-lg">
            <img src={assets.order_icon} className='w-5 h-5' alt="" />
            <p className='hidden md:block'>Oredrs</p>
            </NavLink>
        </div>
      
    </div>
  );
}

export default SideBar;
