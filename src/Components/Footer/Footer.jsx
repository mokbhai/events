import React, { useEffect, useState } from "react";
import "./Footer.css";
import axios from "axios";
import URL from "../../apiconfig";
import developerPhoto from "../../Assets/developerPhoto.jpeg";

const Footer = ({ glowingBorder }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(`${URL}/api/contactUs/`);
        setContacts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching contacts:", error);
        setError("Failed to fetch contact details");
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  return (
    <div>
      <footer
        className={` text-slate-300 font-semibold text-xl ${
          glowingBorder === false ? "border" : "glowing-border"
        }  rounded-xl box-shadow p-10 border-2px-gray bg-black bg-opacity-70  text-center  w-full bottom-0 max-h-fit`}
      >
        <div className="flex flex-col items-center">
          <div className="footer-content flex flex-col sm:flex-row justify-around w-full h-fit  mb-8">
            {/* About Us */}
            <div className="footer-section about sm:w-1/3 ">
              <h3 className="text-yellow-600 text-3xl mb-3 uppercase font-avenger font-normal">
                About Us
              </h3>
              <p>
                We organize and promote tech events across India to bring
                together technology enthusiasts, professionals, and innovators.
              </p>

              {/* About Developer */}
              <div className="flex flex-col items-center justify-center bg-transparent w-full">
                <p className="text-yellow-600 font-avenger text-xl mt-2">
                  Developed & Maintained by
                </p>
                <div className="flex flex-wrap gap-3">
                  {/* Mokshit Jain */}
                  <a
                    href="https://github.com/mokbhai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center" // Center content
                  >
                    <div className="rounded-full overflow-hidden w-24 h-24 border-2 border-red-600 opacity-70 hover:opacity-100 hover:rounded-none">
                      <img
                        src={developerPhoto}
                        alt="Mokshit Jain"
                        className="w-full h-full object-cover "
                      />
                    </div>
                    <p className="text-slate-300 font-sans text-xl mt-2">
                      Mokshit Jain
                    </p>
                  </a>

                  {/* Aniket Mishra */}
                  <a
                    href="https://github.com/aniket992/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center" // Center content
                  >
                    <div className="rounded-full overflow-hidden w-24 h-24 border-2 border-red-600 opacity-70 hover:opacity-100 hover:rounded-none">
                      <img
                        src="https://avatars.githubusercontent.com/u/78945155?v=4"
                        alt="Aniket Mishra"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-slate-300 font-sans text-xl mt-2">
                      Aniket Mishra
                    </p>
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className=" sm:w-1/3  ">
              <h3 className="mb-3 text-yellow-600 text-3xl uppercase font-avenger font-normal">
                Quick Links
              </h3>
              <ul className="font-sans tracking-widest leading-relaxed  ">
                <li>
                  <a className=" " href="/">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/events">Events</a>
                </li>
                <li>
                  <a href="/gallery">Gallery</a>
                </li>
                <li>
                  <a href="/contact">Contact Us</a>
                </li>
                <li>
                  <a href="/about">About</a>
                </li>
              </ul>
            </div>

            {/* Contact Us */}
            <div className="footer-section contact sm:w-1/3">
              <h3 className="text-yellow-600 mb-3 text-3xl uppercase font-avenger font-normal">
                Contact Us
              </h3>
              {error && <p>{error}</p>}
              {contacts &&
                contacts.map((contact, index) => (
                  <div key={index} className="mb-2">
                    {contact.fullname && <p>Name: {contact.fullname}</p>}
                    {contact.email && <p>Email: {contact.email}</p>}
                    {contact.phone && <p>Phone: {contact.phone}</p>}
                  </div>
                ))}
              {!contacts && (
                <div>
                  <p>Email: info@techsprintindia.com</p>
                  <p>Phone: +91 12345 67890</p>
                </div>
              )}
            </div>
          </div>
          <div className="w-full text-sm">
            <p>&copy; 2024 TechSprint India. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
