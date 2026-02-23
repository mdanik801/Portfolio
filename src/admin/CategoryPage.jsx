import React, { useState, useEffect } from "react";
import axios from "axios";

const API = axios.create({ baseURL: "https://mydb-beige.vercel.app/api" });

const FIELD_TYPES = [
   { value: "text", label: "Text" },
   { value: "textarea", label: "Text Area" },
   { value: "richtext", label: "Rich Text (Bold/Italic/etc)" },
   { value: "url", label: "Link / URL" },
   { value: "file", label: "File / Image Upload" },
   { value: "number", label: "Number" },
];

export default function CategoryPage() {
   const [categories, setCategories] = useState([]);
   const [loading, setLoading] = useState(true);
   const [formData, setFormData] = useState({ name: "", fields: [] });
   const [newField, setNewField] = useState({ label: "", type: "text", required: false });
   const [editingId, setEditingId] = useState(null);

   const fetchCategories = () => {
      setLoading(true);
      API.get("/categories")
         .then((res) => setCategories(res.data || []))
         .catch(() => alert("Cannot load categories"))
         .finally(() => setLoading(false));
   };

   useEffect(() => {
      fetchCategories();
   }, []);

   const addField = () => {
      if (!newField.label) return alert("Field label required!");
      setFormData({ ...formData, fields: [...formData.fields, { ...newField }] });
      setNewField({ label: "", type: "text", required: false });
   };

   const removeField = (index) => {
      setFormData({ ...formData, fields: formData.fields.filter((_, i) => i !== index) });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (!formData.name) return alert("Category name required!");
      try {
         if (editingId) await API.put(`/categories/${editingId}`, formData);
         else await API.post("/categories", formData);
         alert(editingId ? "Updated!" : "Category created!");
         setFormData({ name: "", fields: [] });
         setEditingId(null);
         fetchCategories();
      } catch {
         alert("Error saving category!");
      }
   };

   const handleEdit = (cat) => {
      setEditingId(cat._id);
      setFormData({ name: cat.name, fields: cat.fields || [] });
      window.scrollTo({ top: 0, behavior: "smooth" });
   };

   const handleDelete = async (id) => {
      if (!confirm("Delete this category?")) return;
      try {
         await API.delete(`/categories/${id}`);
         fetchCategories();
      } catch {
         alert("Error deleting!");
      }
   };

   const getTypeLabel = (type) => FIELD_TYPES.find((t) => t.value === type)?.label || type;

   return (
      <div className="w-full max-w-4xl mx-auto mt-6 px-4 pb-20 overflow-x-hidden">
         <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
            <span className="text-[#22c55e]">{editingId ? "Edit" : "Create"}</span> Category
         </h2>

         <div className="bg-[#161b22]/70 backdrop-blur-md border border-white/5 rounded-2xl p-4 sm:p-8 shadow-2xl border-t-4 border-[#22c55e] space-y-6 mb-10">
            <form onSubmit={handleSubmit} className="space-y-6">
               <div>
                  <label className="block text-gray-400 mb-2">Category Name *</label>
                  <input
                     type="text"
                     value={formData.name}
                     onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                     className="w-full bg-[#0b0f1a] border border-white/10 rounded-lg px-4 py-3 text-white"
                     placeholder="e.g. Web Development"
                  />
               </div>

               <div>
                  <label className="block text-gray-400 mb-2">Add Fields</label>
                  <div className="bg-[#0b0f1a] border border-white/10 rounded-xl p-3 sm:p-4 space-y-3">
                     <input
                        type="text"
                        placeholder="Field label (e.g. GitHub Link)"
                        value={newField.label}
                        onChange={(e) => setNewField({ ...newField, label: e.target.value })}
                        onKeyDown={(e) => {
                           if (e.key === "Enter") {
                              e.preventDefault();
                              addField();
                           }
                        }}
                        className="w-full bg-[#161b22] border border-white/10 rounded-lg px-4 py-2 text-white"
                     />

                     {/* Mobile: stack, Desktop: row */}
                     <div className="flex flex-col sm:flex-row gap-3">
                        <select
                           value={newField.type}
                           onChange={(e) => setNewField({ ...newField, type: e.target.value })}
                           className="w-full sm:flex-1 bg-[#161b22] border border-white/10 rounded-lg px-3 py-2 text-white">
                           {FIELD_TYPES.map((t) => (
                              <option key={t.value} value={t.value}>
                                 {t.label}
                              </option>
                           ))}
                        </select>

                        <div className="flex items-center justify-between sm:justify-start gap-3">
                           <label className="flex items-center gap-2 text-gray-400 text-sm cursor-pointer">
                              <input
                                 type="checkbox"
                                 checked={newField.required}
                                 onChange={(e) =>
                                    setNewField({ ...newField, required: e.target.checked })
                                 }
                                 className="accent-[#22c55e] w-4 h-4"
                              />
                              Required
                           </label>
                           <button
                              type="button"
                              onClick={addField}
                              className="px-5 py-2 bg-[#22c55e] text-black rounded-lg font-bold hover:bg-white transition">
                              + Add
                           </button>
                        </div>
                     </div>
                  </div>

                  <div className="mt-3 space-y-2">
                     {formData.fields.map((f, i) => (
                        <div
                           key={i}
                           className="flex items-center justify-between bg-[#0b0f1a] border border-white/10 rounded-lg px-3 py-2 gap-2">
                           <div className="flex flex-wrap items-center gap-2 flex-1 min-w-0">
                              <span className="text-white font-medium truncate">{f.label}</span>
                              <span className="text-xs bg-[#22c55e]/10 text-[#22c55e] border border-[#22c55e]/20 rounded-full px-2 py-0.5 whitespace-nowrap">
                                 {getTypeLabel(f.type)}
                              </span>
                              {f.required && (
                                 <span className="text-xs bg-red-500/10 text-red-400 border border-red-400/20 rounded-full px-2 py-0.5 whitespace-nowrap">
                                    Required
                                 </span>
                              )}
                           </div>
                           <button
                              type="button"
                              onClick={() => removeField(i)}
                              className="text-red-400 hover:text-red-300 transition font-bold flex-shrink-0">
                              ✕
                           </button>
                        </div>
                     ))}
                  </div>
               </div>

               <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-white/10">
                  {editingId && (
                     <button
                        type="button"
                        onClick={() => {
                           setEditingId(null);
                           setFormData({ name: "", fields: [] });
                        }}
                        className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-medium transition">
                        Cancel
                     </button>
                  )}
                  <button
                     type="submit"
                     className="w-full sm:w-auto px-8 py-2.5 rounded-lg bg-[#22c55e] text-black font-bold hover:bg-white transition shadow-lg">
                     {editingId ? "Update Category" : "Create Category"}
                  </button>
               </div>
            </form>
         </div>

         <h3 className="text-xl font-bold mb-4 text-gray-300">All Categories</h3>
         {loading ? (
            <div className="text-center text-gray-400 animate-pulse">Loading...</div>
         ) : categories.length === 0 ? (
            <div className="text-center text-gray-500 py-10">No categories yet.</div>
         ) : (
            <div className="space-y-3">
               {categories.map((cat) => (
                  <div
                     key={cat._id}
                     className="bg-[#161b22] border border-white/10 rounded-xl px-4 sm:px-6 py-4">
                     <div className="flex items-start sm:items-center justify-between gap-3">
                        <div className="min-w-0">
                           <p className="text-white font-semibold truncate">{cat.name}</p>
                           <p className="text-gray-500 text-sm">{cat.fields?.length || 0} fields</p>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                           <button
                              onClick={() => handleEdit(cat)}
                              className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm transition">
                              ✏️
                           </button>
                           <button
                              onClick={() => handleDelete(cat._id)}
                              className="px-3 py-1.5 rounded-lg bg-red-700 hover:bg-red-600 text-white text-sm transition">
                              🗑️
                           </button>
                        </div>
                     </div>
                     {cat.fields?.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                           {cat.fields.map((f, i) => (
                              <span
                                 key={i}
                                 className="text-xs bg-[#22c55e]/10 text-[#22c55e] border border-[#22c55e]/20 rounded-full px-2 py-1">
                                 {f.label}
                                 <span className="text-gray-500 ml-1">
                                    ({getTypeLabel(f.type)})
                                 </span>
                                 {f.required && <span className="text-red-400 ml-1">*</span>}
                              </span>
                           ))}
                        </div>
                     )}
                  </div>
               ))}
            </div>
         )}
      </div>
   );
}
