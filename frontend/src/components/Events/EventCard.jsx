import React from "react";
import styles from "../../styles/styles";
import CountDown from "./Countdown.jsx";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/actions/cart";
import { toast } from "react-toastify";
import { backendUrl } from "../../server.js";
import { getImageUrl } from "../../utils/imageUtils";

const EventCard = ({ active, data }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addToCartHandler = (data) => {
    const isItemExists = cart && cart.find((i) => i._id === data._id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addToCart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  return (
    <div
      className={`w-full block bg-gradient-to-br from-green-100 to-green-50 rounded-2xl shadow-lg ${
        active ? "" : "mb-12"
      } lg:flex p-4 transition-transform duration-200 hover:scale-[1.02]`}
    >
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-md p-2 flex items-center justify-center">
          <img
            src={getImageUrl(data.images[0])}
            alt={data.name}
            className="object-cover rounded-lg max-h-64 w-full"
          />
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-4 py-2">
        <h2 className="text-2xl font-bold text-green-800 mb-2 leading-tight">{data.name}</h2>
        <p className="text-gray-700 mb-4 line-clamp-3">{data.description}</p>
        <div className="flex py-2 justify-between items-center">
          <div className="flex items-end">
            <h5 className="font-semibold text-lg text-gray-400 pr-3 line-through">
              {data.originalPrice}$
            </h5>
            <h5 className="font-bold text-2xl text-green-700 font-Roboto">
              {data.discountPrice}$
            </h5>
          </div>
          <span className="pl-3 font-medium text-base text-green-600 bg-green-100 rounded-full px-3 py-1">
            {data.sold_out} sold
          </span>
        </div>
        <div className="my-4">
          <CountDown data={data} />
        </div>
        <div className="flex items-center gap-4 mt-2">
          <Link to={`/product/${data._id}?isEvent=true`}>
            <button
              className="bg-green-600 hover:bg-green-700 transition-colors duration-150 text-white font-semibold py-2 px-6 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-green-400"
              type="button"
            >
              See Details
            </button>
          </Link>
          <button
            className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 transition-colors duration-150 text-white font-semibold py-2 px-6 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-green-400"
            type="button"
            onClick={() => addToCartHandler(data)}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;