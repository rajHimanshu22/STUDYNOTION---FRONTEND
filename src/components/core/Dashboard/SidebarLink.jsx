import React from "react";
import * as Icons from "react-icons/vsc"; //sb ke name me Vsc hai - agar hmare pass icon bs icon ka name hai aur usko hme import krwana hai to sare icons ko aise import krwa skte hai
import { useDispatch } from "react-redux";
import { NavLink, matchPath, useLocation } from "react-router-dom";
import { setEditCourse } from "../../../slices/courseSlice";
//import { resetCourseState } from "../../../slices/courseSlice"

// sidebar link mtlb ki sidebar me jo particular link hai usme background icon text ye sb jo hai wo
const SidebarLink = ({ link, iconName }) => {
const Icon = Icons[iconName]; // icon ke name se aise fetch krte hai icon
const location = useLocation(); // iski need isliye hai jisse ki ye pta chale ki sidebar me kiske background ko yellow krna hai
const dispatch = useDispatch();

const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
};

  return (
    <NavLink
      to={link.path}
      //onClick={() => dispatch(resetCourseState())}
      className={` py-2 px-4 relative md:px-8 md:py-2 text-sm font-medium transition-all duration-300 ${
        matchRoute(link.path) ? "bg-yellow-800" : "bg-opacity-0"
      }`}
    >
      <div
        className="flex item-center  gap-x-2 flex-col md:flex-row"
        onClick={() => {
          dispatch(setEditCourse(false));
        }}
      >
        <Icon className="md:text-lg text-3xl" />
        <span className="hidden md:block">{link.name}</span>

        {/* left side me yellow line ke liye - ye bhi tb dikhana hai jb route match ho jaye- ye span tb visible hoga jb route match kr jayega*/}
        <span
          className={`absolute bottom-0 left-0 md:top-0 h-[0.2rem] w-full md:h-full md:w-[0.2rem] bg-yellow-50 opacity-0 transition-all duration-300
                  ${matchRoute(link.path) ? "opacity-100" : "opacity-0"}`}
        ></span>
      </div>
    </NavLink>
  );
};

export default SidebarLink;
