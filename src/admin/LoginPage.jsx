import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function LoginPage() {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm();
   const [error, setError] = useState("");
   const [showPass, setShowPass] = useState(false);
   const navigate = useNavigate();

   const onSubmit = async (data) => {
      setError("");
      try {
         const res = await fetch("https://mydb-beige.vercel.app/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
               username: data.username.trim(),
               password: data.password.trim(),
            }),
         });
         const result = await res.json();
         if (result.success) {
            localStorage.setItem("admin_auth", "true");
            navigate("/adminx/upload");
         } else {
            setError("Invalid username or password!");
         }
      } catch (err) {
         console.error(err);
         setError("Server error! Try again.");
      }
   };

   return (
      <div className="min-h-screen bg-[#0b0f1a] flex items-center justify-center px-4">
         <div className="w-full max-w-md">
            <div className="text-center mb-8">
               <h1 className="text-3xl font-bold">
                  <span className="text-[#22c55e]">Smart</span>Portfolio
               </h1>
               <p className="text-gray-500 mt-2">Admin Panel Login</p>
            </div>

            <form
               onSubmit={handleSubmit(onSubmit)}
               className="bg-[#161b22]/70 backdrop-blur-md border border-white/5 rounded-2xl p-8 shadow-2xl border-t-4 border-[#22c55e] space-y-5">
               <div>
                  <label className="block text-gray-400 mb-2">Username</label>
                  <input
                     {...register("username", { required: "Username is required" })}
                     type="text"
                     className="w-full bg-[#0b0f1a] border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-[#22c55e]/50 transition"
                     placeholder="Enter username"
                  />
                  {errors.username && (
                     <p className="text-red-400 text-sm mt-1">{errors.username.message}</p>
                  )}
               </div>

               <div>
                  <label className="block text-gray-400 mb-2">Password</label>
                  <div className="relative">
                     <input
                        {...register("password", { required: "Password is required" })}
                        type={showPass ? "text" : "password"}
                        className="w-full bg-[#0b0f1a] border border-white/10 rounded-lg px-4 py-3 pr-12 text-white outline-none focus:border-[#22c55e]/50 transition"
                        placeholder="Enter password"
                     />
                     <button
                        type="button"
                        onClick={() => setShowPass(!showPass)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition text-lg">
                        {showPass ? "🙈" : "👁️"}
                     </button>
                  </div>
                  {errors.password && (
                     <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
                  )}
               </div>

               {error && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3 text-red-400 text-sm">
                     ⚠️ {error}
                  </div>
               )}

               <button
                  type="submit"
                  className="w-full py-3 bg-[#22c55e] text-black font-bold rounded-lg hover:bg-white transition shadow-lg">
                  Login
               </button>
            </form>
         </div>
      </div>
   );
}
