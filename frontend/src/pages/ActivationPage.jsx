import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ActivationPage = () => {
  const { activationToken } = useParams();
  const [status, setStatus] = useState("loading");
  const [errorMessage, setErrorMessage] = useState(""); // Add this line

  console.log("ActivationPage rendered, token:", activationToken); // Add this debug line

  useEffect(() => {
    if (activationToken) {
      console.log("Sending activation request with token:", activationToken); // Add this debug line
      
      const sendResponse = async () => {
        try {
          const response = await axios.post(`http://localhost:8000/api/v2/user/activation`, { activationToken });
          console.log("Activation response:", response.data); // Add this debug line
          setStatus("success");
          toast.success("Account created successfully");
        } catch (error) {
          console.log("Activation error:", error); // Add this debug line
          setStatus("error");
          // Show the actual error message from backend, fallback if not present
          toast.error(error.response?.data?.message || "Activation failed. Please try again.");
        } 
      };

      sendResponse();
    }
  }, [activationToken]);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      {status === "loading" && (
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p>Activating your account... (Token: {activationToken?.substring(0, 10)}...)</p>
        </div>
      )}

      {status === "error" && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
          <h2 className="mb-2 text-xl font-semibold text-red-700">Activation Failed</h2>
          <p className="text-red-600">
            {error?.response?.data?.message || "Your activation token has expired or is invalid."}
          </p>
          <p className="mt-4 text-sm text-red-500">Please request a new activation link.</p>
        </div>
      )}

      {status === "success" && (
        <div className="rounded-lg border border-green-200 bg-green-50 p-6 text-center">
          <h2 className="mb-2 text-xl font-semibold text-green-700">Activation Successful</h2>
          <p className="text-green-600">Your account has been activated successfully.</p>
          <p className="mt-4 text-sm text-green-500">You can now log in to your account.</p>
        </div>
      )}
    </div>
  );
};

export default ActivationPage;