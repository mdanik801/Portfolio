// Portfolio Content Update with Networking Skills from CV
// ------------------------------------------------

import dataanlyticimg from "../../assets/project Image/DATA ANALYTICS.png";
import ecom from "../../assets/project Image/chepshop.png";
import qrgenimg from "../../assets/project Image/qrgenimg.png";

// Icon Import section----------------------------------------------------------
import htmlicon from "../../assets/skill icons/htmlicon.png";
import cssicon from "../../assets/skill icons/cssicon.png";
import bootstrap from "../../assets/skill icons/bootstrap.png";
import jsicon from "../../assets/skill icons/jsicon.png";
import reactcon from "../../assets/skill icons/reacticon.png";
import talwindicon from "../../assets/skill icons/talwindicon.png";
import matarialicon from "../../assets/skill icons/matarialicon.png";
import flowbiteicon from "../../assets/skill icons/flowbite.png";
import nodejsicon from "../../assets/skill icons/nodejsicon.png";
import expressicon from "../../assets/skill icons/expressicon.png";
import mongodbicon from "../../assets/skill icons/mongodbicon.png";
import githubicon from "../../assets/skill icons/githubicon.png";
import gitbashicon from "../../assets/skill icons/gitbashicon.png";
import firebaseicon from "../../assets/skill icons/firebaseicon.png";
import vscodeicon from "../../assets/skill icons/vscodeicon.png";
import pycharmicon from "../../assets/skill icons/pycharmicon.png";
import pythonicon from "../../assets/skill icons/pythonicon.png";
import codeblockicon from "../../assets/skill icons/codeblockicon.png";
import cicon from "../../assets/skill icons/c++icon.png";
import netlifyicon from "../../assets/skill icons/netlifyicon.png";
import postmanicon from "../../assets/skill icons/postmanicon.png";
import vercelicon from "../../assets/skill icons/vercelicon.png";
import reacthockform from "../../assets/skill icons/reacthockform.png";
import mambaicon from "../../assets/skill icons/mambaicon.png";
import keepreacticon from "../../assets/skill icons/keepreacticon.png";
import slackicon from "../../assets/skill icons/slackicon.png";
import vuejsicon from "../../assets/skill icons/vuejsicon.png";
import problem from "../../assets/skill icons/problem-solving.png";
import dbicon from "../../assets/skill icons/dbicon.png";
import Aceternity from "../../assets/skill icons/Aceternity.png";
import emailjs from "../../assets/skill icons/emailjs.png";
import threejs from "../../assets/skill icons/threejs.png";

// ------------------------------------------------------------------------------------

export const content = [
   {
      title: "QR CODE GENERATOR & SCANNER",
      description:
         "A QR code generator and scanner tool that allows users to create and read QR codes easily. Generates QR codes for URLs, text, and data, enabling quick sharing via smartphones. Scanner feature decodes QR codes instantly for seamless interaction.",
      technology: [
         "HTML",
         "CSS",
         "REACT JS",
         "TAILWIND CSS",
         "REACT-ROUTER-DOM",
         "QRCODE-REACT",
         "HTML5-QRCODE",
      ],
      sourcecode: [
         {
            livelink: "https://qrgenaretor.netlify.app/",
            frontend: "https://github.com/mdanik801/qrcodegenaretor",
            backend: "",
         },
      ],
      content: qrgenimg,
   },
   {
      title: "DATA ANALYTICS PLATFORM",
      description:
         "A data analytics web app with powerful visualization tools for individual users and groups. Harness actionable insights with an intuitive interface and robust backend, designed to scale with your business. Elevate decision-making with precision and clarity.",
      technology: ["HTML", "CSS", "REACT JS", "TAILWIND CSS"],
      sourcecode: [
         {
            livelink: "https://fastidious-custard-b5f700.netlify.app/",
            frontend: "https://github.com/mdanik801/DATA-ANALYTICS",
            backend: "",
         },
      ],
      content: dataanlyticimg,
   },
   {
      title: "E-COMMERCE PLATFORM",
      description:
         "A seamless shopping experience with affordable products, wide range of items, and fast shipping. User-friendly platform with easy navigation and secure transactions. Shop now and save on everything you need!",
      technology: ["HTML", "CSS", "REACT JS", "TAILWIND CSS", "FIREBASE"],
      sourcecode: [
         {
            livelink: "https://chdaraz.netlify.app/",
            frontend: "https://github.com/mdanik801/Cheap-Eshop",
            backend: "",
         },
      ],
      content: ecom,
   },
   {
      title: "TASK MANAGEMENT APP",
      description:
         "Stay organized and boost productivity with this intuitive to-do app. Create, manage, and prioritize tasks with reminders, deadlines, and categories. Sync across devices for seamless access anytime, anywhere.",
      technology: ["HTML", "CSS", "REACT JS", "TAILWIND CSS", "FIREBASE"],
      sourcecode: [
         {
            livelink: "https://elegant-rolypoly-0f55b2.netlify.app/",
            frontend: "https://github.com/mdanik801/DATA-ANALYTICS",
            backend: "",
         },
      ],
      content: "https://media.geeksforgeeks.org/wp-content/uploads/20230606125727/gfg.png",
   },
   {
      title: "ELECTRONICS E-COMMERCE (HTML/CSS)",
      description:
         "A responsive electronics e-commerce site built with Bootstrap. Features product listings, shopping cart, and clean UI design for an optimal shopping experience.",
      technology: ["HTML", "CSS", "BOOTSTRAP"],
      sourcecode: [
         {
            livelink: "https://mdanik801.github.io/Anik-Electronick-site-by-boostrap/",
            frontend: "https://github.com/mdanik801/Anik-Electronick-site-by-boostrap",
            backend: "",
         },
      ],
      content:
         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSlROjEV-8jJD83Rv5Hrr3IKHNN2ON4IsW5g&s",
   },
];

