import React from "react";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillYoutube,
  AiOutlineTwitter,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import {
  footercompanyLinks,
  footerProductLinks,
  footerSupportLinks,
} from "../../static/data";

const Footer = () => {
  return (
    <div className="bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="md:flex md:justify-between md:items-center sm:px-12 px-4 bg-gradient-to-r from-green-600 to-green-700 py-8">
        <h1 className="lg:text-4xl text-3xl md:mb-0 mb-6 lg:leading-normal font-semibold md:w-2/5">
          <span className="text-white">Subscribe</span> for latest news{" "}
          <br />
          events and exclusive offers
        </h1>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            required
            placeholder="Enter your email..."
            className="text-gray-800 sm:w-72 w-full py-3 px-4 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-lg"
          />
          <button className="bg-white text-green-600 hover:bg-green-50 font-semibold duration-300 px-6 py-3 rounded-lg shadow-lg md:w-auto w-full transition-all">
            Subscribe
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:px-12 px-4 py-16">
        <div className="text-center sm:text-start">
          <div className="flex items-center justify-center sm:justify-start mb-4">
            <h2 className="text-3xl font-bold text-green-400">DevXCom</h2>
          </div>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Your trusted partner for innovative e-commerce solutions. 
            Creating beautiful digital experiences that drive success.
          </p>
          <div className="flex items-center justify-center sm:justify-start space-x-4">
            <div className="p-2 bg-green-600 rounded-full hover:bg-green-500 transition-colors cursor-pointer">
              <AiFillFacebook size={20} className="text-white" />
            </div>
            <div className="p-2 bg-green-600 rounded-full hover:bg-green-500 transition-colors cursor-pointer">
              <AiOutlineTwitter size={20} className="text-white" />
            </div>
            <div className="p-2 bg-green-600 rounded-full hover:bg-green-500 transition-colors cursor-pointer">
              <AiFillInstagram size={20} className="text-white" />
            </div>
            <div className="p-2 bg-green-600 rounded-full hover:bg-green-500 transition-colors cursor-pointer">
              <AiFillYoutube size={20} className="text-white" />
            </div>
          </div>
        </div>

        <div className="text-center sm:text-start">
          <h3 className="text-xl font-semibold text-green-400 mb-4">Company</h3>
          <ul className="space-y-2">
            {footerProductLinks.map((link, index) => (
              <li key={index}>
                <Link
                  className="text-gray-300 hover:text-green-400 duration-300 text-sm cursor-pointer leading-6 transition-colors"
                  to={link.link}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-center sm:text-start">
          <h3 className="text-xl font-semibold text-green-400 mb-4">Shop</h3>
          <ul className="space-y-2">
            {footercompanyLinks.map((link, index) => (
              <li key={index}>
                <Link
                  className="text-gray-300 hover:text-green-400 duration-300 text-sm cursor-pointer leading-6 transition-colors"
                  to={link.link}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-center sm:text-start">
          <h3 className="text-xl font-semibold text-green-400 mb-4">Support</h3>
          <ul className="space-y-2">
            {footerSupportLinks.map((link, index) => (
              <li key={index}>
                <Link
                  className="text-gray-300 hover:text-green-400 duration-300 text-sm cursor-pointer leading-6 transition-colors"
                  to={link.link}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center pt-6 pb-8 px-4 sm:px-12">
          <div className="text-gray-400 text-sm">
            <span>© 2025 DevXCom. All rights reserved.</span>
          </div>
          <div className="flex items-center justify-center space-x-4 text-gray-400 text-sm">
            <Link to="/terms" className="hover:text-green-400 transition-colors">Terms</Link>
            <span>•</span>
            <Link to="/privacy" className="hover:text-green-400 transition-colors">Privacy Policy</Link>
          </div>
          <div className="flex items-center justify-center">
            <div className="bg-gray-800 rounded-lg p-3">
              <img
                src="https://hamart-shop.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffooter-payment.a37c49ac.png&w=640&q=75"
                alt="Payment Methods"
                className="h-6 opacity-70"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;