import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../server";

const ActivationPage = () => {
  const { activationToken } = useParams();
  const [error, setError] = useState(null); // More detailed error state
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (activationToken) {
      const activationEmail = async () => {
        try {
          console.log("Sending activation token:", { activationToken });
          const res = await axios.post(
            `${server}/user/activation`,
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
  }, [activationToken]);

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

export default ActivationPage;


// OTHER IMPLEMENTATION
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { toast } from "react-toastify";

// const ActivationPage = () => {
//   const { activationToken } = useParams();
//   const [status, setStatus] = useState("loading");
//   const [errorMessage, setErrorMessage] = useState(""); // Add this line

//   console.log("ActivationPage rendered, token:", activationToken); // Add this debug line

//   useEffect(() => {
//     if (activationToken) {
//       console.log("Sending activation request with token:", activationToken); // Add this debug line
      
//       const sendResponse = async () => {
//         try {
//           const response = await axios.post(`http://localhost:8000/api/v2/user/activation`, { activationToken });
//           console.log("Activation response:", response.data); // Add this debug line
//           setStatus("success");
//           toast.success("Account created successfully");
//         } catch (error) {
//           console.log("Activation error:", error); // Add this debug line
//           setStatus("error");
//           const msg = error.response?.data?.message || "Activation failed. Please try again.";
//           setErrorMessage(msg);
//           toast.error(msg);
//         } 
//       };

//       sendResponse();
//     }
//   }, [activationToken]);

//   return (
//     <div className="flex h-screen w-full items-center justify-center">
//       {status === "loading" && (
//         <div className="flex flex-col items-center gap-4">
//           <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
//           <p>Activating your account... (Token: {activationToken?.substring(0, 10)}...)</p>
//         </div>
//       )}

//       {status === "error" && (
//         <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
//           <h2 className="mb-2 text-xl font-semibold text-red-700">Activation Failed</h2>
//           <p className="text-red-600">
//             {errorMessage || "Your activation token has expired or is invalid."}
//           </p>
//           <p className="mt-4 text-sm text-red-500">Please request a new activation link.</p>
//         </div>
//       )}

//       {status === "success" && (
//         <div className="rounded-lg border border-green-200 bg-green-50 p-6 text-center">
//           <h2 className="mb-2 text-xl font-semibold text-green-700">Activation Successful</h2>
//           <p className="text-green-600">Your account has been activated successfully.</p>
//           <p className="mt-4 text-sm text-green-500">You can now log in to your account.</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ActivationPage;