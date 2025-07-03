import React from "react";
import { AiOutlineGift } from "react-icons/ai";
import { MdOutlineLocalOffer } from "react-icons/md";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiMessageSquareDetail } from "react-icons/bi";
import { backendUrl } from "../../../server";
import { getImageUrl } from "../../../utils/imageUtils";

const DashboardHeader = () => {
  const { seller } = useSelector((state) => state.seller);
  return (
    <div className="w-full h-[80px] bg-white shadow-lg border-b border-gray-100 sticky top-0 left-0 z-30 flex items-center justify-between px-6">
      {/* Left side - Logo */}
      <div className="flex items-center">
        <Link to="/dashboard" className="flex items-center hover:opacity-80 transition-opacity">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">D</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">
              DevX<span className="text-green-600">Com</span>
            </h1>
          </div>
        </Link>
        <div className="ml-6 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
          Seller Dashboard
        </div>
      </div>
      
      {/* Right side - Navigation and Profile */}
      <div className="flex items-center space-x-2">
        {/* Navigation Icons */}
        <div className="flex items-center space-x-1">
          <Link to="/dashboard-coupons" className="800px:block hidden">
            <div className="p-3 rounded-lg hover:bg-green-50 transition-colors group">
              <AiOutlineGift
                size={24} 
                className="text-gray-600 group-hover:text-green-600 transition-colors"
              />
            </div>
          </Link>
          <Link to="/dashboard-events" className="800px:block hidden">
            <div className="p-3 rounded-lg hover:bg-green-50 transition-colors group">
              <MdOutlineLocalOffer
                size={24}
                className="text-gray-600 group-hover:text-green-600 transition-colors"
              />
            </div>
          </Link>
          <Link to="/dashboard-products" className="800px:block hidden">
            <div className="p-3 rounded-lg hover:bg-green-50 transition-colors group">
              <FiShoppingBag
                size={24}
                className="text-gray-600 group-hover:text-green-600 transition-colors"
              />
            </div>
          </Link>
          <Link to="/dashboard-orders" className="800px:block hidden">
            <div className="p-3 rounded-lg hover:bg-green-50 transition-colors group">
              <FiPackage 
                size={24} 
                className="text-gray-600 group-hover:text-green-600 transition-colors" 
              />
            </div>
          </Link>
          <Link to="/dashboard-messages" className="800px:block hidden">
            <div className="p-3 rounded-lg hover:bg-green-50 transition-colors group">
              <BiMessageSquareDetail
                size={24}
                className="text-gray-600 group-hover:text-green-600 transition-colors"
              />
            </div>
          </Link>
        </div>
        
        {/* Profile Section */}
        <div className="ml-4 pl-4 border-l border-gray-200">
          <Link to={`/shop/${seller._id}`} className="flex items-center space-x-3 hover:bg-gray-50 rounded-lg p-2 transition-colors">
            <img
              src={getImageUrl(seller.avatar)}
              alt="Shop Avatar"
              className="w-[45px] h-[45px] rounded-full object-cover border-2 border-green-200"
            />
            <div className="hidden 800px:block">
              <div className="text-sm font-semibold text-gray-800">{seller?.name}</div>
              <div className="text-xs text-gray-500">View Shop</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;