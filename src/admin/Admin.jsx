import React, { useState, useEffect } from "react";
import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";

export default function Admin() {
   const navigate = useNavigate();
   const location = useLocation();

   useEffect(() => {
      const auth = localStorage.getItem("admin_auth");
      if (!auth && location.pathname !== "/adminx/login") {
         navigate("/adminx/login");
      }
   }, [location.pathname, navigate]);

   return (
      <div className="min-h-screen bg-[#0b0f1a] text-gray-200">
         <Navbar />
         <div className="max-w-7xl mx-auto p-4">
            <Outlet />
         </div>
      </div>
   );
}

function Navbar() {
   const navigate = useNavigate();
   const [menuOpen, setMenuOpen] = useState(false);

   const handleLogout = () => {
      localStorage.removeItem("admin_auth");
      navigate("/adminx/login");
   };

   const navClass = ({ isActive }) =>
      `px-4 py-2 rounded-full text-sm font-medium transition ${
         isActive ? "bg-[#22c55e] text-black" : "text-gray-300 hover:text-white hover:bg-white/5"
      }`;

   return (
      <nav className="sticky top-0 z-50 bg-[#0b0f1a]/80 backdrop-blur border-b border-white/10">
         <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center h-16">
               {/* Logo */}
               <h1 className="text-xl font-bold">
                  <span className="text-[#22c55e]">Smart</span>Portfolio
               </h1>

               {/* Desktop Menu */}
               <div className="hidden md:flex items-center gap-3">
                  <NavLink to="/adminx/upload" className={navClass}>
                     Upload
                  </NavLink>
                  <NavLink to="/adminx/categories" className={navClass}>
                     Categories
                  </NavLink>
                  <NavLink to="/adminx/list" className={navClass}>
                     Portfolio
                  </NavLink>
                  <button
                     onClick={handleLogout}
                     className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-full text-sm text-white transition">
                     Logout
                  </button>
               </div>

               {/* Mobile Hamburger */}
               <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="md:hidden flex flex-col gap-1.5 p-2">
                  <span
                     className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
                  <span
                     className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}></span>
                  <span
                     className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
               </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
               <div className="md:hidden pb-4 flex flex-col gap-2">
                  <NavLink
                     to="/adminx/upload"
                     className={navClass}
                     onClick={() => setMenuOpen(false)}>
                     Upload
                  </NavLink>
                  <NavLink
                     to="/adminx/categories"
                     className={navClass}
                     onClick={() => setMenuOpen(false)}>
                     Categories
                  </NavLink>
                  <NavLink
                     to="/adminx/list"
                     className={navClass}
                     onClick={() => setMenuOpen(false)}>
                     Portfolio
                  </NavLink>
                  <button
                     onClick={handleLogout}
                     className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-full text-sm text-white transition text-left">
                     Logout
                  </button>
               </div>
            )}
         </div>
      </nav>
   );
}
