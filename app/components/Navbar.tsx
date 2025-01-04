'use client';

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { useSearch } from "../context/SearchContext";
import Link from 'next/link';

export const Navbar = () => {
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // For toggle menu
  const [query, setQuery] = useState("");

  const { setSearchResults } = useSearch();
  const debouncedQuery = useDebounce(query, 500);
  const { data: session, status } = useSession();

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
            <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-transparent bg-clip-text text-lg md:text-md lg:text-3xl">
              Fork &amp; Flavor
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
          className={`absolute md:static top-14 left-0 w-full md:w-auto bg-slate-100 md:flex md:items-center md:space-x-6 transform transition-transform ${menuOpen ? 'block' : 'hidden'}`}
        >
          <Link href="/" className="block md:inline-block px-4 py-2 md:py-0 text-sm md:text-lg text-center primary">
            Home
          </Link>
          <Link href="/about" className="block md:inline-block px-4 py-2 md:py-0 text-sm md:text-lg text-center primary">
            About
          </Link>
          <Link href="/" className="block md:inline-block px-4 py-2 md:py-0 text-sm md:text-lg text-center primary">
            Explore
          </Link>
          <Link href="/auth/register" className="block md:inline-block px-4 py-2 md:py-0 text-sm md:text-lg text-center primary">
            Register
          </Link>
        </div>

        {/* Search Bar */}
        <div className="flex items-center relative max-w-sm col-span-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="rounded-full w-full h-10 px-4 py-2"
            placeholder="Search for recipes"
          />
          <i className="text-xl text-primary cursor-pointer fa-solid fa-magnifying-glass absolute right-4 top-1/2 transform -translate-y-1/2"></i>
        </div>

        {/* User Profile Image */}
        <div className="relative hidden md:block">
          <Image
            src={session?.user?.image || '/user.png'}
            alt="user"
            width={40}
            height={40}
            className="cursor-pointer rounded-full object-cover"
            onClick={toggleDropDown}
          />
          {dropDownOpen && (
            <div className="absolute top-12 right-0 bg-yellow-500 shadow-lg rounded-2xl py-2 w-40">
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-yellow-400 hover:rounded-3xl primary"
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
