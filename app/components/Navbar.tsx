'use client'

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export const Navbar = () => {
  const [dropDownOpen,setDropDownOpen] = useState(false)
  const { data: session, status } = useSession();
  const router = useRouter()

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  const toggleDropDown = ()=>{
    setDropDownOpen(!dropDownOpen)
  }

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/auth/login' });
  };

  return (
    <div className="bg-slate-100 grid grid-cols-12 h-14 mt-4 mb-4 items-center">
      {/* Logo */}
      <div className="col-span-3 text-start ml-8 text-2xl primary">
        Logo
      </div>

      {/* Navigation Links */}
      <div className="col-span-4">
        <div className="flex justify-between items-center space-x-4 md:space-x-6">
          <a href="/add-recipe" className="text-sm md:text-lg primary">Home</a>
          <a href="" className="text-sm md:text-lg primary">About us</a>
          <a href="" className="text-sm md:text-lg primary">Explore</a>
          <a href="/auth/register" className="text-sm md:text-lg primary">Register</a>
        </div>
      </div>

      {/* Search Bar */}
      <div className="col-span-4 flex items-center justify-center p-2 space-x-2 relative">
        <input
          type="text"
          className="rounded-full w-full sm:w-3/4 h-10 px-4 py-2"
          placeholder="Search..."
        />
        <i className="text-xl text-primary cursor-pointer fa-solid fa-magnifying-glass absolute right-20"></i>
      </div>

      {/* User Profile Image */}
      <div className="col-span-1 flex justify-center relative">
        <Image
          src={session?.user?.image || '/user.png'}
          alt="user"
          width={40}
          height={40}
          className="cursor-pointer rounded-full object-cover"
          onClick={toggleDropDown}
        />
        {
          dropDownOpen && (
            <div className="absolute top-12 right-0 bg-yellow-500 shadow-lg rounded-2xl py-2 w-40">
              <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:rounded-3xl primary">Profile</a>
              <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:rounded-3xl primary">Logout</button>
            </div>
          )
        }
      </div>
    </div>
  );
};
