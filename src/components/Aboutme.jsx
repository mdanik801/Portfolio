import React, { useEffect, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import VanillaTilt from "vanilla-tilt";

import giticon from "../assets/images/github.png";
import linkedin from "../assets/images/linkedin.png";
import whatsapp from "../assets/images/whatsapp.png";
import facebook from "../assets/images/facebook.png";

const API_BASE = "https://mydb-beige.vercel.app/api";

const style = {
   page_body: `w-full 2xl:h-[100vh] h-auto lg:flex flex-col justify-center lg:mt-0 mt-[10vh]`,
   page_title: `m-[2vh] font-bold lg:text-[2.5rem] text-[2rem] font-Acme text-shadow-xl animate-pulse`,
   img_box: `flex lg:flex-row flex-col justify-start items-center lg:mt-[0vh] mt-[-5vh]`,
   img: `border border-green-700 border-b-0 bg-gray-400 backdrop-filter backdrop-blur-md bg-opacity-10 absolute 2xl:w-[60vh] lg:w-[45vh] w-[22vh] 2xl:ml-[185vh] lg:ml-[145vh] md:ml-[130vh] ml-[20vh] rounded-3xl animate-float z-20 shadow-black shadow-xl`,
   info_box: `2xl:min-h-[80vh] lg:min-h-[70vh] 2xl:w-[190vh] lg:w-[150vh] w-auto h-auto mx-[3vh] my-[2vh] lg:mt-[0vh] mt-[32vh] text-slate-400 bg-gray-900 shadow-black shadow-lg rounded-3xl lg:p-[10vh] p-[4vh] animate-float flex flex-col justify-between items-center`,
   info_deatils: `lg:text-[1rem] text-[0.7rem] font-Nunito font-semibold text-start lg:pt-0`,
   contact_btn: `lg:w-[6vh] w-[5vh] bg-gray-400 border-2 border-green-700 hover:bg-white mx-4 duration-300 animate-pulse hover:animate-none shadow-black shadow-xl rounded-full p-1`,
};

// richtext এ bold=white, বাকি slate — style inject করে
function injectStyles(html) {
   const div = document.createElement("div");
   div.innerHTML = html;
   // সব text node এর parent কে slate করো
   div.querySelectorAll("p, li, span, em, i").forEach((el) => {
      el.style.color = "#94a3b8"; // slate-400
   });
   // bold গুলো white করো
   div.querySelectorAll("b, strong").forEach((el) => {
      el.style.color = "#ffffff";
   });
   // ul/ol style
   div.querySelectorAll("ul").forEach((el) => {
      el.style.listStyleType = "disc";
      el.style.paddingLeft = "1rem";
      el.style.color = "#94a3b8";
   });
   div.querySelectorAll("ol").forEach((el) => {
      el.style.listStyleType = "decimal";
      el.style.paddingLeft = "1rem";
      el.style.color = "#94a3b8";
   });
   return div.innerHTML;
}

function stripHtml(html) {
   const tmp = document.createElement("div");
   tmp.innerHTML = html;
   return tmp.textContent || tmp.innerText || "";
}

function TypewriterHTML({ html }) {
   const [displayed, setDisplayed] = useState("");
   const [done, setDone] = useState(false);
   const fullText = useRef("");
   const indexRef = useRef(0);
   const timerRef = useRef(null);

   useEffect(() => {
      fullText.current = stripHtml(html);
      indexRef.current = 0;
      setDisplayed("");
      setDone(false);

      timerRef.current = setInterval(() => {
         indexRef.current += 2;
         setDisplayed(fullText.current.slice(0, indexRef.current));
         if (indexRef.current >= fullText.current.length) {
            clearInterval(timerRef.current);
            setDone(true);
         }
      }, 18);

      return () => clearInterval(timerRef.current);
   }, [html]);

   if (done) {
      return (
         <div className={`${style.info_deatils} w-full about-richtext`}>
            <style>{`
               .about-richtext { color: #94a3b8; }
               .about-richtext * { color: #94a3b8; }
               .about-richtext b,
               .about-richtext strong { color: #ffffff !important; }
               .about-richtext ul { list-style-type: disc; padding-left: 1rem; }
               .about-richtext ol { list-style-type: decimal; padding-left: 1rem; }
               .about-richtext li { margin-bottom: 4px; }
               .about-richtext p { margin-bottom: 8px; }
               .about-richtext u { text-decoration: underline; text-decoration-color: #22c55e; }
               .about-richtext i, .about-richtext em { color: #cbd5e1; }
            `}</style>
            <div dangerouslySetInnerHTML={{ __html: html }} />
         </div>
      );
   }

   return (
      <p className={`${style.info_deatils} w-full whitespace-pre-wrap text-slate-400`}>
         {displayed}
         <span className="animate-pulse text-green-500 font-bold">|</span>
      </p>
   );
}

function useInView(ref) {
   const [inView, setInView] = useState(false);
   useEffect(() => {
      const observer = new IntersectionObserver(
         ([entry]) => {
            if (entry.isIntersecting) setInView(true);
         },
         { threshold: 0.2 },
      );
      if (ref.current) observer.observe(ref.current);
      return () => observer.disconnect();
   }, []);
   return inView;
}

export default function Aboutme() {
   const [aboutData, setAboutData] = useState(null);
   const [loading, setLoading] = useState(true);
   const [startTyping, setStartTyping] = useState(false);

   const sectionRef = useRef(null);
   const tiltRef = useRef(null);
   const inView = useInView(sectionRef);

   const contact_button = [
      { id: 1, name: "github.com/mdanik801", icon: giticon, url: "https://github.com/mdanik801" },
      {
         id: 2,
         name: "Md. Aulad Hossain Anik",
         icon: linkedin,
         url: "https://www.linkedin.com/in/md-aulad-hossain-anik-965023298",
      },
      { id: 3, name: "01856713852", icon: whatsapp, url: "https://wa.me/qr/DFDHWW5PI3IEK1" },
      {
         id: 4,
         name: "Md Anik",
         icon: facebook,
         url: "https://www.facebook.com/1000anik?mibextid=ZbWKwL",
      },
   ];

   useEffect(() => {
      fetch(`${API_BASE}/items`)
         .then((res) => res.json())
         .then((json) => {
            if (json.success && json.data) {
               const aboutItem = json.data.find(
                  (item) =>
                     item.customData?._categoryName?.toLowerCase().includes("about") ||
                     item.customData?.["Profile Photo"] !== undefined,
               );
               if (aboutItem) setAboutData(aboutItem.customData);
            }
         })
         .catch((err) => console.error("About fetch error:", err))
         .finally(() => setLoading(false));
   }, []);

   useEffect(() => {
      if (inView && !loading && aboutData) {
         setStartTyping(true);
      }
   }, [inView, loading, aboutData]);

   useEffect(() => {
      if (tiltRef.current) {
         VanillaTilt.init(tiltRef.current, { max: 25, speed: 400, glare: true, "max-glare": 0.5 });
      }
   }, []);

   useEffect(() => {
      AOS.init({ duration: 1200, once: false });
   }, []);

   const profileImage = aboutData?.["Profile Photo"] || null;
   const htmlContent = aboutData?.["Description"] || aboutData?.["Bio"] || "";

   return (
      <div id="aboutme" ref={sectionRef} className={style.page_body}>
         <span data-aos="fade-right" className={style.page_title}>
            <span className="text-green-700">Abo</span>ut me
         </span>

         <div className={style.img_box}>
            {profileImage && (
               <img ref={tiltRef} src={profileImage} className={style.img} alt="Profile" />
            )}

            <div className={style.info_box}>
               {loading ? (
                  <div className="w-full flex flex-col gap-3 animate-pulse">
                     <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                     <div className="h-4 bg-gray-700 rounded w-full"></div>
                     <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                     <div className="h-4 bg-gray-700 rounded w-2/3"></div>
                  </div>
               ) : startTyping && htmlContent ? (
                  <TypewriterHTML html={htmlContent} />
               ) : htmlContent ? (
                  <p className={`${style.info_deatils} w-full text-slate-400`}>
                     <span className="animate-pulse text-green-500 font-bold">|</span>
                  </p>
               ) : (
                  <p className={`${style.info_deatils} text-slate-400`}>
                     Hello! I'm Md Aulad Hossain Anik, a passionate and versatile full-stack
                     developer.
                  </p>
               )}

               <div className="flex mt-6">
                  {contact_button.map((btn) => (
                     <a key={btn.id} href={btn.url} target="_blank" rel="noreferrer">
                        <img className={style.contact_btn} src={btn.icon} alt={btn.name} />
                     </a>
                  ))}
               </div>
            </div>
         </div>
      </div>
   );
}