// ------------------------------------------------------------------------------------

// Helper function for icon URL (since we can't use the URL directly in import)
const testIconUrl =
   "https://img.freepik.com/premium-vector/test-icon-vector-design-templates_1172029-3110.jpg";

export const skillsInfo = [
   // PROGRAMMING LANGUAGES
   {
      skillname: "PROGRAMMING LANGUAGES",
      skillitem: [
         { id: 1, name: "HTML5", img: htmlicon },
         { id: 2, name: "CSS3", img: cssicon },
         { id: 3, name: "JAVASCRIPT (ES6+)", img: jsicon },
         { id: 4, name: "REACT JS", img: reactcon },
         { id: 5, name: "PYTHON (Basic)", img: pythonicon },
         { id: 6, name: "C++", img: cicon },
         { id: 7, name: "NODE JS", img: nodejsicon },
         { id: 8, name: "EXPRESS JS", img: expressicon },
      ],
   },

   // NETWORKING CORE SKILLS (FROM CV)
   {
      skillname: "NETWORKING (CORE)",
      skillitem: [
         { id: 1, name: "CCNA", img: testIconUrl },
         { id: 2, name: "MIKROTIK (MTCNA)", img: testIconUrl },
         { id: 3, name: "MTCRE", img: testIconUrl },
         { id: 4, name: "MTCNP", img: testIconUrl },
         { id: 5, name: "OLT (GPON/EPON)", img: testIconUrl },
         { id: 6, name: "VLAN/SUBNETTING", img: testIconUrl },
         { id: 7, name: "ROUTING & SWITCHING", img: testIconUrl },
         { id: 8, name: "FIREWALL/VPN", img: testIconUrl },
         { id: 9, name: "LAN/WAN", img: testIconUrl },
      ],
   },

   // SECURITY & VOIP
   {
      skillname: "SECURITY & VOIP",
      skillitem: [
         { id: 1, name: "CCTV/NVR/DVR", img: testIconUrl },
         { id: 2, name: "IP CAMERA", img: testIconUrl },
         { id: 3, name: "IP PHONE", img: testIconUrl },
         { id: 4, name: "PBX & VOIP", img: testIconUrl },
         { id: 5, name: "REMOTE MONITORING", img: testIconUrl },
      ],
   },

   // DATABASES & DEPLOYMENT
   {
      skillname: "DATABASES & DEPLOYMENT",
      skillitem: [
         { id: 1, name: "FIREBASE", img: firebaseicon },
         { id: 2, name: "MONGODB", img: mongodbicon },
         { id: 3, name: "GITHUB", img: githubicon },
         { id: 4, name: "NETLIFY", img: netlifyicon },
         { id: 5, name: "VERCEL", img: vercelicon },
      ],
   },

   // DEVELOPMENT TOOLS
   {
      skillname: "DEVELOPMENT TOOLS",
      skillitem: [
         { id: 1, name: "VS CODE", img: vscodeicon },
         { id: 2, name: "PYCHARM", img: pycharmicon },
         { id: 3, name: "GIT BASH", img: gitbashicon },
         { id: 4, name: "CODEBLOCKS", img: codeblockicon },
         { id: 5, name: "POSTMAN", img: postmanicon },
         { id: 6, name: "SLACK", img: slackicon },
      ],
   },

   // NETWORKING TOOLS
   {
      skillname: "NETWORKING TOOLS",
      skillitem: [
         { id: 1, name: "WINBOX", img: testIconUrl },
         { id: 2, name: "PACKET TRACER", img: testIconUrl },
         { id: 3, name: "VMWARE", img: testIconUrl },
         { id: 4, name: "WIRESHARK", img: testIconUrl },
      ],
   },

   // UI LIBRARIES & FRAMEWORKS
   {
      skillname: "UI LIBRARIES",
      skillitem: [
         { id: 1, name: "BOOTSTRAP", img: bootstrap },
         { id: 2, name: "TAILWIND CSS", img: talwindicon },
         { id: 3, name: "MATERIAL UI", img: matarialicon },
         { id: 4, name: "FLOWBITE", img: flowbiteicon },
         { id: 5, name: "MAMBA UI", img: mambaicon },
         { id: 6, name: "REACT HOOK FORM", img: reacthockform },
         { id: 7, name: "KEEP REACT UI", img: keepreacticon },
         { id: 8, name: "ACETERNITY UI", img: Aceternity },
         { id: 9, name: "THREE JS", img: threejs },
      ],
   },

   // OTHER SKILLS
   {
      skillname: "OTHER SKILLS",
      skillitem: [
         { id: 1, name: "PROBLEM SOLVING", img: problem },
         { id: 2, name: "EMAIL JS", img: emailjs },
         { id: 3, name: "HARDWARE ASSEMBLY", img: testIconUrl },
         { id: 4, name: "PRINTER REPAIR", img: testIconUrl },
         { id: 5, name: "LEADERSHIP", img: testIconUrl },
         { id: 6, name: "COMMUNICATION", img: testIconUrl },
      ],
   },

   // CURRENTLY LEARNING
   {
      skillname: "CURRENTLY LEARNING",
      skillitem: [
         { id: 1, name: "VUE JS", img: vuejsicon },
         { id: 2, name: "DATABASE MANAGEMENT", img: dbicon },
         { id: 3, name: "ADVANCED MIKROTIK", img: testIconUrl },
         { id: 4, name: "FTTH SOLUTIONS", img: testIconUrl },
      ],
   },
];

// ------------------------------------------------------------------------------------
