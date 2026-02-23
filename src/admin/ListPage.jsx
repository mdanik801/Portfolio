import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = axios.create({ baseURL: "https://mydb-beige.vercel.app/api" });
const PER_PAGE = 9;

export default function ListPage() {
   const [items, setItems] = useState([]);
   const [categories, setCategories] = useState([]);
   const [loading, setLoading] = useState(true);
   const [search, setSearch] = useState("");
   const [selectedCat, setSelectedCat] = useState("all");
   const [page, setPage] = useState(1);
   const navigate = useNavigate();

   const fetchData = () => {
      setLoading(true);
      Promise.all([API.get("/items"), API.get("/categories")])
         .then(([itemsRes, catsRes]) => {
            setItems(itemsRes.data?.data || []);
            setCategories(catsRes.data || []);
         })
         .catch(() => alert("Cannot load data"))
         .finally(() => setLoading(false));
   };

   useEffect(() => {
      fetchData();
   }, []);

   const handleDelete = async (id) => {
      if (!confirm("Delete this project?")) return;
      try {
         await API.delete(`/items/${id}`);
         fetchData();
      } catch {
         alert("Error deleting!");
      }
   };

   const getImage = (item) => {
      if (item.content && (item.content.startsWith("http") || item.content.startsWith("data:")))
         return item.content;
      if (item.customData) {
         const imgKey = Object.keys(item.customData).find(
            (k) =>
               typeof item.customData[k] === "string" &&
               (item.customData[k].startsWith("http") ||
                  item.customData[k].startsWith("data:image")),
         );
         if (imgKey) return item.customData[imgKey];
      }
      return null;
   };

   const getTitle = (item) =>
      item.title || item.customData?.["Title"] || item.customData?.["Project Title"] || "Untitled";

   const getDescription = (item) => item.description || item.customData?.["Description"] || "";

   const getCategoryId = (item) =>
      item.category?._id?.toString() || item.category?.toString() || "";

   const filtered = items.filter((item) => {
      const matchSearch = getTitle(item).toLowerCase().includes(search.toLowerCase());
      const matchCat = selectedCat === "all" || getCategoryId(item) === selectedCat;
      return matchSearch && matchCat;
   });

   const totalPages = Math.ceil(filtered.length / PER_PAGE);
   const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

   const handleFilter = (catId) => {
      setSelectedCat(catId);
      setPage(1);
   };

   return (
      <div className="max-w-6xl mx-auto mt-10 px-4 pb-20">
         {/* Header */}
         <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <h2 className="text-3xl font-bold">
               <span className="text-[#22c55e]">All</span> Projects
               <span className="text-gray-500 text-lg ml-3">({filtered.length})</span>
            </h2>
            <div className="flex gap-3">
               <input
                  type="text"
                  placeholder="Search projects..."
                  value={search}
                  onChange={(e) => {
                     setSearch(e.target.value);
                     setPage(1);
                  }}
                  className="bg-[#161b22] border border-white/10 rounded-lg px-4 py-2 text-white w-48"
               />
               <button
                  onClick={() => navigate("/adminx/upload")}
                  className="px-5 py-2 bg-[#22c55e] text-black font-bold rounded-lg hover:bg-white transition">
                  + New Project
               </button>
            </div>
         </div>

         {/* Category Filter */}
         <div className="flex flex-wrap gap-2 mb-8">
            <button
               onClick={() => handleFilter("all")}
               className={`px-4 py-2 rounded-full text-sm font-medium transition border ${
                  selectedCat === "all"
                     ? "bg-[#22c55e] text-black border-[#22c55e]"
                     : "bg-[#161b22] text-gray-300 border-white/10 hover:border-[#22c55e]"
               }`}>
               All <span className="ml-1 opacity-70">({items.length})</span>
            </button>
            {categories.map((cat) => {
               const count = items.filter((i) => getCategoryId(i) === cat._id.toString()).length;
               return (
                  <button
                     key={cat._id}
                     onClick={() => handleFilter(cat._id.toString())}
                     className={`px-4 py-2 rounded-full text-sm font-medium transition border ${
                        selectedCat === cat._id.toString()
                           ? "bg-[#22c55e] text-black border-[#22c55e]"
                           : "bg-[#161b22] text-gray-300 border-white/10 hover:border-[#22c55e]"
                     }`}>
                     {cat.name} <span className="ml-1 opacity-70">({count})</span>
                  </button>
               );
            })}
         </div>

         {/* Content */}
         {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {[...Array(6)].map((_, i) => (
                  <div
                     key={i}
                     className="bg-[#161b22] border border-white/10 rounded-2xl overflow-hidden animate-pulse">
                     <div className="w-full h-44 bg-[#0b0f1a]"></div>
                     <div className="p-5 space-y-3">
                        <div className="h-3 bg-white/5 rounded w-1/3"></div>
                        <div className="h-5 bg-white/5 rounded w-2/3"></div>
                        <div className="h-3 bg-white/5 rounded w-full"></div>
                     </div>
                  </div>
               ))}
            </div>
         ) : filtered.length === 0 ? (
            <div className="text-center text-gray-500 py-20">
               <p className="text-4xl mb-3">🔍</p>
               No projects found.
            </div>
         ) : (
            <>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paginated.map((item) => {
                     const image = getImage(item);
                     const title = getTitle(item);
                     const description = getDescription(item);
                     return (
                        <div
                           key={item._id}
                           className="bg-[#161b22] border border-white/10 rounded-2xl overflow-hidden hover:border-[#22c55e]/50 transition group flex flex-col">
                           {image ? (
                              <img
                                 src={image}
                                 alt={title}
                                 loading="lazy"
                                 className="w-full h-44 object-cover group-hover:scale-105 transition duration-300"
                              />
                           ) : (
                              <div className="w-full h-44 bg-[#0b0f1a] flex items-center justify-center">
                                 <p className="text-4xl">🖼️</p>
                              </div>
                           )}
                           <div className="p-5 flex flex-col flex-1">
                              <p className="text-xs text-[#22c55e] mb-1 uppercase tracking-widest">
                                 {item.category?.name || "Uncategorized"}
                              </p>
                              <h3 className="text-white font-bold text-lg mb-2 truncate">
                                 {title}
                              </h3>
                              <p
                                 className="text-gray-400 text-sm line-clamp-2 mb-4"
                                 dangerouslySetInnerHTML={{ __html: description }}
                              />
                              {item.technology?.length > 0 && (
                                 <div className="flex flex-wrap gap-1 mb-4">
                                    {item.technology.map((t, i) => (
                                       <span
                                          key={i}
                                          className="text-xs bg-[#22c55e]/10 text-[#22c55e] border border-[#22c55e]/20 rounded-full px-2 py-0.5">
                                          {t}
                                       </span>
                                    ))}
                                 </div>
                              )}
                              <div className="flex gap-2 mt-auto">
                                 <button
                                    onClick={() => navigate(`/adminx/edit/${item._id.toString()}`)}
                                    className="flex-1 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition">
                                    ✏️ Edit
                                 </button>
                                 <button
                                    onClick={() => handleDelete(item._id.toString())}
                                    className="flex-1 py-2 rounded-lg bg-red-700 hover:bg-red-600 text-white text-sm font-medium transition">
                                    🗑️ Delete
                                 </button>
                              </div>
                           </div>
                        </div>
                     );
                  })}
               </div>

               {totalPages > 1 && (
                  <div className="flex justify-center gap-2 mt-10">
                     <button
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="px-4 py-2 rounded-lg bg-[#161b22] border border-white/10 text-white disabled:opacity-30 hover:border-[#22c55e] transition">
                        ← Prev
                     </button>
                     {[...Array(totalPages)].map((_, i) => (
                        <button
                           key={i}
                           onClick={() => setPage(i + 1)}
                           className={`px-4 py-2 rounded-lg border transition ${
                              page === i + 1
                                 ? "bg-[#22c55e] text-black border-[#22c55e] font-bold"
                                 : "bg-[#161b22] border-white/10 text-white hover:border-[#22c55e]"
                           }`}>
                           {i + 1}
                        </button>
                     ))}
                     <button
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                        className="px-4 py-2 rounded-lg bg-[#161b22] border border-white/10 text-white disabled:opacity-30 hover:border-[#22c55e] transition">
                        Next →
                     </button>
                  </div>
               )}
            </>
         )}
      </div>
   );
}
