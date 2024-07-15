import React, { useEffect, useState } from "react";

import emailjs from "@emailjs/browser";
import AOS from "aos";
import "aos/dist/aos.css";

import giticon from "../assets/images/github.png";
import linkedin from "../assets/images/linkedin.png";
import whatsapp from "../assets/images/whatsapp.png";
import facebook from "../assets/images/facebook.png";
import location from "../assets/images/location.png";
import gmail from "../assets/images/gmail.png";
import { useForm } from "react-hook-form";

const style = {
   body: `w-full h-auto lg:m-[12vh] p-6 text-slate-400 `,
   pagetitle: ` m-[2vh]  lg:text-[2.5rem] text-[2rem] text-shadow-xl font-Acme font-bold animate-pulse`,
   boxsection: `p-2 lg:p-10 flex lg:flex-row flex-col items-center justify-center `,
   contactbox: `lg:w-[50%] w-full p-2 font-Nunito`,
   contacticon: `animate-pulse xl:w-[4.5vh] lg:w-[4vh] md:w-[4vh] w-[4.5vh] p-0.5 mx-1 border-2 border-green-700 bg-gray-400  shadow-black shadow-lg hover:bg-white rounded-full duration-300"`,
   formbox: `lg:w-[50%] w-full p-2`,
   inputbox: `w-full h-[7vh] lg:m-3 m-2   p-3 rounded-xl font-Nunito  bg-gray-900 shadow-lg shadow-black  `,
   sendbtn: ` m-5 p-3  font-Nunito font-bold text-white text-shadow-lg rounded-full bg-gray-950  shadow-lg  shadow-black hover:bg-gray-900 hover:text-slate-400 duration-200 `,
   lodingbtn: `animate-pulse  m-5 p-3  font-Nunito font-bold text-white text-shadow-lg rounded-full bg-gray-950  shadow-lg  shadow-green-700 hover:bg-gray-900 hover:animate-none hover:text-slate-400 duration-200 `,
};

export default function Contact() {
   const contact_button = [
      { id: 1, name: "Dhaka,Bangladesh", icon: location },
      { id: 1, name: "mdanikpro801@gmail.com", icon: gmail, url: "mailto: mdanikpro801@gmail.com" },
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
         name: "facebook.com/1000anik",
         icon: facebook,
         url: "https://www.facebook.com/1000anik?mibextid=ZbWKwL",
      },
   ];
   // Massage section

   const [loding, setLoding] = useState(false);
   const [suess, setSuccess] = useState("");

   const {
      register,
      handleSubmit,
      watch,
      reset,
      formState: { errors },
   } = useForm();

   const onSend = (data) => {
      setLoding(true);
      const templateParams = {
         email: data.email,
         name: data.name,
         text: data.message,
      };
      setTimeout(() => {
         emailjs
            .send(
               "service_iag7jv8", // Replace with your EmailJS Service ID
               "template_qd48t53", // Replace with your EmailJS Template ID
               templateParams,
               "q_SwcUx-wlrXpcp4j" // Replace with your EmailJS User ID
            )
            .then(
               (response) => {
                  console.log("SUCCESS!", response.status, response.text);
                  // alert("Email sent successfully!");
               },
               (error) => {
                  console.log("FAILED...", error);
                  alert("Failed to send message.");
               }
            );
         setLoding(false);
         reset();
         setSuccess("Email sent successfully!");
         setTimeout(() => {
            setSuccess("");
         }, 2000);
      }, 1500);
   };

   useEffect(() => {
      AOS.init({
         duration: 1200,
      });
   }, []);

   return (
      <div data-aos="fade-right" id="contact" className={style.body}>
         <span data-aos="fade-down" className={style.pagetitle}>
            {" "}
            <span className=" text-green-700 ">Contact</span>Me{" "}
         </span>

         <div data-aos="fade-right" className={style.boxsection}>
            <div className={style.contactbox}>
               <p>
                  Have a project for me? Any questions about something I've built? I'd love to hear
                  from you, give me a shout by email or by using the form below if you'd like to get
                  in contact with me.
               </p>
               <ul className=" my-5">
                  {contact_button.map((btn) => (
                     <li className=" flex my-3 cursor-pointer ">
                        {" "}
                        <a data-aos="fade-down" href={btn.url}>
                           <img className={style.contacticon} src={btn.icon} alt="" />
                        </a>
                        <a
                           data-aos="fade-down"
                           href={btn.url}
                           target="_blank"
                           className="   hover:text-white text-shadow-xl mx-2 ">
                           {" "}
                           {btn.name}
                        </a>
                     </li>
                  ))}
               </ul>
            </div>
            <div className={style.formbox}>
               <form action="" onSubmit={handleSubmit(onSend)}>
                  <input
                     data-aos="fade-up"
                     type="text"
                     placeholder=" Name"
                     {...register("name", { required: true })}
                     className={style.inputbox}
                  />
                  <input
                     data-aos="fade-down"
                     type="email"
                     placeholder="Email"
                     {...register("email", { required: true })}
                     className={style.inputbox}
                  />
                  <textarea
                     data-aos="flip-right"
                     type="texrarea"
                     placeholder="Massage"
                     {...register("message", { required: "Message is required" })}
                     className={style.inputbox}
                     style={{ minHeight: "16vh" }}></textarea>
                  {loding ? (
                     <button className={style.lodingbtn}>Massage Sending</button>
                  ) : (
                     <>
                        {" "}
                        <button className={style.sendbtn}>Send Massage</button>
                        <span className=" text-green-600 text-shadow-lg font-Nunito font-bold lg:text-[1rem] text-[0.8rem]">
                           {suess}
                        </span>
                     </>
                  )}{" "}
               </form>
            </div>
         </div>
      </div>
   );
}
