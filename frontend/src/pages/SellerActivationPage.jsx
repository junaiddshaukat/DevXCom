import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../server";

const SellerActivationPage = () => {
  const { activationToken } = useParams();
  const [error, setError] = useState(null); // More detailed error state
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (activationToken) {
      const activationEmail = async () => {
        try {
          console.log("Sending activation token:", { activationToken });
          const res = await axios.post(
            `${server}/shop/activation`,
            {
              activationToken,
            },
            { headers: { "Content-Type": "application/json" } }
          );
          console.log("Server response:", res.data.message);
          setSuccess(true);
        } catch (error) {
          console.error("Error response:", error.response); // Log the entire error response
          setError(
            error.response
              ? error.response.data.message
              : "An unexpected error occurred."
          );
        }
      };
      activationEmail();
    }
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {!success ? (
        <p>Your account has been created successfully!</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <p>Activating your account...</p>
      )}
    </div>
  );
};

export default SellerActivationPage;


