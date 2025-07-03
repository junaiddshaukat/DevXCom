import React, { useEffect, useState } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
  AiOutlineMinus,
  AiOutlinePlus,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllProductShop } from "../../redux/actions/product";
import { server, backendUrl } from "../../server";
import styles from "../../styles/styles";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/actions/wishlist";
import { addToCart } from "../../redux/actions/cart";
import { toast } from "react-toastify";
import Ratings from "./Ratings";
import axios from "axios";

const ProductDetails = ({ data }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.products);
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProductShop(data && data?.shop._id));
    if (wishlist && wishlist.find((i) => i._id === data?._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [data, wishlist]);

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

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
        const cartData = { ...data, qty: count };
        dispatch(addToCart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

 const totalReviewsLength =
    products && Array.isArray(products) // Check if products is an array
      ? products.reduce(
          (acc, product) => acc + (product?.reviews?.length || 0), // Safely access reviews.length
          0
        )
      : 0; // Default to 0 if products is not an array or undefined

  const totalRatings =
    products && Array.isArray(products) // Check if products is an array
      ? products.reduce(
          (acc, product) =>
            acc +
            (product?.reviews // Safely access reviews
              ? product.reviews.reduce((sum, review) => sum + review.rating, 0)
              : 0), // Default to 0 if reviews is not an array or undefined
          0
        )
      : 0; // Default to 0 if products is not an array or undefined

  const avg = totalReviewsLength > 0 ? totalRatings / totalReviewsLength : 0;

  const averageRating = avg.toFixed(2);

  const handleMessageSubmit = async () => {
    if (isAuthenticated) {
      const groupTitle = data._id + user._id;
      const userId = user._id;
      const sellerId = data.shop._id;
      await axios
        .post(`${server}/conversation/create-new-conversation`, {
          groupTitle,
          userId,
          sellerId,
        })
        .then((res) => {
          navigate(`/inbox?${res.data.conversation._id}`);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } else {
      toast.error("Please login to create a conversation");
    }
  };

  return (
    <div className="bg-gradient-to-br from-green-50 to-white min-h-screen">
      {data ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Image Section */}
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
                  <div className="aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                    <img
                      src={`${backendUrl}${data && data.images[select]}`}
                      alt={data.name}
                      className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                </div>
                
                {/* Thumbnail Images */}
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {data &&
                    data.images.map((image, index) => (
                      <div
                        key={index}
                        className={`relative flex-shrink-0 cursor-pointer rounded-lg overflow-hidden transition-all duration-200 ${
                          select === index 
                            ? "ring-3 ring-green-500 shadow-lg scale-105" 
                            : "hover:ring-2 hover:ring-green-300 hover:scale-102"
                        }`}
                        onClick={() => setSelect(index)}
                      >
                        <img
                          src={`${backendUrl}${image}`}
                          alt={`Product ${index + 1}`}
                          className="w-20 h-20 object-cover bg-gray-100"
                        />
                        {select === index && (
                          <div className="absolute inset-0 bg-green-500/10 border-2 border-green-500 rounded-lg"></div>
                        )}
                      </div>
                    ))}
                </div>
              </div>
              {/* Product Info Section */}
              <div className="space-y-8">
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-green-100">
                  {/* Product Header */}
                  <div className="space-y-4">
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                      {data.name}
                    </h1>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      {data.description}
                    </p>
                    
                    {/* Price Section */}
                    <div className="flex items-end gap-4 py-4">
                      <span className="text-4xl font-bold text-green-600">
                        ${data.discountPrice}
                      </span>
                      {data.originalPrice && data.originalPrice !== data.discountPrice && (
                        <span className="text-xl text-gray-400 line-through">
                          ${data.originalPrice}
                        </span>
                      )}
                      {data.originalPrice && data.originalPrice !== data.discountPrice && (
                        <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                          Save ${(data.originalPrice - data.discountPrice).toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quantity and Wishlist */}
                  <div className="flex items-center justify-between py-6 border-t border-gray-100">
                    <div className="flex items-center space-x-4">
                      <span className="text-gray-700 font-medium">Quantity:</span>
                      <div className="flex items-center bg-gray-100 rounded-xl overflow-hidden">
                        <button
                          className="p-3 hover:bg-green-100 transition-colors duration-200 flex items-center justify-center"
                          onClick={decrementCount}
                        >
                          <AiOutlineMinus size={18} className="text-gray-600" />
                        </button>
                        <span className="px-6 py-3 bg-white font-semibold text-gray-800 min-w-[60px] text-center">
                          {count}
                        </span>
                        <button
                          className="p-3 hover:bg-green-100 transition-colors duration-200 flex items-center justify-center"
                          onClick={incrementCount}
                        >
                          <AiOutlinePlus size={18} className="text-gray-600" />
                        </button>
                      </div>
                    </div>
                    
                    <button
                      className={`p-3 rounded-full transition-all duration-200 ${
                        click 
                          ? "bg-red-100 text-red-500 hover:bg-red-200" 
                          : "bg-gray-100 text-gray-600 hover:bg-pink-100 hover:text-pink-500"
                      }`}
                      onClick={() => click ? removeFromWishlistHandler(data) : addToWishlistHandler(data)}
                      title={click ? "Remove from wishlist" : "Add to wishlist"}
                    >
                      {click ? (
                        <AiFillHeart size={24} />
                      ) : (
                        <AiOutlineHeart size={24} />
                      )}
                    </button>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-3"
                    onClick={() => addToCartHandler(data._id)}
                  >
                    <AiOutlineShoppingCart size={24} />
                    <span className="text-lg">Add to Cart</span>
                  </button>
                </div>
                {/* Shop Info Section */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Link to={`/shop/preview/${data?.shop._id}`}>
                        <img
                          src={`${backendUrl}${data?.shop?.avatar}`}
                          alt={data.shop.name}
                          className="w-16 h-16 rounded-full object-cover border-3 border-green-200 hover:border-green-400 transition-colors duration-200"
                        />
                      </Link>
                      <div>
                        <Link to={`/shop/preview/${data?.shop._id}`}>
                          <h3 className="text-xl font-semibold text-gray-900 hover:text-green-600 transition-colors duration-200">
                            {data.shop.name}
                          </h3>
                        </Link>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center">
                            <Ratings rating={averageRating} />
                          </div>
                          <span className="text-gray-500 text-sm">
                            ({averageRating}/5) Ratings
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <button
                      className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center space-x-2"
                      onClick={handleMessageSubmit}
                    >
                      <AiOutlineMessage size={20} />
                      <span>Message Shop</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Product Details Info */}
            <div className="mt-12">
              <ProductDetailsInfo
                data={data}
                products={products}
                totalReviewsLength={totalReviewsLength}
                averageRating={averageRating}
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

const ProductDetailsInfo = ({
  data,
  products,
  totalReviewsLength,
  averageRating,
}) => {
  const [active, setActive] = useState(1);

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-green-100 overflow-hidden">
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200">
        <button
          className={`flex-1 px-6 py-4 text-center font-semibold transition-all duration-200 ${
            active === 1
              ? "bg-gradient-to-r from-green-500 to-green-600 text-white"
              : "text-gray-600 hover:text-green-600 hover:bg-green-50"
          }`}
          onClick={() => setActive(1)}
        >
          Product Details
        </button>
        <button
          className={`flex-1 px-6 py-4 text-center font-semibold transition-all duration-200 ${
            active === 2
              ? "bg-gradient-to-r from-green-500 to-green-600 text-white"
              : "text-gray-600 hover:text-green-600 hover:bg-green-50"
          }`}
          onClick={() => setActive(2)}
        >
          Reviews ({data.reviews.length})
        </button>
        <button
          className={`flex-1 px-6 py-4 text-center font-semibold transition-all duration-200 ${
            active === 3
              ? "bg-gradient-to-r from-green-500 to-green-600 text-white"
              : "text-gray-600 hover:text-green-600 hover:bg-green-50"
          }`}
          onClick={() => setActive(3)}
        >
          Shop Information
        </button>
      </div>
      {/* Tab Content */}
      <div className="p-8">
        {active === 1 && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Product Description</h3>
            <div className="prose prose-green max-w-none">
              <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                {data.description}
              </p>
            </div>
            
            {/* Additional Product Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">Product Details</h4>
                <ul className="space-y-2 text-green-700">
                  <li>Category: {data.category}</li>
                  <li>Stock: {data.stock} items available</li>
                  {data.tags && <li>Tags: {data.tags}</li>}
                </ul>
              </div>
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">Sales Info</h4>
                <ul className="space-y-2 text-blue-700">
                  <li>Total Sold: {data.sold_out} items</li>
                  <li>Average Rating: {data.ratings?.toFixed(1) || "No ratings"}</li>
                  <li>Reviews: {data.reviews.length} reviews</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {active === 2 && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h3>
            
            {data.reviews.length > 0 ? (
              <div className="space-y-6 max-h-96 overflow-y-auto">
                {data.reviews.map((item, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <div className="flex items-start space-x-4">
                      <img
                        src={`${backendUrl}${item.user.avatar}`}
                        alt={item.user.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-green-200"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-gray-900">{item.user.name}</h4>
                          <Ratings rating={item.rating} />
                        </div>
                        <p className="text-gray-700 leading-relaxed">{item.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10m0 0V6a2 2 0 00-2-2H9a2 2 0 00-2 2v2m0 0v10a2 2 0 002 2h6a2 2 0 002-2V8M9 12h6" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Reviews Yet</h3>
                <p className="text-gray-500">Be the first to review this product!</p>
              </div>
            )}
          </div>
        )}

        {active === 3 && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Shop Information</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Shop Profile */}
              <div className="space-y-6">
                <Link to={`/shop/preview/${data.shop._id}`}>
                  <div className="bg-green-50 rounded-xl p-6 border border-green-200 hover:border-green-300 transition-colors duration-200">
                    <div className="flex items-center space-x-4 mb-4">
                      <img
                        src={`${backendUrl}${data?.shop?.avatar}`}
                        className="w-16 h-16 rounded-full object-cover border-3 border-green-300"
                        alt={data.shop.name}
                      />
                      <div>
                        <h3 className="text-xl font-bold text-green-800">{data.shop.name}</h3>
                        <div className="flex items-center space-x-2">
                          <Ratings rating={averageRating} />
                          <span className="text-green-600 text-sm">
                            ({averageRating}/5) Rating
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-green-700 leading-relaxed">{data.shop.description}</p>
                  </div>
                </Link>
              </div>

              {/* Shop Statistics */}
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-4">Shop Statistics</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Joined:</span>
                      <span className="font-medium text-gray-900">
                        {data.shop?.createdAt?.slice(0, 10)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total Products:</span>
                      <span className="font-medium text-gray-900">
                        {products && products.length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total Reviews:</span>
                      <span className="font-medium text-gray-900">{totalReviewsLength}</span>
                    </div>
                  </div>
                </div>
                
                <Link to={`/shop/preview/${data?.shop._id}`}>
                  <button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
                    Visit Shop
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;