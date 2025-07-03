import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";
import { categoriesData, productData } from "../../static/data";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import DropDown from "./DropDown";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import Cart from "../cart/Cart";
import Wishlist from "../Wishlist/Wishlist";
import { RxCross1 } from "react-icons/rx";
import { backendUrl } from "../../server";

const Header = ({ activeHeading }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { isSeller } = useSelector((state) => state.seller);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const { allProducts } = useSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredProducts =
      allProducts &&
      allProducts.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
    setSearchData(filteredProducts);
  };

  // window.addEventListener("scroll", () => {
  //   if (window.scrollY > 70) {
  //     setActive(true);
  //   } else {
  //     setActive(false);
  //   }
  // });

  return (
    <>
      <div className={`${styles.section}`}>
        <div className="hidden 800px:h-[60px] 800px:my-[20px] 800px:flex items-center justify-between">
          <div>
            <Link to="/">
              <div className="flex items-center">
                <h1 className="text-4xl font-bold text-green-600 hover:text-green-700 transition-colors">
                  DevXCom
                </h1>
              </div>
            </Link>
          </div>
          {/* search box */}
          <div className="w-[50%] relative">
            <input
              type="text"
              placeholder="Search Product..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="h-[45px] w-full px-4 border-[2px] border-green-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm"
            />
            <AiOutlineSearch
              size={22}
              className="absolute right-3 top-3 cursor-pointer text-green-600"
            />
            {searchData && searchData.length !== 0 ? (
              <div className="absolute min-h-[30vh] bg-white shadow-xl z-[9] p-4 rounded-lg border border-green-200 mt-1 max-h-[60vh] overflow-y-auto">
                {searchData &&
                  searchData.map((i, index) => {
                    return (
                      <Link to={`/product/${i._id}`} key={index}>
                        <div className="w-full flex items-center py-3 hover:bg-green-50 rounded-lg px-2 transition-colors">
                          <img
                            src={`${backendUrl}${i.images[0]}`}
                            alt=""
                            className="w-[40px] h-[40px] mr-[10px] rounded-md object-cover"
                          />
                          <h1 className="text-gray-700 hover:text-green-600">{i.name}</h1>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            ) : null}
          </div>

          <div className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 px-6 py-3 rounded-lg shadow-lg transition-all duration-300">
            <Link to={`${isSeller ? "/dashboard" : "/shop-create"}`}>
              <h1 className="text-white flex items-center font-semibold">
                {isSeller ? "Go Dashboard" : "Become Seller"}{" "}
                <IoIosArrowForward className="ml-1" />
              </h1>
            </Link>
          </div>
        </div>
      </div>
      <div
        className={`${
          active === true ? "shadow-lg fixed top-0 left-0 z-10" : null
        } transition hidden 800px:flex items-center justify-between w-full bg-gradient-to-r from-green-600 to-green-700 h-[70px]`}
      >
        <div
          className={`${styles.section} relative ${styles.noramlFlex} justify-between`}
        >
          {/* categories */}
          <div onClick={() => setDropDown(!dropDown)}>
            <div className="relative h-[50px] mt-[10px] w-[270px] hidden 1000px:block">
              <BiMenuAltLeft size={30} className="absolute top-2 left-2 text-green-600" />
              <button
                className={`h-[100%] w-full flex justify-between items-center pl-10 bg-white hover:bg-green-50 font-sans text-lg font-[500] select-none rounded-lg shadow-sm transition-colors`}
              >
                All Categories
              </button>
              <IoIosArrowDown
                size={20}
                className="absolute right-2 top-3 cursor-pointer text-green-600"
                onClick={() => setDropDown(!dropDown)}
              />
              {dropDown ? (
                <DropDown
                  categoriesData={categoriesData}
                  setDropDown={setDropDown}
                />
              ) : null}
            </div>
          </div>
          {/* navitems */}
          <div className={`${styles.noramlFlex}`}>
            <Navbar active={activeHeading} />
          </div>

          <div className="flex">
            <div className={`${styles.noramlFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px] hover:bg-green-500 p-2 rounded-lg transition-colors"
                onClick={() => setOpenWishlist(true)}
              >
                <AiOutlineHeart size={28} color="white" />
                <span className="absolute -right-1 -top-1 rounded-full bg-green-400 w-5 h-5 flex items-center justify-center text-white font-bold text-[11px] shadow-md">
                  {wishlist && wishlist.length}
                </span>
              </div>
            </div>

            <div className={`${styles.noramlFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px] hover:bg-green-500 p-2 rounded-lg transition-colors"
                onClick={() => setOpenCart(true)}
              >
                <AiOutlineShoppingCart
                  size={28}
                  color="white"
                />
                <span className="absolute -right-1 -top-1 rounded-full bg-green-400 w-5 h-5 flex items-center justify-center text-white font-bold text-[11px] shadow-md">
                  {cart && cart.length}
                </span>
              </div>
            </div>

            <div className={`${styles.noramlFlex}`}>
              <div className="relative cursor-pointer mr-[15px] hover:bg-green-500 p-2 rounded-lg transition-colors">
                {isAuthenticated ? (
                  <Link to="/profile">
                    <img
                      src={`${backendUrl}${user?.avatar}`}
                      className="w-[35px] h-[35px] rounded-full border-2 border-green-400"
                      alt=""
                    />
                  </Link>
                ) : (
                  <Link to="/login">
                    <CgProfile size={28} color="white" />
                  </Link>
                )}
              </div>
            </div>

            {/* cart popup */}
            {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

            {/* wishlist popup */}
            {openWishlist ? (
              <Wishlist setOpenWishlist={setOpenWishlist} />
            ) : null}
          </div>
        </div>
      </div>

      {/* mobile header */}
      <div
        className={`${
          active === true ? "shadow-lg fixed top-0 left-0 z-10" : null
        }
      w-full h-[70px] bg-gradient-to-r from-green-600 to-green-700 z-50 top-0 left-0 shadow-sm 800px:hidden`}
      >
        <div className="w-full flex items-center justify-between h-full px-4">
          <div>
            <BiMenuAltLeft
              size={35}
              className="text-white"
              onClick={() => setOpen(true)}
            />
          </div>
          <div>
            <Link to="/">
              <h1 className="text-2xl font-bold text-white">
                DevXCom
              </h1>
            </Link>
          </div>
          <div>
            <div
              className="relative"
              onClick={() => setOpenCart(true)}
            >
              <AiOutlineShoppingCart size={30} className="text-white" />
              <span className="absolute -right-1 -top-1 rounded-full bg-green-400 w-5 h-5 flex items-center justify-center text-white font-bold text-[11px] shadow-md">
                {cart && cart.length}
              </span>
            </div>
          </div>
          {/* cart popup */}
          {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

          {/* wishlist popup */}
          {openWishlist ? <Wishlist setOpenWishlist={setOpenWishlist} /> : null}
        </div>

        {/* header sidebar */}
        {open && (
          <div
            className={`fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0`}
          >
            <div className="fixed w-[70%] bg-white h-screen top-0 left-0 z-10 overflow-y-scroll">
              <div className="w-full justify-between flex pr-3 bg-green-600 py-4">
                <div className="flex items-center">
                  <div
                    className="relative mr-[15px] ml-3"
                    onClick={() => setOpenWishlist(true) || setOpen(false)}
                  >
                    <AiOutlineHeart size={30} className="text-white" />
                    <span className="absolute -right-1 -top-1 rounded-full bg-green-400 w-5 h-5 flex items-center justify-center text-white font-bold text-[11px] shadow-md">
                      {wishlist && wishlist.length}
                    </span>
                  </div>
                  <h2 className="text-white text-lg font-semibold">DevXCom</h2>
                </div>
                <RxCross1
                  size={30}
                  className="text-white cursor-pointer"
                  onClick={() => setOpen(false)}
                />
              </div>

              <div className="my-8 w-[92%] m-auto h-[40px] relative">
                <input
                  type="search"
                  placeholder="Search Product..."
                  className="h-[45px] w-full px-4 border-[2px] border-green-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <AiOutlineSearch
                  size={22}
                  className="absolute right-3 top-3 text-green-600"
                />
                {searchData && (
                  <div className="absolute bg-white z-10 shadow-lg w-full left-0 p-3 rounded-lg border border-green-200 mt-1">
                    {searchData.map((i, index) => {
                      const d = i.name;
                      const Product_name = d.replace(/\s+/g, "-");
                      return (
                        <Link to={`/product/${Product_name}`} key={index}>
                          <div className="flex items-center py-2 hover:bg-green-50 rounded px-2">
                            <img
                              src={`${backendUrl}${i.images[0]}`}
                              alt=""
                              className="w-[50px] h-[50px] mr-2 rounded object-cover"
                            />
                            <h5 className="text-gray-700">{i.name}</h5>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              <Navbar active={activeHeading} />
              <div className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 ml-4 px-4 py-3 rounded-lg shadow-lg transition-all duration-300 mr-4">
                <Link to="/shop-create">
                  <h1 className="text-white flex items-center font-semibold">
                    Become Seller <IoIosArrowForward className="ml-1" />
                  </h1>
                </Link>
              </div>
              <br />
              <br />
              <br />

              <div className="flex w-full justify-center">
                {isAuthenticated ? (
                  <div>
                    <Link to="/profile">
                      <img
                        src={`${backendUrl}${user?.avatar}`}
                        alt=""
                        className="w-[60px] h-[60px] rounded-full border-[3px] border-green-500"
                      />
                    </Link>
                  </div>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="text-[18px] pr-[10px] text-green-600 font-semibold"
                    >
                      Login /
                    </Link>
                    <Link
                      to="/sign-up"
                      className="text-[18px] text-green-600 font-semibold"
                    >
                      Sign up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;