import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";

const Hero = () => {
  return (
    <div className="relative w-full min-h-[600px] bg-white overflow-hidden">
      {/* Clean geometric background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-green-100"></div>
      
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-32 h-32 bg-green-200 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-green-300 rounded-full blur-2xl"></div>
        <div className="absolute bottom-40 left-1/4 w-20 h-20 bg-green-100 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-green-200 rounded-full blur-2xl"></div>
      </div>
      
      <div className={`${styles.section} w-[90%] 800px:w-[85%] flex flex-col 800px:flex-row items-center justify-between py-16 800px:py-20 relative z-10`}>
        {/* Left: Text */}
        <div className="w-full 800px:w-1/2 text-gray-800 mb-12 800px:mb-0">
          <div className="inline-block bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
            ✨ New Collection Available
          </div>
          
          <h1 className="text-[40px] leading-[1.1] 800px:text-[64px] font-[800] capitalize mb-6">
            Discover Amazing
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-700"> Products</span>
            <br />
            Quality Meets Excellence
          </h1>
          
          <p className="text-[18px] font-[400] text-gray-600 leading-relaxed mb-8 max-w-[500px]">
            Experience unmatched quality and stunning design with our curated collection.
            Perfect for everyone looking for the best products at great prices.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/products" className="inline-block">
              <div className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 px-8 py-4 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                <span className="text-white text-[18px] font-semibold">
                  Shop Now
                </span>
              </div>
            </Link>
            
            <Link to="/products" className="inline-block">
              <div className="border-2 border-green-500 text-green-600 hover:bg-green-500 hover:text-white px-8 py-4 rounded-lg transition-all duration-300">
                <span className="text-[18px] font-semibold">
                  View Collection
                </span>
              </div>
            </Link>
          </div>
          
          {/* Stats */}
          <div className="flex gap-8 mt-12 pt-8 border-t border-gray-200">
            <div>
              <div className="text-2xl font-bold text-gray-800">1000+</div>
              <div className="text-gray-500 text-sm">Products</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800">50k+</div>
              <div className="text-gray-500 text-sm">Happy Customers</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800">99%</div>
              <div className="text-gray-500 text-sm">Satisfaction</div>
            </div>
          </div>
        </div>
        
        {/* Right: Image with clean design */}
        <div className="w-full 800px:w-1/2 flex justify-center relative">
          <div className="relative">
            {/* Enhanced floating elements */}
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-green-100 rounded-3xl rotate-12 opacity-60"></div>
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-green-50 rounded-full -rotate-6 opacity-40"></div>
            <div className="absolute top-1/2 -right-12 w-16 h-16 bg-green-200 rounded-2xl rotate-45 opacity-50"></div>
            
            {/* Main image container - much larger */}
            <div className="relative bg-white rounded-3xl shadow-2xl p-8 max-w-[600px] w-full border border-gray-100 transform hover:scale-105 transition-transform duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-green-100/30 rounded-3xl"></div>
              
              <img
                src="http://s.yimg.com/ny/api/res/1.2/SQRBWN_jTi9OvHKfqj9zbw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTI4ODA7aD0xODU2O3E9NTA7Y2Y9d2VicA--/https://s.yimg.com/os/creatr-uploaded-images/2024-11/ac6669e0-9c7e-11ef-bffb-b5cce5d36e6a"
                alt="Featured Product"
                className="rounded-2xl w-full object-cover aspect-[4/3] relative shadow-lg"
              />
              
              {/* Enhanced badge */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-full text-sm font-bold shadow-xl transform rotate-12">
                ✨ Featured
              </div>
              
              {/* Quality badge */}
              <div className="absolute -bottom-4 -left-4 bg-white text-green-600 px-4 py-2 rounded-full text-sm font-semibold shadow-lg border-2 border-green-100">
                Premium Quality
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Clean scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-400 animate-bounce">
        <div className="flex flex-col items-center">
          <span className="text-sm mb-2">Scroll Down</span>
          <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;