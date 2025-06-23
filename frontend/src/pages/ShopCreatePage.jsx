import React, { useEffect } from "react";
import ShopCreate from "../components/Shop/ShopCreate.jsx";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ShopCreatePage = () => {
 const navigate = useNavigate();

   const { isSeller } = useSelector((state) => state.seller);

   useEffect(() => {
     if (isSeller === true) {
       navigate(`/dashboard`);
     }
   }, [isSeller, navigate]);

  return (
    <div>
      <ShopCreate />
    </div>
  );
};

export default ShopCreatePage;