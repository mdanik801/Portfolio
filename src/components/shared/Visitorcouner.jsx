import React, { useEffect, useState } from "react";
import { db, doc, getDoc, setDoc, increment } from "../config/Firbase";

const VisitorCount = () => {
   const [count, setCount] = useState(null);

   useEffect(() => {
      const updateVisitorCount = async () => {
         const countRef = doc(db, "visitorCount", "count"); // 'visitorCount' collection, 'count' document
         const countDoc = await getDoc(countRef);

         if (countDoc.exists()) {
            const currentCount = countDoc.data().count;
            setCount(currentCount);

            // Increment the visitor count in Firestore
            await setDoc(countRef, { count: increment(1) }, { merge: true });
         } else {
            // Initialize count if it doesn't exist
            await setDoc(countRef, { count: 1 });
            setCount(1);
         }
      };

      updateVisitorCount();
   }, []);

   return (
      <div>
         <div className=" animate-pulse font-Acme text-[1rem] text-shadow-xl lg:mr-3">
            Visited <span className=" text-green-700 font-bold"> {count} +</span>
         </div>
      </div>
   );
};

export default VisitorCount;
