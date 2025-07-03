import React, { useState, useEffect } from "react";
import {
  AiFillHeart,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/wishlist";
import { addToCart } from "../../../redux/actions/cart";
import { toast } from "react-toastify";
import Ratings from "../../Products/Ratings";
import { backendUrl } from "../../../server";

const ProductCard = ({ data, isEvent }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist, data._id]);

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
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
    <>
      <div className="w-full max-w-xs bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-0 relative group overflow-hidden">
        <div className="relative w-full h-56 bg-gradient-to-br from-gray-50 to-gray-200 flex items-center justify-center">
          <Link
            to={
              isEvent === true
                ? `/product/${data._id}?isEvent=true`
                : `/product/${data._id}`
            }
            className="block w-full h-full"
          >
            <img
              src={`${backendUrl}${data.images && data.images[0]}`}
              alt={data.name}
              className="w-full h-56 object-contain transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </Link>
          <div className="absolute top-3 right-3 flex flex-col gap-3 z-10">
            <button
              aria-label={click ? "Remove from wishlist" : "Add to wishlist"}
              onClick={() =>
                click
                  ? removeFromWishlistHandler(data)
                  : addToWishlistHandler(data)
              }
              className={`bg-white rounded-full shadow p-2 transition hover:scale-110 ${
                click ? "ring-2 ring-red-400" : "hover:bg-pink-100"
              }`}
              type="button"
            >
              {click ? (
                <AiFillHeart size={22} color="red" />
              ) : (
                <AiOutlineHeart size={22} color="#333" />
              )}
            </button>
            <button
              aria-label="Quick view"
              onClick={() => setOpen(true)}
              className="bg-white rounded-full shadow p-2 transition hover:scale-110 hover:bg-blue-100"
              type="button"
            >
              <AiOutlineEye size={22} color="#333" />
            </button>
            <button
              aria-label="Add to cart"
              onClick={() => addToCartHandler(data._id)}
              className="bg-white rounded-full shadow p-2 transition hover:scale-110 hover:bg-green-100"
              type="button"
            >
              <AiOutlineShoppingCart size={22} color="#444" />
            </button>
          </div>
        </div>
        <div className="p-5 flex flex-col gap-2">
          <Link to={`/shop/preview/${data?.shop._id}`}>
            <h5
              className={`${styles.shop_name} text-xs font-semibold text-gray-500 hover:text-primary transition`}
            >
              {data.shop.name}
            </h5>
          </Link>
          <Link
            to={
              isEvent === true
                ? `/product/${data._id}?isEvent=true`
                : `/product/${data._id}`
            }
          >
            <h4 className="font-semibold text-lg text-gray-800 truncate mb-1 hover:text-primary transition">
              {data.name.length > 40
                ? data.name.slice(0, 40) + "..."
                : data.name}
            </h4>
          </Link>
          <div className="flex items-center gap-2">
            <Ratings rating={data?.ratings} />
            <span className="text-xs text-gray-400">
              ({data?.ratings?.toFixed?.(1) || "0"})
            </span>
          </div>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-end gap-2">
              <span className="text-xl font-bold text-primary">
                {data.originalPrice === 0
                  ? data.originalPrice
                  : data.discountPrice}
                $
              </span>
              {data.originalPrice &&
                data.originalPrice !== data.discountPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    {data.originalPrice}$
                  </span>
                )}
            </div>
            <span className="text-xs font-medium text-green-500 bg-green-50 rounded px-2 py-1">
              {data?.sold_out} sold
            </span>
          </div>
        </div>
        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 transition-all">
            <div className="relative bg-white rounded-xl shadow-2xl max-w-lg w-full mx-4 p-6 animate-fadeIn">
              <button
                aria-label="Close quick view"
                onClick={() => setOpen(false)}
                className="absolute top-3 right-3 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition"
                type="button"
              >
                <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                  <path
                    d="M6 6l8 8M6 14L14 6"
                    stroke="#333"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
              <ProductDetailsCard setOpen={setOpen} data={data} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductCard;