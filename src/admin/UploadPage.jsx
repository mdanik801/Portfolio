import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const API = axios.create({ baseURL: "https://mydb-beige.vercel.app/api" });

function RichEditor({ value, onChange }) {
   const editorRef = React.useRef(null);

   React.useEffect(() => {
      if (editorRef.current) editorRef.current.innerHTML = value || "";
   }, []);

   const format = (cmd) => {
      editorRef.current?.focus();
      document.execCommand(cmd, false, null);
   };

   return (
      <div className="border border-white/10 rounded-lg overflow-hidden bg-[#0b0f1a]">
         <div className="bg-[#161b22] border-b border-white/10 p-2 flex gap-1 flex-wrap">
            <button
               type="button"
               onClick={() => format("bold")}
               className="px-3 py-1.5 text-gray-300 hover:bg-[#22c55e] hover:text-black rounded font-bold transition text-sm">
               B
            </button>
            <button
               type="button"
               onClick={() => format("italic")}
               className="px-3 py-1.5 text-gray-300 hover:bg-[#22c55e] hover:text-black rounded italic transition text-sm">
               I
            </button>
            <button
               type="button"
               onClick={() => format("underline")}
               className="px-3 py-1.5 text-gray-300 hover:bg-[#22c55e] hover:text-black rounded underline transition text-sm">
               U
            </button>
            <button
               type="button"
               onClick={() => format("strikeThrough")}
               className="px-3 py-1.5 text-gray-300 hover:bg-[#22c55e] hover:text-black rounded line-through transition text-sm">
               S
            </button>
            <div className="w-px bg-white/10 mx-1"></div>
            <button
               type="button"
               onClick={() => format("insertUnorderedList")}
               className="px-3 py-1.5 text-gray-300 hover:bg-[#22c55e] hover:text-black rounded transition text-sm">
               • List
            </button>
            <button
               type="button"
               onClick={() => format("insertOrderedList")}
               className="px-3 py-1.5 text-gray-300 hover:bg-[#22c55e] hover:text-black rounded transition text-sm">
               1. List
            </button>
         </div>
         <div
            ref={editorRef}
            contentEditable
            onInput={(e) => onChange(e.currentTarget.innerHTML)}
            className="p-3 min-h-[120px] text-white outline-none"
            style={{ lineHeight: "1.6" }}
         />
      </div>
   );
}

function FileUploadField({ value, onChange }) {
   const [dragging, setDragging] = React.useState(false);
   const [compressing, setCompressing] = React.useState(false);
   const inputRef = React.useRef(null);

   const processFile = (file) => {
      if (!file) return;
      if (!file.type.startsWith("image/")) return alert("Only images allowed!");
      setCompressing(true);
      const reader = new FileReader();
      reader.onload = (e) => {
         const img = new Image();
         img.onload = () => {
            const canvas = document.createElement("canvas");
            const MAX = 800;
            let w = img.width;
            let h = img.height;
            if (w > h && w > MAX) {
               h = (h * MAX) / w;
               w = MAX;
            } else if (h > MAX) {
               w = (w * MAX) / h;
               h = MAX;
            }
            canvas.width = w;
            canvas.height = h;
            canvas.getContext("2d").drawImage(img, 0, 0, w, h);
            onChange(canvas.toDataURL("image/jpeg", 0.7));
            setCompressing(false);
         };
         img.src = e.target.result;
      };
      reader.readAsDataURL(file);
   };

   const handleDrop = (e) => {
      e.preventDefault();
      setDragging(false);
      processFile(e.dataTransfer.files[0]);
   };

   const handlePaste = (e) => {
      const item = Array.from(e.clipboardData.items).find((i) => i.type.startsWith("image/"));
      if (item) processFile(item.getAsFile());
   };

   return (
      <div
         onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
         }}
         onDragLeave={() => setDragging(false)}
         onDrop={handleDrop}
         onPaste={handlePaste}
         onClick={() => !compressing && inputRef.current?.click()}
         tabIndex={0}
         className={`relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition outline-none
            ${dragging ? "border-[#22c55e] bg-[#22c55e]/10" : "border-white/20 hover:border-[#22c55e]"}
            ${compressing ? "opacity-60 cursor-wait" : ""}`}>
         <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={(e) => processFile(e.target.files[0])}
            className="hidden"
         />
         {compressing ? (
            <div className="text-[#22c55e] animate-pulse">
               <p className="text-3xl mb-2">⏳</p>
               <p>Compressing image...</p>
            </div>
         ) : value ? (
            <div>
               <img
                  src={value}
                  alt="Preview"
                  className="max-h-48 mx-auto rounded mb-3 object-contain"
               />
               <p className="text-gray-500 text-xs">Click, drag, or paste to replace</p>
            </div>
         ) : (
            <div className="text-gray-500">
               <p className="text-4xl mb-3">☁️</p>
               <p className="font-medium">Click to browse</p>
               <p className="text-sm mt-1">or drag & drop / paste image</p>
            </div>
         )}
      </div>
   );
}

