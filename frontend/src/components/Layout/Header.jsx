"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { IoIosArrowForward } from "react-icons/io"
import { BiMenuAltLeft } from "react-icons/bi"
import { CgProfile } from "react-icons/cg"
import { useSelector } from "react-redux"
import { server } from "../../server"

const styles = {
  section: "w-11/12 mx-auto",
  normalFlex: "flex items-center",
  button: "bg-[#3321c8] text-white px-4 py-2 rounded-md cursor-pointer",
}

const Header = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user)
  const [active, setActive] = useState(false)
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 0)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 70) {
        setActive(true)
      } else {
        setActive(false)
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // console.log("User:", user)

  return (
    <>
      {/* Desktop Header */}
      <div className={`${styles.section}`}>
        <div className={`${windowWidth >= 800 ? "flex" : "hidden"} h-[50px] my-[20px] items-center justify-between`}>
          <div>
            <Link to="/">
              <img src="https://shopo.quomodothemes.website/assets/images/logo.svg" alt="Logo" />
            </Link>
          </div>
          <div className={`${styles.button}`}>
            <Link to="/shop-create">
              <h1 className="text-[#fff] flex items-center">
                Become Seller
                <IoIosArrowForward className="ml-1" />
              </h1>
            </Link>
          </div>
        </div>
      </div>

      {/* Desktop Navigation */}
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : ""
        } transition ${windowWidth >= 800 ? "flex" : "hidden"} items-center justify-between w-full bg-[#3321c8] h-[70px]`}
      >
        <div className={`${styles.section} relative ${styles.normalFlex} justify-between`}>
          <div className={`${styles.normalFlex}`}></div>
          <div className="flex">
            <div className={`${styles.normalFlex}`}>
              <div className="relative cursor-pointer mr-[15px]"> {isAuthenticated ? (
                  <Link to="/profile">
                    <img 
                      src={user?.avatar?.url} 
                      className="w-[35px] h-[35px] rounded-full object-cover" 
                      alt="User" 
                    />
                  </Link>
                ) : (
                  <Link to="/login">
                    <CgProfile size={30} color="rgb(255 255 255 / 83%)" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : ""
        } w-full h-[60px] bg-[#fff] z-50 top-0 left-0 shadow-sm ${windowWidth >= 800 ? "hidden" : "block"}`}
      >
        <div className="w-full flex items-center justify-between">
          <div>
            <BiMenuAltLeft size={40} className="ml-4" onClick={() => setOpen(true)} />
          </div>
          <div>
            <Link to="/">
              <img
                src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                alt="Logo"
                className="mt-3 cursor-pointer"
              />
            </Link>
          </div>
        </div>

        {/* Mobile Sidebar */}
        {open && (
          <div className={`fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0`}>
            <div className="fixed w-[70%] bg-[#fff] h-screen top-0 left-0 z-10 overflow-y-scroll">
              <div className="flex w-full justify-center mt-8">                {isAuthenticated ? (
                  <div>
                    <Link to="/profile">
                      <img
                        src={user?.avatar?.url}
                        alt="User"
                        className="w-[60px] h-[60px] rounded-full border-[3px] border-[#0eae88] object-cover"
                      />
                    </Link>
                  </div>
                ) : (
                  <>
                    <Link to="/login" className="text-[18px] pr-[10px] text-[#000000b7]">
                      Login /
                    </Link>
                    <Link to="/sign-up" className="text-[18px] text-[#000000b7]">
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
  )
}

export default Header
