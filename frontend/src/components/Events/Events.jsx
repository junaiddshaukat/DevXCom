import React from "react";
import EventCard from "./EventCard";

const Events = ({ allEvents = [] }) => (
    <div>
        <h2>Popular Events</h2>
        {allEvents.length > 0 ? (
            <EventCard data={allEvents[0]} />
        ) : (
            <p>No Events available!</p>
        )}
    </div>
);

export default Events;
