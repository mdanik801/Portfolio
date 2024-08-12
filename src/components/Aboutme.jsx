import React, { useEffect, useRef } from "react";

import AOS from "aos";
import "aos/dist/aos.css";

import myimg from "../assets/images/myimg.png";

import giticon from "../assets/images/github.png";
import linkedin from "../assets/images/linkedin.png";
import whatsapp from "../assets/images/whatsapp.png";
import facebook from "../assets/images/facebook.png";
import VanillaTilt from "vanilla-tilt";

const style = {
   page_body: `w-full 2xl:h-[100vh] h-auto lg:flex  flex-col justify-center lg:mt-0 mt-[10vh]`,
   page_title: `m-[2vh]  font-bold lg:text-[2.5rem] text-[2rem] font-Acme text-shadow-xl animate-pulse`,
   img_box: `flex lg:flex-row  flex-col justify-start  items-center lg:mt-[0vh] mt-[-5vh]`,
   img: ` border border-green-700 border-b-0 bg-gray-400 backdrop-filter backdrop-blur-md bg-opacity-10 absolute 2xl:w-[60vh] lg:w-[45vh] w-[22vh] 2xl:ml-[185vh] lg:ml-[145vh] md:ml-[130vh] ml-[20vh]  rounded-3xl animate-float z-20 shadow-black shadow-xl `,
   info_box: ` 2xl:h-[80vh]  lg:h-[70vh] 2xl:w-[190vh] lg:w-[150vh] w-auto h-auto mx-[3vh] my-[2vh] lg:mt-[0vh] mt-[22vh] text-slate-400 bg-gray-900 shadow-black shadow-lg rounded-3xl lg:p-[10vh] p-[4vh] animate-float flex flex-col justify-between items-center`,
   info_deatils: `lg:text-[1rem] text-[0.7rem] font-Nunito font-semibold text-start lg:pt-0 `,
   contact_btn: `lg:w-[6vh] w-[5vh] bg-gray-400 border-2 border-green-700 hover:bg-white mx-4 duration-300 animate-pulse hover:animate-none shadow-black shadow-xl  rounded-full p-1`,
};

export default function Aboutme() {
   const contact_button = [
      {
         id: 1,
         name: "github.com/mdanik801",
         icon: giticon,
         url: "https://github.com/mdanik801",
      },
      {
         id: 2,
         name: "Md. Aulad Hossain Anik",
         icon: linkedin,
         url: "https://www.linkedin.com/in/md-aulad-hossain-anik-965023298?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      },
      { id: 3, name: "01856713852", icon: whatsapp, url: "https://wa.me/qr/DFDHWW5PI3IEK1" },
      {
         id: 4,
         name: "Md Anik",
         icon: facebook,
         url: "https://www.facebook.com/1000anik?mibextid=ZbWKwL",
      },
   ];

   const skilld = [
      {
         id: 1,
         name: " Full-Stack Development:",
         p: " Proficient in building end-to-end applications using the MERN stack(MongoDB, Express, React, Node.js). My ability to integrate frontendand backend components ensures seamless, cohesive applications.",
      },
      {
         id: 2,
         name: "Frontend Development: ",
         p: "    Skilled in creating responsive, user-friendly interfaces with React and Tailwind CSS. I focus on delivering visually appealing and intuitive designs that enhance user engagement.",
      },
      {
         id: 3,
         name: "   Backend Development: ",
         p: "      Experienced in developing robust server-side applications with Node.js and Express, coupled with efficient data  management using MongoDB ..",
      },
      {
         id: 4,
         name: "   REST API Development: ",
         p: "    Adept at designing and implementing RESTful APIs that enable smooth communication between frontend and backend, ensuring scalable and efficient data exchange..",
      },
   ];

   // tild card magnetic bhehaver

   const tiltRef = useRef(null);

   useEffect(() => {
      if (tiltRef.current) {
         VanillaTilt.init(tiltRef.current, {
            max: 25,
            speed: 400,
            glare: true,
            "max-glare": 0.5,
         });
      }
   }, []);
   useEffect(() => {
      AOS.init({
         duration: 1200,
      });
   }, []);
   return (
      <div id="aboutme" className={style.page_body}>
         <span data-aos="fade-right" className={style.page_title}>
            {" "}
            <span className=" text-green-700 ">Abo</span>ut me{" "}
         </span>
         <div className={style.img_box}>
            <img src={myimg} className={style.img} alt="" />
            <div data-aos="zoom-in" className={style.info_box}>
               <p data-aos="flip-left" className={style.info_deatils}>
                  {" "}
                  Hello! I'm Md Aulad Hossain Anik, a passionate and versatile full-stack developer
                  with a talent for crafting seamless and efficient web applications. With expertise
                  in both frontend and backend technologies, I excel at creating comprehensive
                  solutions that deliver exceptional user experiences.
                  <h1 className=" mt-2 ">
                     Skilled in
                     <ul className=" text-white text-shadow-xl">
                        {skilld.map((skill) => (
                           <>
                              {" "}
                              <li>
                                 {" "}
                                 {skill.name}
                                 <span className=" text-slate-400"> {skill.p}</span>
                              </li>
                           </>
                        ))}
                     </ul>
                  </h1>
               </p>
               <div className="flex  mt-6">
                  {contact_button.map((btn) => (
                     <>
                        {" "}
                        <a data-aos="flip-left" href={btn.url} target="_blank" className=" ">
                           <img className={style.contact_btn} src={btn.icon} alt="" />
                        </a>
                     </>
                  ))}
               </div>
            </div>
         </div>
      </div>
   );
}
