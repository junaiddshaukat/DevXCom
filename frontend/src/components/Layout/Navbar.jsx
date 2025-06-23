"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { navItems } from "../../static/data"

// Import styles
const styles = {
  normalFlex: "flex items-center",
}

const Navbar = ({ active }) => {
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 0)

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div className={`block ${windowWidth >= 800 ? styles.normalFlex : ""}`}>
      {navItems &&
        navItems.map((i, index) => (
          <div className="flex" key={index}>
            <Link
              to={i.url}
              className={`${
                active === index + 1 ? "text-[#17dd1f]" : windowWidth >= 800 ? "text-[#fff]" : "text-black"
              } pb-[30px] ${windowWidth >= 800 ? "pb-0" : ""} font-[500] px-6 cursor-pointer`}
            >
              {i.title}
            </Link>
          </div>
        ))}
    </div>
  )
}

export default Navbar