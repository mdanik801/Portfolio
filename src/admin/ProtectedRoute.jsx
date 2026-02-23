import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
   const isAuthenticated = localStorage.getItem("admin_auth") === "true";

   if (!isAuthenticated) {
      return <Navigate to="/adminx/login" replace />;
   }

   return children;
}
