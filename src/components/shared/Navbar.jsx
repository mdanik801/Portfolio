import { useEffect, useRef, useState } from "react";
import download from "../../assets/images/download.png";
import VanillaTilt from "vanilla-tilt";

import resume from "../../assets/images/Anik Resume.pdf";

export default function Navbar() {
   const navbtn = [
      { id: 1, name: "HOME", url: "home" },
      { id: 2, name: "ABOUT ME", url: "aboutme" },
      { id: 3, name: "PROJECTS", url: "project" },
      { id: 4, name: "SKILLS", url: "skill" },
      { id: 5, name: "CERTIFICATES", url: "certificate" },
      { id: 6, name: "BLOG", url: "blog" },
      { id: 7, name: "CONTACT", url: "contact" },
   ];
   // navbar hiden show===============
   const [show, setShow] = useState(true);
   const [lastScrollY, setLastScrollY] = useState(0);

   const controlNavbar = () => {
      if (typeof window !== "undefined") {
         if (window.scrollY > lastScrollY) {
            // if scroll down hide the navbar
            setShow(false);
         } else {
            // if scroll up show the navbar
            setShow(true);
         }
         setLastScrollY(window.scrollY);
      }
   };

   useEffect(() => {
      if (typeof window !== "undefined") {
         window.addEventListener("scroll", controlNavbar);
      }
      return () => {
         if (typeof window !== "undefined") {
            window.removeEventListener("scroll", controlNavbar);
         }
      };
   }, [lastScrollY]);

   return (
      <nav
         className={` z-50  fixed top-0 2xl:w-[180vh]   xl:w-[130vh] lg:w-[135vh] 2xl:h-[12vh] lg:h-[8vh]  xl:mx-[25vh] lg:mx-[25vh]  w-full h-[6vh] transition-transform duration-300  lg:border border-b lg:shadow-md shadow-black  lg:rounded-3xl bg-opacity-10 flex lg:justify-between justify-center 2xl:p-2 p-1 items-center  bg-gray-400 backdrop-filter backdrop-blur-md ${
            show ? "transform translate-y-0" : "transform -translate-y-full"
         }`}>
         <ul className=" flex items-center justify-center  ">
            {navbtn.map((btn) => (
               <>
                  {" "}
                  <li className=" lg:mx-2 mx-0.5   lg:p-1 p-0.5 2xl:text-[1.3rem] lg:text-[1rem] md:text-[0.9rem] text-[0.5rem] font-Nunito font-bold  hover:text-green-700 duration-300 text-shadow-lg ">
                     <a href={`#${btn.url}`}>{btn.name}</a>
                  </li>
               </>
            ))}
         </ul>{" "}
         <a
            className=" hidden   lg:flex md:flex  justify-center items-center border-2   hover:bg-gray-800 border-green-700 p-0.5 mx-2 2xl:w-[35vh] lg:w-[18vh] md:w-[14vh] rounded-3xl 2xl:h-[9vh] lg:h-[6vh] md:h-[4vh] 2xl:text-[1.3rem] text-[0.8rem]  font-bold font-Nunito duration-300"
            href={resume}
            download="Anik Resume.pdf"
            rel="noopener noreferrer">
            {" "}
            <img className="2xl:w-[4vh] md:w-[3vh] w-[4vh] mx-2" src={download} alt="" />
            Resume
         </a>
      </nav>
   );
}
