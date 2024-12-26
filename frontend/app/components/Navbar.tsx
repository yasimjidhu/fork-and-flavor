import React from "react";

export const Navbar = () => {
  return (
    <div className="bg-slate-100 grid grid-cols-12 h-14 mt-4 mb-4 items-center">
      {/* Logo */}
      <div className="col-span-4 text-start ml-8 text-2xl primary">
        Logo
      </div>

      {/* Navigation Links */}
      <div className="col-span-4">
        <div className="flex justify-between items-center space-x-4 md:space-x-6">
          <a href="/add-recipe" className="text-sm md:text-lg primary">Home</a>
          <a href="" className="text-sm md:text-lg primary">About us</a>
          <a href="" className="text-sm md:text-lg primary">Explore</a>
          <a href="" className="text-sm md:text-lg primary">Reviews</a>
        </div>
      </div>

      {/* Search Bar */}
      <div className="col-span-4 flex items-center justify-center p-2 space-x-2 relative">
        <input
          type="text"
          className="rounded-full w-full sm:w-3/4 h-10 px-4 py-2 "
          placeholder="Search..."
        />
        <i className="text-xl text-primary cursor-pointer fa-solid fa-magnifying-glass absolute right-20"></i>
      </div>
    </div>
  );
};
