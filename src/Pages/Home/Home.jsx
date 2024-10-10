import React, { useContext } from "react";
import { EventsContext } from "../../../src/Components/EventsContext";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import EventCard from "../../Components/EventCard/EventCard";
import ironman from "../../Assets/ironman.png";
import ironmanr from "../../Assets/ironmanr.png";
import WelcomeComponent from "./welcome";
import circleForRotation from "../../Assets/circleForRotation.png";
import trophy from "../../Assets/trophy.avif";
import "./Home.css";
import YouTubePlayer from "../../Components/YouTubePlayer";
import welcomeimg from "../../Assets/welcome-img.jpeg";
import RevolvingPhotos from "../../Components/RevolvingPhotos/RevolvingPhotos";
import HeroComp from "./hero";
import CompetitionComponent, { MobileCompetitionSchedule } from "./comptition";

const Home = () => {
  const { events, loading } = useContext(EventsContext);

  // const uniqueEvents = [];
  const jrEvents = [];
  const srEvents = [];

  if (!loading) {
    for (const event of events) {
      if (event.category == "sr") {
        srEvents.push(event);
      } else {
        jrEvents.push(event);
      }
    }
  }

  return (
    <div className="w-full min-h-screen flex flex-col bg-center bg-black bg-cover text-slate-300">
      <div className="flex flex-col gap-3">
        {/* Hero Section */}
        <HeroComp />

        {/* Competitions Section */}
        <div className="hidden lg:block">
          <CompetitionComponent />
        </div>
        {/* Competitions Section */}
        <div className="lg:hidden sm:block">
          <MobileCompetitionSchedule />
        </div>
        {/* Events Section */}
        <div
          id="eventSection"
          className=" border rounded-xl shadow overflow-hidden bg-gradient-to-r from-slate-900 to-black p-4 sm:p-8 m-3"
        >
          <div>
            <p className="text-3xl sm:text-5xl md:text-5xl lg:text-7xl font-avenger text-center p-4 sm:p-8">
              Events
            </p>
          </div>
          {loading ? (
            <p>Loading events...</p>
          ) : (
            <div>
              <p className="text-lg sm:text-lg md:text-lg lg:text-3xl font-avenger text-center p-4 sm:p-8">
                Events for Seniors (8th to 12th Class)
              </p>

              <div className="flex flex-wrap justify-center gap-8 sm:gap-0">
                {srEvents.map((event, index) => (
                  <EventCard key={index} event={event} />
                ))}
              </div>

              <h2 className="text-lg sm:text-2xl md:text-2xl lg:text-3xl font-avenger text-center p-4 sm:p-8">
                Events for Juniors (5th to 7th Class)
              </h2>
              <div className="flex flex-wrap justify-center gap-8 sm:gap-0">
                {jrEvents.map((event, index) => (
                  <EventCard key={index} event={event} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Welcome Section */}
        <div className="m-3 border p-5 flex flex-col h-auto shadow rounded-xl overflow-hidden bg-gradient-to-l from-black to-slate-900">
          <WelcomeComponent />
        </div>

        <Footer glowingBorder={false} />
      </div>
    </div>
  );
};

export default Home;