function DynamicField({ field, value, onChange }) {
   if (field.type === "richtext") return <RichEditor value={value} onChange={onChange} />;
   if (field.type === "file") return <FileUploadField value={value} onChange={onChange} />;
   if (field.type === "textarea")
      return (
         <textarea
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            rows={4}
            className="w-full bg-[#0b0f1a] border border-white/10 rounded-lg px-4 py-3 text-white resize-y outline-none"
         />
      );
   return (
      <input
         type={field.type || "text"}
         value={value || ""}
         onChange={(e) => onChange(e.target.value)}
         className="w-full bg-[#0b0f1a] border border-white/10 rounded-lg px-4 py-3 text-white"
      />
   );
}

export default function UploadPage() {
   const [categories, setCategories] = useState([]);
   const [loading, setLoading] = useState(true);
   const [category_id, setCategory_id] = useState("");
   const [fieldValues, setFieldValues] = useState({});
   const [editingId, setEditingId] = useState(null);
   const navigate = useNavigate();
   const { id } = useParams();

   useEffect(() => {
      setLoading(true);
      API.get("/categories")
         .then((res) => {
            setCategories(res.data || []);
            if (id) {
               API.get("/items")
                  .then((itemRes) => {
                     const allItems = itemRes.data?.data || [];
                     const item = allItems.find((i) => i._id?.toString() === id?.toString());
                     if (item) {
                        setEditingId(id);
                        setCategory_id(
                           item.category?._id?.toString() || item.category?.toString() || "",
                        );
                        setFieldValues(item.customData || {});
                     }
                  })
                  .finally(() => setLoading(false));
            } else {
               setLoading(false);
            }
         })
         .catch(() => {
            console.error("Cannot load categories");
            setLoading(false);
         });
   }, [id]);

   const selectedCategory = categories.find((c) => c._id.toString() === category_id.toString());

   const handleFieldChange = (label, value) => {
      setFieldValues((prev) => ({ ...prev, [label]: value }));
   };

   const handleCategoryChange = (e) => {
      setCategory_id(e.target.value);
      setFieldValues({});
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (!category_id) return alert("Please select a category!");

      const requiredFields = selectedCategory?.fields?.filter((f) => f.required) || [];
      for (const f of requiredFields) {
         if (!fieldValues[f.label]) return alert(`${f.label} is required!`);
      }

      const payload = {
         category: category_id,
         customData: fieldValues,
      };

      try {
         if (editingId) await API.put(`/items/${editingId}`, payload);
         else await API.post("/items", payload);
         alert(editingId ? "Updated!" : "Added!");
         navigate("/adminx/list");
      } catch (err) {
         console.error(err);
         alert("Error saving item!");
      }
   };

   if (loading)
      return <div className="text-center mt-20 text-gray-400 animate-pulse">Loading...</div>;

   return (
      <div className="max-w-4xl mx-auto mt-10 px-4 pb-20">
         <h2 className="text-3xl font-bold mb-6 text-center">
            <span className="text-[#22c55e]">{editingId ? "Update" : "Create New"}</span> Project
         </h2>
         <form
            onSubmit={handleSubmit}
            className="bg-[#161b22]/70 backdrop-blur-md border border-white/5 rounded-2xl p-8 shadow-2xl border-t-4 border-[#22c55e] space-y-6">
            <div>
               <label className="block text-gray-400 mb-2">Project Category *</label>
               <select
                  value={category_id}
                  onChange={handleCategoryChange}
                  className="w-full bg-[#0b0f1a] border border-white/10 rounded-lg px-4 py-3 text-white">
                  <option value="">— Select Category —</option>
                  {categories.map((c) => (
                     <option key={c._id} value={c._id}>
                        {c.name}
                     </option>
                  ))}
               </select>
            </div>

            {!category_id && (
               <div className="text-center text-gray-500 py-10">
                  <p className="text-4xl mb-3">👆</p>
                  Please select a category to see the fields
               </div>
            )}

            {selectedCategory?.fields?.length > 0 && (
               <div className="space-y-5">
                  {selectedCategory.fields.map((f) => (
                     <div key={f.label}>
                        <label className="block text-gray-400 mb-2">
                           {f.label}
                           {f.required && <span className="text-red-400 ml-1">*</span>}
                        </label>
                        <DynamicField
                           field={f}
                           value={fieldValues[f.label] || ""}
                           onChange={(val) => handleFieldChange(f.label, val)}
                        />
                     </div>
                  ))}
               </div>
            )}

            {category_id && selectedCategory?.fields?.length === 0 && (
               <div className="text-center text-gray-500 py-6">
                  ⚠️ This category has no fields. Add fields from Setup page.
               </div>
            )}

            {category_id && (
               <div className="flex justify-end gap-4 pt-4 border-t border-white/10">
                  <button
                     type="button"
                     onClick={() => navigate("/adminx/list")}
                     className="px-6 py-2.5 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-medium transition">
                     Cancel
                  </button>
                  <button
                     type="submit"
                     className="px-8 py-2.5 rounded-lg bg-[#22c55e] text-black font-bold hover:bg-white transition shadow-lg">
                     {editingId ? "Update Project" : "Submit Project"}
                  </button>
               </div>
            )}
         </form>
      </div>
   );
}
