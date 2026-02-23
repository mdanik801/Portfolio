import React from "react";

import Home from "./components/Home.jsx";

import Admin from "./admin/Admin.jsx";

import UploadPage from "./admin/UploadPage.jsx";

import CategoryPage from "./admin/CategoryPage.jsx";

import ListPage from "./admin/ListPage.jsx";

import LoginPage from "./admin/LoginPage.jsx";

import ProtectedRoute from "./admin/ProtectedRoute.jsx";

export const routes = [
   // PUBLIC

   {
      path: "/",
      element: <Home />,
   },

   // ADMIN PANEL

   {
      path: "/adminx",

      element: <Admin />,

      children: [
         // default

         {
            index: true,

            element: (
               <ProtectedRoute>
                  <UploadPage />
               </ProtectedRoute>
            ),
         },

         // upload

         {
            path: "upload",

            element: (
               <ProtectedRoute>
                  <UploadPage />
               </ProtectedRoute>
            ),
         },

         // EDIT WITH PARAMS

         {
            path: "edit/:id",

            element: (
               <ProtectedRoute>
                  <UploadPage />
               </ProtectedRoute>
            ),
         },

         // categories

         {
            path: "categories",

            element: (
               <ProtectedRoute>
                  <CategoryPage />
               </ProtectedRoute>
            ),
         },

         // list

         {
            path: "list",

            element: (
               <ProtectedRoute>
                  <ListPage />
               </ProtectedRoute>
            ),
         },

         // login

         {
            path: "login",

            element: <LoginPage />,
         },

         // admin 404

         {
            path: "*",

            element: (
               <div className="text-center mt-20 text-red-500 text-xl">
                  404 - Admin Page Not Found
               </div>
            ),
         },
      ],
   },

   // GLOBAL 404

   {
      path: "*",

      element: (
         <div className="min-h-screen bg-[#0b0f1a] flex items-center justify-center">
            <div className="text-center">
               <p className="text-8xl mb-6">🚫</p>

               <h1 className="text-4xl font-bold text-white mb-3">404</h1>

               <p className="text-gray-500 text-xl mb-6">You are in the wrong URL</p>

               <a
                  href="/"
                  className="px-6 py-3 bg-[#22c55e] text-black font-bold rounded-lg hover:bg-white transition">
                  Go Home
               </a>
            </div>
         </div>
      ),
   },
];
