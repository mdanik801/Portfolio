import heroimg from "../assets/images/heroimg.gif";
import { TypeAnimation } from "react-type-animation";

import resume from "../assets/images/Anik Resume.pdf";

import giticon from "../assets/images/github.png";
import linkedin from "../assets/images/linkedin.png";
import whatsapp from "../assets/images/whatsapp.png";
import facebook from "../assets/images/facebook.png";
import download from "../assets/images/download.png";

const style = {
   page_body: ` w-full 2xl:h-[110vh] lg:h-[90vh] flex flex-col  justify-center  lg:justify-start xl:mb-8  xl:mt-2 lg:mt-[4vh]  mt-[5vh]`,
   page_title: `xl:m-[2vh] m-[1vh] xl:my-[5vh] mt-[2vh]  font-bold xl:text-[1.5rem] lg:text-[1.5rem] text-[1.2rem] font-Nunito text-shadow-lg`,
   page_benar_box: `xl:relative md:relative  flex xl:flex-row md:flex-row  flex-col xl:justify-start md:justify-start justify-center items-center`,
   benar: `2xl:w-[130vh] xl:w-[100vh] 2xl:h-[80vh] xl:h-[68vh] l lg:w-[34vh] lg:h-[25vh]   md:w-[34vh] md:h-[25vh] md:my-0 lg:rounded-r-3xl md:rounded-r-3xl md:shadow-black   shadow-lg w-full h-[30vh]`,
   detail_body: `xl:absolute  md:absolute 2xl:w-[130vh] xl:w-[100vh] 2xl:h-[65vh] xl:h-[54vh] lg:w-[75vh] lg:h-[40vh] md:w-[37vh] md:h-[20vh] w-full h-[40vh] 2xl:ml-[115vh] xl:ml-[90vh] lg:ml-[75vh] md:ml-[29vh] bg-gray-900 shadow-black shadow-lg xl:rounded-3xl md:rounded-3xl xl:p-[15vh] lg:p-[5vh] md:p-[2.8vh] p-[2vh] md:animate-float`,
   contact_icon: `border-2 border-green-700 xl:w-[4vh] lg:w-[3.5vh] md:w-[3vh] w-[4.5vh] bg-gray-600 hover:bg-white  mx-1 rounded-full duration-300 animate-pulse shadow-2xl shadow-black`,
};

export default function Herosection() {
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

   return (
      <div id="home" className={style.page_body}>
         <span className={style.page_title}>
            MD AULAD HOSSAIN <span className=" text-green-700 font-bold font-Acme ">ANIK</span>
         </span>{" "}
         <div className={style.page_benar_box}>
            <img className={style.benar} src={heroimg} alt="" />
            <div className={style.detail_body}>
               <span className=" font-Nunito 2xl:text-[1.5rem] xl:text-[1rem] lg:text-[1rem] md:text-[0.7rem]">
                  Hey there, my name is
               </span>
               <div className="flex md:flex-row flex-col md:items-center justify-start">
                  <h1 className=" 2xl: xl:text-[1.6rem] lg:text-[1.4rem] md:text-[0.8rem] text-[1.3rem] font-Acme text-shadow-md">
                     MD AULAD HOSSAIN ANIK
                  </h1>{" "}
                  <div className=" hidden xl:justify-start md:flex mx-1 ">
                     {contact_button.map((btn) => (
                        <a href={btn.url} target="_blank">
                           <img className={style.contact_icon} src={btn.icon} alt="" />
                        </a>
                     ))}
                  </div>
               </div>
               <h1 className=" xl:text-[1rem] lg:text-[0.8rem] md:text-[0.7rem] text-[0.8rem] font-bold">
                  &lt;<span className="  text-green-700">code</span>&gt;
                  <TypeAnimation
                     sequence={[
                        1000,
                        " Fullstack Developer ",
                        1000,
                        "Frontend Developer ",
                        1000,
                        "EXPERT REACT DEVELOPER",
                        1000,
                        1000,
                        "Mern Stack Developer ",
                        1000,
                     ]}
                     wrapper="span"
                     cursor={true}
                     repeat={Infinity}
                     style={{ display: "inline-block" }}
                  />
                  &lt;/<span className="  text-green-700">code</span>&gt;
               </h1>{" "}
               <div className=" xl:my-[5vh] my-[2vh] flex  justify-between xl:w-[38vh] lg:w-[38vh]  md:w-[25.5vh] w-[31vh] ">
                  <a
                     className="  flex  justify-center items-center border-2 bg-slate-950  hover:bg-gray-800 border-green-700 p-0.5 xl:w-[18vh] lg:w-[18vh] md:w-[12vh] w-[15vh] rounded-3xl xl:h-[6vh] lg:h-[6vh] md:h-[4vh] h-[5vh] xl:text-[0.8rem] text-[0.7rem]  font-bold font-Nunito duration-300"
                     href={resume}
                     download="Anik Resume.pdf"
                     rel="noopener noreferrer">
                     <img
                        className=" xl:w-[4vh] lg:w-[4vh] md:w-[2.5vh] w-[3vh] mx-2"
                        src={download}
                        alt=""
                     />
                     Resume
                  </a>

                  <a
                     href="#contact"
                     className="animate-pulse hover:animate-none flex  justify-center items-center border-2 bg-slate-950  hover:bg-gray-800  p-0.5 xl:w-[18vh] lg:w-[18vh] md:w-[13vh] w-[15vh] rounded-3xl xl:h-[6vh] lg:h-[6vh] md:h-[4vh] h-[5vh] lg:text-[0.8rem] text-[0.7rem]  font-bold font-Nunito duration-300">
                     Contact
                  </a>
               </div>{" "}
               <div className="md:hidden  flex justify-center mx-3 mt-[8vh]">
                  {contact_button.map((btn) => (
                     <a href={btn.url}>
                        <img
                           className=" lgw-[4vh] w-[5vh] bg-gray-600 hover:bg-white lgmx-1 mx-2 rounded-full duration-300 animate-pulse  shadow-2xl shadow-black"
                           src={btn.icon}
                           alt=""
                        />
                     </a>
                  ))}
               </div>
            </div>
         </div>
      </div>
   );
}
