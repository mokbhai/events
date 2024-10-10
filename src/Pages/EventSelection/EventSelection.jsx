import React from "react";

const EventSelection = ({ events, selectedEvents, handleEventSelection, team }) => {
  const getFilteredEvents = (day, shift) => {
    return events.filter((event) => event.day === day && event.shift === shift);
  };

  return (
    <div className=" flex flex-col border p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Select Events</h2>

      <div className="grid  lg:grid-cols-2 gap-4 text-center">
        {["day1Morning", "day1Evening", "day2Morning", "day2Evening"].map(
          (category) => (
            <div
              key={category}
              className=" mb-4 border bg-red-500 text-black rounded opacity-80"
            >
              <h3 className="text-lg font-semibold capitalize">
                {category.replace(/([A-Z])/g, " $1")}
              </h3>
              <select
                value={selectedEvents[category] || ""}
                onChange={(e) => handleEventSelection(e.target.value, category)}
                className="w-full border text-black rounded-lg py-2 px-3 bg-slate-300"
              >
                <option value="">None</option>
                {getFilteredEvents(
                  category.startsWith("day1") ? 1 : 2,
                  category.endsWith("Morning") ? "Morning" : "Evening"
                ).map((event) => (
                  <option className="" key={event._id} value={event._id}>
                    {event.eventName} {event.category.toTitleCase()}
                  </option>
                ))}
              </select>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default EventSelection;
