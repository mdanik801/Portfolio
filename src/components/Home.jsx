import Herosection from "./Herosection";
import Aboutme from "./Aboutme";
import Navbar from "./shared/Navbar";
import { Projectslider } from "./Project";
import Skills from "./Skills";
import Contact from "./Contact";

import giticon from "../assets/images/github.png";
import linkedin from "../assets/images/linkedin.png";
import whatsapp from "../assets/images/whatsapp.png";
import facebook from "../assets/images/facebook.png";
import location from "../assets/images/location.png";
import gmail from "../assets/images/gmail.png";
import VisitorCounter from "./shared/Visitorcouner";

export default function Home() {
   const contact_button = [
      {
         id: 1,
         name: "mdanikpro801@gmail.com",
         icon: gmail,
         url: "mailto: mdanikpro801@gmail.com",
      },
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
      <div className=" bg-black lg:bg-cover   lg:p-[5vh]  text-white">
         {" "}
         <div className="  bg-gray-800   h-auto lg:w-full lg:rounded-3xl  flex flex-col items-center">
            {/* <Timeline /> */}

            <Navbar />

            <Herosection />

            <Aboutme />
            <Projectslider />
            <Skills />
            <Contact />
            <div className=" bg-slate-700 w-full h-[8vh] lg:rounded-b-3xl flex justify-between items-center p-6">
               <div className=" lg:flex lg:items-center">
                  {" "}
                  <div className=" animate-pulse font-Acme lg:text-[1.2rem] text-[0.9rem] text-shadow-xl lg:mr-3">
                     {" "}
                     © Md Aulad Hossain <span className=" text-green-700  ">Anik</span>
                  </div>
                  <VisitorCounter />
               </div>
               <ul className=" my-5 flex">
                  {contact_button.map((btn) => (
                     <>
                        {" "}
                        <li className=" flex my-2 cursor-pointer">
                           {" "}
                           <a href={btn.url}>
                              <img
                                 className=" animate-bounce hover:animate-none border-2 border-green-700 xl:w-[4.5vh] lg:w-[4vh] md:w-[4vh] w-[3.5vh] bg-gray-400 hover:bg-white p-0.5 mx-1 rounded-full duration-300 shadow-black shadow-lg"
                                 src={btn.icon}
                                 alt=""
                              />
                           </a>
                        </li>
                     </>
                  ))}
               </ul>
            </div>
         </div>
      </div>
   );
}
