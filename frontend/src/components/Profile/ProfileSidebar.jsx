import React from "react";
import { AiOutlineLogin, AiOutlineMessage } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from "react-icons/hi";
import {
  MdOutlineAdminPanelSettings,
  MdOutlinePassword,
  MdOutlineTrackChanges,
} from "react-icons/md";
import { TbAddressBook } from "react-icons/tb";
import { RxPerson } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getImageUrl } from "../../utils/imageUtils";

const ProfileSidebar = ({ setActive, active }) => {
  const navigate = useNavigate();
 const {user} = useSelector((state) => state.user);
  const logoutHandler = () => {
    axios
      .post(`${server}/user/logout`, {}, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        // Clear any local storage if used
        localStorage.removeItem("token");
        // localStorage.removeItem("user");
        navigate("/login");
        // Reload the page to clear all state
        window.location.reload(true);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Logout failed");
      });
  };
  return (
    <div className="w-full bg-white shadow-sm rounded-[10px] p-4 pt-8">
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(1)}
      >
        <RxPerson size={20} color={active === 1 ? "green" : ""} />
        <span
          className={`pl-3 ${
            active === 1 ? "text-[green]" : ""
          } 800px:block hidden`}
        >
          Profile
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(2)}
      >
        <HiOutlineShoppingBag size={20} color={active === 2 ? "green" : ""} />
        <span
          className={`pl-3 ${
            active === 2 ? "text-[green]" : ""
          } 800px:block hidden`}
        >
          Orders
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(3)}
      >
        <HiOutlineReceiptRefund size={20} color={active === 3 ? "green" : ""} />
        <span
          className={`pl-3 ${
            active === 3 ? "text-[green]" : ""
          } 800px:block hidden`}
        >
          Refunds
        </span>
      </div>

      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(4) || navigate("/inbox")}
      >
        <AiOutlineMessage size={20} color={active === 4 ? "green" : ""} />
        <span
          className={`pl-3 ${
            active === 4 ? "text-[green]" : ""
          } 800px:block hidden`}
        >
          Inbox
        </span>
      </div>

      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(5)}
      >
        <MdOutlineTrackChanges size={20} color={active === 5 ? "green" : ""} />
        <span
          className={`pl-3 ${
            active === 5 ? "text-[green]" : ""
          } 800px:block hidden`}
        >
          Track Order
        </span>
      </div>

      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(6)}
      >
        <RiLockPasswordLine size={20} color={active === 6 ? "green" : ""} />
        <span
          className={`pl-3 ${
            active === 6 ? "text-[green]" : ""
          } 800px:block hidden`}
        >
          Change Password
        </span>
      </div>

      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(7)}
      >
        <TbAddressBook size={20} color={active === 7 ? "green" : ""} />
        <span
          className={`pl-3 ${
            active === 7 ? "text-[green]" : ""
          } 800px:block hidden`}
        >
          Address
        </span>
      </div>

      {user && user?.role === "Admin" && (
        <Link to="/admin/dashboard">
          <div
            className="flex items-center cursor-pointer w-full mb-8"
            onClick={() => setActive(8)}
          >
            <MdOutlineAdminPanelSettings
              size={20}
              color={active === 7 ? "red" : ""}
            />
            <span
              className={`pl-3 ${
                active === 8 ? "text-[green]" : ""
              } 800px:block hidden`}
            >
              Admin Dashboard
            </span>
          </div>
        </Link>
      )}
      <div
        className="single_item flex items-center cursor-pointer w-full mb-8"
        onClick={logoutHandler}
      >
        <AiOutlineLogin size={20} color={active === 8 ? "green" : ""} />
        <span
          className={`pl-3 ${
            active === 8 ? "text-[green]" : ""
          } 800px:block hidden`}
        >
          Log out
        </span>
      </div>
    </div>
  );
};

export default ProfileSidebar;