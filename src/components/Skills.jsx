import { skillsInfo } from "./shared/informaiotn";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const style = {
   page_title: `m-[2vh] font-bold lg:text-[2.5rem] text-[2rem] font-Acme text-shadow-xl animate-pulse`,
   body: `w-auto h-auto lg:mx-[10vh] mx-[2vh] my-[2vh] lg:mt-[0vh] mt-[2vh] text-slate-400 bg-gray-900 shadow-black shadow-lg lg:rounded-3xl rounded-2xl lg:p-[5vh] p-[2vh] animate-float flex justify-start relative`,
   skill_title: `absolute z-50 lg:w-[16vh] w-[14vh] lg:p-2 p-1 bg-gray-800 font-Acme lg:text-[1.2rem] text-[1rem] font-bold text-shadow-lg text-green-700 border border-green-700 rounded`,
   skill_itemsection: `h-auto mt-[2vh] flex justify-start items-start`,
   skill_name: `flex flex-col items-start w-auto`,
   skill_name_h: `w-[20vh] lg:mx-2 mx-1 text-white font-Nunito lg:text-[1rem] text-[0.8rem] text-shadow-lg`,
   skill_detail_box: `flex flex-wrap justify-start items-center mt-[0.5vh] flex-1`,
   skill_btn: `lg:text-[0.9rem] text-[0.4rem] lg:w-auto w-[14vh] text-shadow-lg p-1 font-Nunito text-slate-300 flex lg:justify-between justify-start items-center rounded-lg bg-slate-700 hover:bg-slate-800 duration-200 m-[0.6vh] border border-green-400 shadow-md shadow-black`,
   skill_icon: `lg:w-[4vh] w-[3vh] mr-1 rounded`,
};

export default function Skills() {
   const skills = skillsInfo;

   useEffect(() => {
      AOS.init({
         duration: 1200,
         once: true,
         offset: 50,
      });
   }, []);

   return (
      <div
         id="skill"
         className="w-full lg:h-auto flex flex-col justify-start lg:mt-[15vh] mt-[10vh] overflow-x-hidden">
         {/* Skills টাইটেল */}
         <span data-aos="fade-right" className={style.page_title}>
            <span className="text-green-700">Ski</span>lls
         </span>

         {/* মূল কন্টেন্ট বক্স */}
         <div data-aos="zoom-in" className={style.body}>
            {/* বাম পাশের MY SKILLS বাটন এবং লাইন */}
            <div className="relative">
               <button data-aos="fade-down" className={style.skill_title}>
                  MY SKILLS
               </button>
               <div
                  data-aos="fade-down"
                  className="z-0 ml-2 mt-[2vh] w-1 bg-green-700 h-full"></div>
            </div>

            {/* স্কিল আইটেমগুলোর কন্টেইনার */}
            <div className="w-full mt-10 mb-5 overflow-x-auto">
               {skills.map((details, index) => (
                  <div key={index} className={style.skill_itemsection}>
                     {/* স্কিল ক্যাটাগরির নাম */}
                     <div data-aos="fade-down" className={style.skill_name}>
                        <span className={style.skill_name_h}>{details.skillname}</span>
                        <div className="z-20 ml-[-1.1vh] mt-[-1.1vh] lg:w-full flex items-center">
                           <div className="w-3 h-3 bg-green-700 rounded-full"></div>
                           <div className="h-0.5 lg:w-[16vh] w-[12vh] bg-green-700"></div>
                        </div>
                     </div>

                     {/* স্কিল আইটেম বাটনগুলো */}
                     <div className={style.skill_detail_box}>
                        {details.skillitem.map((info, idx) => (
                           <button key={idx} data-aos="fade-down" className={style.skill_btn}>
                              {info.img && (
                                 <img className={style.skill_icon} src={info.img} alt={info.name} />
                              )}
                              <span className="mr-1">{info.name}</span>
                           </button>
                        ))}
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
}
