import React, { useEffect, useState } from "react";
import "./About.css";
import Navbar from "../../Components/Navbar/Navbar";
import aboutbg from "../../Assets/blueMultiverse.jpg";
import comp1 from "../../Assets/comp1.jpg";
import flaming from "../../Assets/flaming-circle.gif";
import URL from "../../apiconfig";
import Footer from "../../Components/Footer/Footer";
import WelcomeComponent from "../Home/welcome";
import YouTubePlayer from "../../Components/YouTubePlayer";
import developerPhoto from "../../Assets/developerPhoto.jpeg";

const About = () => {
  const videoIds = ["6qyu9fVyees", "mSy5KJOjISs"];

  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);
  const [title, setTitle] = useState("TechSprint");
  const [description, setDescription] = useState(
    "TechSprint is an upcoming technical carnival aimed at enriching the curiosity, creativity, and scientific attitude among students from Class 6 to 12. It is an excellent platform for young minds to explore the exciting world of technology, engage in hands-on technical events, and showcase their skills in this amazing competitions. The event will inspire students to think outside the box, develop problem-solving abilities, and embrace the digital future. Get ready to be ignited with knowledge and fun!"
  );
  const [apiFailed, setApiFailed] = useState(false);

  useEffect(() => {
    const fetchAboutUsData = async () => {
      try {
        const response = await fetch(`${URL}/api/aboutUs`);
        if (response.ok) {
          const data = await response.json();
          setPhotos(data.photos || []);
          setVideos(data.videos || videoIds);
          setTitle(data.title || "TechSprint");
          setDescription(
            data.description ||
              "TechSprint is an upcoming technical carnival aimed at enriching the curiosity, creativity, and scientific attitude among students from Class 6 to 12. It is an excellent platform for young minds to explore the exciting world of technology, engage in hands-on technical events, and showcase their skills in this amazing competitions. The event will inspire students to think outside the box, develop problem-solving abilities, and embrace the digital future. Get ready to be ignited with knowledge and fun!"
          );
        } else {
          console.error("Failed to fetch about us data:", response.statusText);
          setApiFailed(true);
        }
      } catch (error) {
        console.error("Error fetching about us data:", error.message);
        setApiFailed(true);
      }
    };

    fetchAboutUsData();
  }, []);

  const staticPhotos = [comp1, comp1, comp1, comp1, comp1];

  const getBackgroundImage = (photoId) => {
    try {
      return `${URL}/api/file/view/${photoId}`;
    } catch (error) {
      console.error("Error getting photo URL:", error.message);
      return comp1;
    }
  };

  return (
    <>
      <div
        className="w-full min-h-screen bg-center bg-cover bg-black"
        style={{ backgroundImage: `url(${aboutbg})` }}
      >
        <Navbar />
        <div className=" flex flex-col justify-center items-center bg-black bg-opacity-35 px-4 py-8">
          {/* Adjusted padding */}
          <div className="hidden w-full flex flex-wrap justify-evenly mb-8">
            {/* Added margin-bottom */}
            {(apiFailed ? staticPhotos : photos).map((photoSrc, index) => (
              <div
                key={index}
                className="min-h-56 bg-center bg-cover hover:rounded-xl hover:h-64 hover:w-64 rounded-full w-56 mb-4"
                style={{
                  backgroundImage: `url(${
                    apiFailed ? photoSrc : getBackgroundImage(photoSrc)
                  })`,
                }}
              >
                <img
                  className="rotate-animation rounded-full hover:opacity-0 hover:h-64 hover:w-64 hover:transform-none w-56 opacity-65"
                  src={flaming}
                  alt="flaming circle"
                />
              </div>
            ))}
          </div>
          <p className="rounded-xl bg-black p-3 mb-8 bg-opacity-40 font-avenger text-red-600 text-3xl gap-3 text-center">
            {/* Added margin-bottom, centered text */}
            {title}
          </p>
          <p className="about-text-container text-slate-300 border-red-600 border rounded-lg bg-black p-5 hover:bg-opacity-100 bg-opacity-50 text-2xl text-justify leading-relaxed font-avenger tracking-widest w-full md:w-3/4 mb-8">
            {/* Added margin-bottom, responsive width */}
            {description}
          </p>
          {/* WelcomeComponent moved outside */}
          <div className="flex flex-wrap w-full justify-center items-center mt-4 lg:mt-0 gap-4">
            {videos.map((videoId) => (
              <div
                key={videoId} // Key should be on the outer div
                className="rounded-xl hero-img glowing-border h-auto w-fit"
              >
                <YouTubePlayer key={videoId} id={videoId} />
              </div>
            ))}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default About;
