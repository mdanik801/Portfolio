import React, { useEffect } from "react";
import { StickyScroll } from "../components/ui/sticky-scroll-reveal";
import { content } from "./shared/informaiotn";

import AOS from "aos";
import "aos/dist/aos.css";

const style = {
   page_body: `w-full lg:h-[90vh] lg:flex flex-col justify-center  lg:mt-[15vh] mt-[10vh] `,
   page_title: `m-[2vh]  font-bold lg:text-[2.5rem] text-[2rem] font-Acme text-shadow-xl animate-pulse`,
   card_slider: `xl:h-[80vh] lg:h-[85vh] xl:w-auto lg:w-[180vh] md:h-[35vh]   w-auto h-[64vh] lg:mx-[10vh] mx-[2vh] my-[2vh] lg:mt-[0vh] mt-[2vh] text-slate-400 bg-gray-900 shadow-black shadow-lg lg:rounded-3xl rounded-2xl xl:p-[1vh] lg:p-[5vh] animate-float flex flex-col lg:justify-between justify-center items-center`,
};

export function Projectslider() {
   useEffect(() => {
      AOS.init({
         duration: 1200,
      });
   }, []);
   return (
      <div id="project" className={style.page_body}>
         <span data-aos="fade-right" className={style.page_title}>
            {" "}
            <span className=" text-green-700 ">Pro</span>
            jects{" "}
         </span>{" "}
         <div className={style.card_slider}>
            <StickyScroll content={content} />
         </div>
      </div>
   );
}
