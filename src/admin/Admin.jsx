import React, { useEffect } from "react";
import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";

export default function Admin() {
   const navigate = useNavigate();
   const location = useLocation();

   // ✅ Protect Route (except login)
   useEffect(() => {
      const auth = localStorage.getItem("admin_auth");

      if (!auth && location.pathname !== "/adminx/login") {
         navigate("/adminx/login");
      }
   }, [location.pathname, navigate]);

   return (
      <div className="min-h-screen bg-[#0b0f1a] text-gray-200">
         <Navbar />

         {/* ✅ Dynamic Page Content */}
         <div className="max-w-7xl mx-auto p-4">
            <Outlet />
         </div>
      </div>
   );
}

function Navbar() {
   const navigate = useNavigate();

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

               {/* Menu */}

               <div className="flex items-center gap-3">
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
                     className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-full text-sm">
                     Logout
                  </button>
               </div>
            </div>
         </div>
      </nav>
   );
}
