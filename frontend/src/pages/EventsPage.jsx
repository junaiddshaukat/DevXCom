import React from "react";

const EventsPage = () => {
    return (
        <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
            <h1 style={{ textAlign: "center", fontSize: "2rem", marginBottom: "1.5rem" }}>
                All Events
            </h1>
            <div style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "1rem",
                maxWidth: "400px",
                margin: "0 auto",
                background: "#fafafa"
            }}>
                <h2 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>Sample Event</h2>
                <p style={{ color: "#555" }}>This is a simple event card UI.</p>
            </div>
        </div>
    );
};

export default EventsPage;
