import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import ironman from "../../Assets/ironman.png";
import ironmanr from "../../Assets/ironmanr.png";
import circleForRotation from "../../Assets/circleForRotation.png";
import trophy from "../../Assets/trophy.avif";
import heroBG from "../../Assets/hero.png";
import Logo from "../../Components/Logo";

const HeroComp = () => {
  const eventSection = () => {
    const eventSection = document.getElementById("eventSection");
    if (eventSection) {
      eventSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col lg:h-screen 900 rounded-xl m-3 mt-0 shadow bg-gradient-to-r overflow-hidden from-slate-900 to-black  ">
      <Navbar />
      <div className=" items-center h-full flex flex-col lg:flex-row ">
        {/* Text Content */}
        {/* <div className="lg:w-1/2 flex flex-col justify-center items-center px-4 py-8 lg:py-0"> */}
        {/* w-1/2 bg-black   rounded-xl  flex justify-center  */}
        {/* Centering container */}
        <div className="justify-center lg:w-1/2 rounded-xl px-4 py-4 sm:pt-4 sm:pb-0 lg:py-0 bg-transparent text-slate-300 text-center lg:text-left flex flex-col items-center lg:items-start">
          <div className="h-auto flex flex-col justify-center items-center w-full lg:mb-16">
            <div className="sm:text-5xl md:text-6xl lg:text-7xl">
              <Logo />
            </div>

            <div className="font-avenger flex flex-row flex-wrap justify-center items-center mt-2 sm:mt-4">
              <img
                className="fly-animation h-12 sm:h-16 mr-2 lg:mr-4"
                src={ironman}
                alt="Iron Man Left"
              />
              <span className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold">
                2
              </span>
              <div className="flex justify-evenly zoom mx-2">
                <img
                  className="lg:h-12 lg:mb-5 md:h-10 h-6 mb-2 rotate hover:transform-none"
                  src={circleForRotation}
                  alt=""
                />
              </div>
              <span className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold">
                24
              </span>
              <img
                className="fly-animation h-12 sm:h-16 ml-2 lg:ml-4"
                src={ironmanr}
                alt="Iron Man Right"
              />
            </div>

            <h1 className="text-sm md:text-lg lg:text-xl w-max p-2 sm:p-3 bg-slate-300 text-black lg:tracking-widest rounded-xl font-bold m-2 sm:mt-4">
              LINKING SCHOOL'S INNOVATION & CREATIVITY
            </h1>

            <p className="text-base sm:text-lg md:text-xl font-bold m-2 sm:mb-8">
              NOW ACCEPTING ONLINE REGISTRATION
            </p>

            <div className="m-2 sm:mb-2 text-center">
              <p className="font-avenger text-xs sm:text-sm md:text-base lg:text-lg text-red-600 uppercase">
                Ready to Innovate? Your Tech Journey Starts Here!
              </p>
              <button
                className="text-xl sm:text-2xl md:text-3xl font-semibold text-center p-1 sm:p-2 rounded-xl hover:scale-x-105 text-red-600 shadow mt-2 sm:mt-4 border px-3 sm:px-5 tracking-widest font-avenger"
                onClick={eventSection}
              >
                Let's Explore
              </button>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex items-center justify-center h-full p-4 sm:p-8">
          <img
            className="rounded-xl w-full sm:w-3/4 shadow"
            src={trophy}
            alt=""
          />
        </div>
      </div>
      {/* Information Section */}
      <div className="flex flex-col sm:flex-row text-base sm:text-lg bg-gray-400 text-black rounded-b-xl text-center justify-evenly gap-3 p-3 sm:p-5 w-full">
        <div className="mb-2 sm:mb-0">
          <p className="text-yellow-900 font-bold text-xl sm:text-2xl">DATE</p>
          <p className="rounded-xl font-bold">12th-13th NOVEMBER 2024</p>
        </div>
        <div className="hidden sm:block">
          <p className="text-yellow-900 font-bold text-xl sm:text-2xl">
            EVENT COMPRISES OF
          </p>
          <p className="rounded-xl font-bold">
            TECHNICAL AND NON-TECHNICAL COMPETITION
          </p>
        </div>
        <div>
          <p className="text-yellow-900 font-bold text-xl sm:text-2xl">VENUE</p>
          <p className="rounded-xl font-bold">LOVELY PROFESSIONAL UNIVERSITY</p>
        </div>
      </div>
    </div>
  );
};

export default HeroComp;
