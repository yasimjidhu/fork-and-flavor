'use client';

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { useSearch } from "../context/SearchContext";

export const Navbar = () => {
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // For toggle menu
  const [query, setQuery] = useState("");

  const { setSearchResults } = useSearch();
  const debouncedQuery = useDebounce(query, 500);
  const { data: session, status } = useSession();

  const router = useRouter();

  const handleSearch = async () => {
    if (debouncedQuery) {
      const res = await fetch(`/api/recipes/search?search=${debouncedQuery}`);
      const data = await res.json();
      setSearchResults(data.recipes);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [debouncedQuery]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  const toggleDropDown = () => {
    setDropDownOpen(!dropDownOpen);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/auth/login' });
  };

  return (
    <nav className="bg-slate-100 px-4 py-2 md:px-8 shadow-md">
      <div className="flex justify-between items-center h-14">
        {/* Logo */}
        <div className="text-start">
          <h1 className="font-bold text-yellow-500 drop-shadow-lg tracking-wide">
            <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-transparent bg-clip-text text-lg md:text-2xl lg:text-3xl">
              Fork & Flavor
            </span>
          </h1>
        </div>

        {/* Hamburger Icon */}
        <button
          className="md:hidden text-yellow-500 focus:outline-none"
          onClick={toggleMenu}
        >
          <i className={`fa ${menuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
        </button>

        {/* Navigation Links */}
        <div
          className={`absolute md:static m-6 top-14 left-0 w-full md:w-auto bg-slate-100 md:flex md:items-center md:space-x-6 transform transition-transform ${
            menuOpen ? 'block' : 'hidden'
          }`}
        >
          <a href="/add-recipe" className="block md:inline-block px-4 py-2 md:py-0 text-sm md:text-lg primary ">
            Home
          </a>
          <a href="" className="block md:inline-block px-4 py-2 md:py-0 text-sm md:text-lg primary">
            About
          </a>
          <a href="" className="block md:inline-block px-4 py-2 md:py-0 text-sm md:text-lg primary">
            Explore
          </a>
          <a href="/auth/register" className="block md:inline-block px-4 py-2 md:py-0 text-sm md:text-lg primary">
            Register
          </a>
        </div>

        {/* User Profile Image */}
        <div className="relative hidden lg:block">
          <Image
            src={session?.user?.image || '/user.png'}
            alt="user"
            width={40}
            height={40}
            className="cursor-pointer rounded-full object-cover"
            onClick={toggleDropDown}
          />
          {dropDownOpen && (
            <div className="absolute top-12 right-0 bg-yellow-500 shadow-lg rounded-2xl py-2 w-40 ">
              <a
                href="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:rounded-3xl primary"
              >
                Profile
              </a>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:rounded-3xl primary"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
