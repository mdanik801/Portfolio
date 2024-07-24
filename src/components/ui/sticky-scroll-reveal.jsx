import React, { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

import AOS from "aos";
import "aos/dist/aos.css";

export const StickyScroll = ({ content, contentClassName }) => {
   const [activeCard, setActiveCard] = useState(0);
   const ref = useRef(null);
   const { scrollYProgress } = useScroll({
      container: ref,
      offset: ["start start", "end start"],
   });
   const cardLength = content.length;

   useMotionValueEvent(scrollYProgress, "change", (latest) => {
      const cardsBreakpoints = content.map((_, index) => index / cardLength);
      const closestBreakpointIndex = cardsBreakpoints.reduce((acc, breakpoint, index) => {
         const distance = Math.abs(latest - breakpoint);
         if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
            return index;
         }
         return acc;
      }, 0);
      setActiveCard(closestBreakpointIndex);
   });

   useEffect(() => {}, [activeCard]);

   useEffect(() => {
      AOS.init({
         duration: 1200,
      });
   }, []);

   return (
      <motion.div
         data-aos="fade-right"
         className="w-full  overflow-y-auto flex justify-center  relative space-x-10 rounded-md p-10"
         ref={ref}>
         {" "}
         <div className="div relative flex items-start px-4 ">
            <div className="max-w-2xl">
               {content.map((item, index) => (
                  <div
                     key={item.title + index}
                     className="my-3 mx-2 lg:mx-[2vh]  flex flex-col justify-center  border xl:w-auto lg:w-[85vh] lg:h-[63vh] md:w-[35vh] w-[40vh] h-auto p-4 shadow-md shadow-black border-green-700 rounded-xl ">
                     <motion.div>
                        <img
                           src={item.content}
                           className=" lg:hidden md:hidden w-[52vh] h-[26vh] rounded-md mb-2"
                           alt=""
                        />
                     </motion.div>
                     <motion.h2
                        initial={{
                           opacity: 0,
                        }}
                        animate={{
                           opacity: activeCard === index ? 1 : 0.3,
                        }}
                        className="lg:text-[1.3rem] text-[1rem] font-Acme font-bold text-slate-100">
                        {item.title}
                     </motion.h2>
                     <motion.p
                        initial={{
                           opacity: 0,
                        }}
                        animate={{
                           opacity: activeCard === index ? 1 : 0.3,
                        }}
                        className="lg:text-[0.9rem] text-[0.6rem] font-Nunito text-slate-300  lg:mt-[1vh]">
                        {item.description}
                     </motion.p>
                     <motion.p className=" font-Nunito lg:mt-[0.5vh] mt-4 mb-2">
                        <div>
                           <h1 className=" font-Acme  lg:text-[1rem] text-[0.7rem] text-white text-shadow-md lg:my-2 my-1 ">
                              Tecnology :
                           </h1>
                           {item.technology.map((tec) => (
                              <>
                                 {" "}
                                 <button className=" m-0.5 border p-1  rounded-lg bg-green-700 lg:text-[0.7rem] text-[0.6rem] text-white text-shadow-md shadow shadow-black">
                                    {tec}
                                 </button>
                              </>
                           ))}
                        </div>
                     </motion.p>
                     <motion.p>
                        <div className="   flex justify-center my-4 p-2">
                           {item.sourcecode.map((linlk) => (
                              <div key={linlk.livelink}>
                                 {linlk.livelink ? (
                                    <a
                                       className=" border-2 border-green-700 mx-2 text-center p-2 bg-white text-green-700 lg:text-[0.9rem] text-[0.6rem] font-Acme font-semibold text-shadow-lg rounded-lg  hover:bg-green-800 hover:text-white duration-300 "
                                       target="_blank"
                                       href={linlk.livelink}>
                                       LIVE SIDE
                                    </a>
                                 ) : (
                                    ""
                                 )}
                              </div>
                           ))}
                           {item.sourcecode.map((linlk) => (
                              <div key={linlk.frontend}>
                                 {linlk.frontend ? (
                                    <a
                                       className=" border-2 border-green-700 mx-2 text-center p-2 bg-white text-green-700 lg:text-[0.9rem] text-[0.6rem] font-Acme font-semibold text-shadow-lg rounded-lg  hover:bg-green-800 hover:text-white duration-300 "
                                       target="_blank"
                                       href={linlk.frontend}>
                                       CLAINT SIDE
                                    </a>
                                 ) : (
                                    ""
                                 )}
                              </div>
                           ))}
                           {item.sourcecode.map((linlk) => (
                              <div key={linlk.backend}>
                                 {linlk.backend ? (
                                    <a
                                       className=" border-2 border-green-700 mx-2 text-center p-2 bg-white text-green-700 lg:text-[0.9rem] text-[0.6rem] font-Acme font-semibold text-shadow-lg rounded-lg  hover:bg-green-800 hover:text-white duration-300 "
                                       target="_blank"
                                       href={linlk.backend}>
                                       SERVER SIDE
                                    </a>
                                 ) : (
                                    ""
                                 )}
                              </div>
                           ))}
                        </div>
                     </motion.p>
                  </div>
               ))}
               <div className="h-40" />
            </div>
         </div>{" "}
         <div
            className={cn(
               "   hidden  md:block h-80 xl:w-[60vh] w-110   lg:flex items-center sticky top-10  overflow-hidden",
               contentClassName
            )}>
            <img
               className=" w-full h-60 shadow-md shadow-black rounded-md "
               src={content[activeCard].content ?? null}
               alt=""
            />
         </div>
      </motion.div>
   );
};
