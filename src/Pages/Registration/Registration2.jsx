// SingleEventRegistration.jsx
import React, { useState, useContext, useEffect } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { EventsContext } from "../../Components/EventsContext";
import TeamDetails from "../../Components/TeamDetails/TeamDetails";
import Summary from "../../Components/Summary/Summary2";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ConfirmationPopup, {
  LoadingPopup,
} from "../../Components/ConfirmationPopup/ConfirmationPopup";
import URL from "../../apiconfig";

const SingleEventRegistration = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const { events } = useContext(EventsContext);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [teamDetails, setTeamDetails] = useState({
    teamName: "",
    teamMembers: [
      {
        name: "",
        class: "",
        phone: "",
        email: "",
        gender: "",
        accommodationOpted: false,
      },
      {
        name: "",
        class: "",
        phone: "",
        email: "",
        gender: "",
        accommodationOpted: false,
      },
      {
        name: "",
        class: "",
        phone: "",
        email: "",
        gender: "",
        accommodationOpted: false,
      },
      {
        name: "",
        class: "",
        phone: "",
        email: "",
        gender: "",
        accommodationOpted: false,
      },
    ],
  });
  const [totalAccommodationFee, setTotalAccommodationFee] = useState(0);

  useEffect(() => {
    const event = events.find((e) => e._id === eventId);
    if (event) {
      setSelectedEvent(event);
    } else {
      console.error("Event not found:", eventId);
      navigate("/events"); // Redirect if event not found
    }
  }, [events, eventId, navigate]);

  const fetchAccommodationFee = async () => {
    try {
      const response = await axios.get(URL + "/api/event/accommodationPrice");
      const accommodationFee = response.data.price || "NA";
      setTotalAccommodationFee(parseInt(accommodationFee || 0, 10));
    } catch (error) {
      console.error("Error fetching accommodation fee:", error);
      alert("Failed to fetch accommodation fee. Please try again later.");
    }
  };

  useEffect(() => {
    fetchAccommodationFee();
  }, []);

  const getSelectedEventNames = () => {
    if (selectedEvent) {
      return [
        { name: selectedEvent.eventName, category: selectedEvent.category },
      ]; // Include category
    }
    return [];
  };

  const calculateTotalAmount = () => {
    let totalEventAmount = 0;
    if (selectedEvent) {
      totalEventAmount = parseFloat(selectedEvent.registrationCharge.amount);
    }
    const membersOptingAccommodation = teamDetails.teamMembers.filter(
      (member) => member.accommodationOpted
    ).length;
    const totalAccommodationAmount =
      membersOptingAccommodation * totalAccommodationFee;
    return totalEventAmount + totalAccommodationAmount;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Validate Team Name
    if (!teamDetails.teamName.trim()) {
      alert("Please enter a team name.");
      return;
    }

    // 2. Validate Team Members
    const team = [];
    const phoneRegex = /^[0-9]{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let hasValidMember = false;

    for (let i = 0; i < teamDetails.teamMembers.length; i++) {
      const member = teamDetails.teamMembers[i];
      const isMemberFilled = Object.values(member).some(
        (val) => val.trim() !== ""
      ); // Check if any field is filled

      if (isMemberFilled) {
        // Validate required fields
        if (
          !member.name.trim() ||
          !member.class.trim() ||
          !member.phone.trim() ||
          !member.email.trim() ||
          !member.gender.trim()
        ) {
          alert(
            `Please fill out all details for team member ${
              i + 1
            } or leave all fields blank.`
          );
          return;
        }

        // Validate phone and email format
        if (!phoneRegex.test(member.phone)) {
          alert(
            `Please enter a valid 10-digit phone number for team member ${
              i + 1
            }.`
          );
          return;
        }
        if (!emailRegex.test(member.email)) {
          alert(`Please enter a valid email for team member ${i + 1}.`);
          return;
        }

        team.push({
          fullname: member.name,
          gender: member.gender,
          phoneNumber: member.phone,
          class: member.class,
          email: member.email,
          optAccomodation: member.accommodationOpted,
          isteamLeader: i === 0, // First member is the team leader
        });
        hasValidMember = true;
      }
    }

    // Class Validation based on Event Category (NEW)
    const selectedEventIds = Object.values(selectedEvents).filter(Boolean);
    for (const eventId of selectedEventIds) {
      const event = events.find((e) => e._id === eventId);
      if (event) {
        for (let i = 0; i < teamDetails.teamMembers.length; i++) {
          // Include team leader in validation
          const member = teamDetails.teamMembers[i];
          const memberClass = parseInt(member.class, 10);
          if (
            event.category === "jr" &&
            (isNaN(memberClass) || memberClass < 5 || memberClass > 7)
          ) {
            alert(
              `Team member ${i + 1} class is invalid for ${
                event.eventName
              } (jr category). Class should be between 5 and 7.`
            );
            return;
          } else if (
            event.category === "sr" &&
            (isNaN(memberClass) || memberClass < 8 || memberClass > 12)
          ) {
            alert(
              `Team member ${i + 1} class is invalid for ${
                event.eventName
              } (sr category). Class should be between 8 and 12.`
            );
            return;
          }
        }
      }
    }

    // Ensure at least two valid members
    if (team.length < 2) {
      alert(
        "Please register at least two team members, including the team leader."
      );
      return;
    }

    // 3. Validate Event Selection
    if (!selectedEventIds.length) {
      alert("Please select at least one event.");
      return;
    }

    const totalAmount = calculateTotalAmount();

    const registrationData = {
      teamName: teamDetails.teamName,
      team,
      eventIds: selectedEventIds,
      amount: totalAmount,
    };

    setPopupVisible(true);
    setfinalData(registrationData);
  };

  const cancelRegistration = () => {
    setPopupVisible(false);
  };

  const handlePopupSubmission = async () => {
    setPopupVisible(false);
    setLoading(true); // Show loading indicator
    try {
      const response = await axios.post(
        URL + "/api/registration/new",
        finalData
      );
      if (response.status === 201) {
        // Redirect to success page or display a success message
        alert("Registration successful!"); // Or a more sophisticated success message/redirect
        navigate("/events"); // Redirect to events page after successful registration
      } else {
        alert("Registration failed. Please try again later.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed. Please try again later.");
    } finally {
      setLoading(false); // Hide loading indicator regardless of success/failure
    }
  };

  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [finalData, setfinalData] = useState();

  return (
    // ... (JSX - similar to before, but adapted for selectedEvent. Use conditional rendering for when selectedEvent is not null)
    <div className="flex flex-col text-slate-300 min-h-screen bg-gray-900">
      <Navbar />
      {selectedEvent ? ( // Conditionally render content if selectedEvent is available
        <form
          className="w-full bg-opacity-80 p-8 rounded-lg shadow-md"
          onSubmit={handleSubmit}
        >
          {/* Team Name Input */}
          <div className="flex flex-col md:flex-row gap-2 ">
            <div className="mb-5 border p-4  md:w-1/2">
              <h2 className="text-2xl font-bold mb-4   ">Team Name*:</h2>
              <input
                type="text"
                value={teamDetails.teamName}
                onChange={(e) =>
                  setTeamDetails({ ...teamDetails, teamName: e.target.value })
                }
                placeholder="Enter Team Name"
                className="w-full border px-3 py-2 bg-slate-300 text-black font-semibold text-lg rounded"
                required
              />
            </div>
            <div className="mb-5 border p-4 md:w-1/2">
              <h2 className="text-2xl font-bold mb-4 ">Registration Info:</h2>
              <p>* means Required</p>
              <p>At least 2 members including Team Leader Must register</p>
              <p>
                Accommodation Fee: â‚¹{totalAccommodationFee} per opted member
              </p>
            </div>
          </div>

          <TeamDetails
            teamDetails={teamDetails}
            setTeamDetails={setTeamDetails}
          />

          <Summary
            selectedEvent={selectedEvent}
            totalAccommodationFee={totalAccommodationFee}
            teamDetails={teamDetails}
          />

          <div className="w-full  items-center mt-6 flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white w-1/3 text-lg self-center font-bold py-2 px-4 rounded-3xl hover:bg-blue-700 hover:font-extrabold "
            >
              REGISTER
            </button>
          </div>
        </form>
      ) : (
        <div>Loading event details...</div> // Display a loading message while fetching
      )}

      {isPopupVisible && (
        <ConfirmationPopup
          details={{
            teamName: finalData.teamName,
            teamLeader: finalData.team[0],
            teamMembers: finalData.team.slice(1),
            selectedEvents: getSelectedEventNames(),
          }}
          onClose={cancelRegistration}
          onSubmit={handlePopupSubmission}
        />
      )}
      {isLoading && <LoadingPopup />}
    </div>
  );
};

export default SingleEventRegistration;
