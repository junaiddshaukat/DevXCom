import React, { useEffect, useState } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../../redux/actions/cart";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/wishlist";
import { backendUrl } from "../../../server";

const ProductDetailsCard = ({ setOpen, data }) => {
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);

  const handleMessageSubmit = () => {};

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const incrementCount = () => {
    setCount(count + 1);
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < count) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: count };
        dispatch(addToCart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist, data._id]);

  const removeFromWishlistHandler = (data) => {
    setClick(false);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(true);
    dispatch(addToWishlist(data));
  };

  if (!data) return null;

  return (
    <div className="fixed w-full h-screen top-0 left-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div className="relative w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden animate-fadeIn">
        <button
          className="absolute top-4 right-4 z-50 bg-white rounded-full p-2 shadow hover:bg-green-100 transition"
          onClick={() => setOpen(false)}
          aria-label="Close"
        >
          <RxCross1 size={24} className="text-green-600" />
        </button>
        {/* Left: Product Image & Shop */}
        <div className="md:w-1/2 w-full flex flex-col items-center p-6 bg-gradient-to-br from-green-50 to-white">
          <div className="w-full flex justify-center mb-6">
            <img
              src={`${backendUrl}${data.images && data.images[0]}`}
              alt={data.name}
              className="rounded-xl object-contain w-72 h-72 shadow-lg border border-green-100"
            />
          </div>
          <Link
            to={`/shop/preview/${data.shop._id}`}
            className="flex items-center gap-3 mb-4 hover:bg-green-100 rounded-lg px-3 py-2 transition"
          >
            <img
              src={data.shop.avatar || data.images?.[0]}
              alt={data.shop.name}
              className="w-12 h-12 rounded-full border-2 border-green-400 object-cover"
            />
            <div>
              <h3 className={`${styles.shop_name} text-lg font-semibold text-green-700`}>
                {data.shop.name}
              </h3>
              <h5 className="text-green-500 text-sm">{data?.ratings} Ratings</h5>
            </div>
          </Link>
          <button
            className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg px-5 py-2 mt-2 shadow transition"
            onClick={handleMessageSubmit}
          >
            <AiOutlineMessage size={20} />
            <span>Contact Seller</span>
          </button>
          <div className="mt-6">
            <span
              className={`text-sm font-semibold ${
                data.stock > 0 ? "text-green-600" : "text-red-500"
              }`}
            >
              {data.stock > 0
                ? `${data.stock} in stock`
                : "Out of stock"}
            </span>
            <span className="ml-3 text-green-400 text-xs">
              ({data.sold || 0} sold)
            </span>
          </div>
        </div>
        {/* Right: Product Details */}
        <div className="md:w-1/2 w-full flex flex-col justify-between p-8">
          <div>
            <h1 className={`${styles.productTitle} text-2xl font-bold mb-2 text-green-800`}>
              {data.name}
            </h1>
            <p className="text-gray-700 mb-4 max-h-32 overflow-y-auto">
              {data.description}
            </p>
            <div className="flex items-end gap-3 mb-6">
              <span className="text-3xl font-bold text-green-600">
                ${data.discountPrice}
              </span>
              {data.originalPrice && (
                <span className="text-lg text-green-300 line-through">
                  ${data.originalPrice}
                </span>
              )}
              {data.discountPrice && data.originalPrice && (
                <span className="ml-2 text-sm text-green-700 font-semibold">
                  {Math.round(
                    100 - (data.discountPrice / data.originalPrice) * 100
                  )}
                  % OFF
                </span>
              )}
            </div>
            <div className="flex items-center gap-6 mb-8">
              <div className="flex items-center border border-green-200 rounded-lg overflow-hidden">
                <button
                  className="bg-green-100 text-green-700 px-3 py-2 hover:bg-green-200 transition"
                  onClick={decrementCount}
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="px-5 py-2 text-lg font-medium bg-white text-green-800">
                  {count}
                </span>
                <button
                  className="bg-green-100 text-green-700 px-3 py-2 hover:bg-green-200 transition"
                  onClick={incrementCount}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              <button
                className="flex items-center justify-center"
                onClick={() =>
                  click
                    ? removeFromWishlistHandler(data)
                    : addToWishlistHandler(data)
                }
                aria-label={click ? "Remove from wishlist" : "Add to wishlist"}
              >
                {click ? (
                  <AiFillHeart size={32} className="text-green-600" />
                ) : (
                  <AiOutlineHeart size={32} className="text-green-400 hover:text-green-600 transition" />
                )}
              </button>
            </div>
          </div>
          <button
            className={`flex items-center justify-center gap-2 w-full py-3 rounded-lg font-semibold text-lg shadow-lg transition ${
              data.stock > 0
                ? "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700"
                : "bg-green-200 text-green-500 cursor-not-allowed"
            }`}
            onClick={() => data.stock > 0 && addToCartHandler(data._id)}
            disabled={data.stock <= 0}
          >
            <AiOutlineShoppingCart size={24} />
            {data.stock > 0 ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsCard;