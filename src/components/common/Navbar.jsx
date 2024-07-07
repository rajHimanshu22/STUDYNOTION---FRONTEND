import React, { useState, useEffect } from "react";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { Link, matchPath } from "react-router-dom";
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai"
import { BsChevronDown } from "react-icons/bs" 
import { NavbarLinks } from "../../data/navbar-links";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { categories } from '../../services/apis';
import { useRef } from 'react'
import { apiConnector } from '../../services/apiconnector';
import ProfileDropdown from "../core/Auth/ProfileDropDown";
import { ACCOUNT_TYPE } from "../../utils/constants";

const Navbar = () => {

  // to fetch all the stores use useSelector hook - helps in identifying what portion of our store we need to read- this hook gives access to our store
  const {token} = useSelector( (state) => state.auth ); // subscribing to right portion of the store
  const {user} = useSelector( (state) => state.profile );
  const {totalItems} = useSelector( (state) => state.cart );

  const location = useLocation();

  const [sublinks, setsublinks] = useState([]);

  const fetchSublinks = async () => {
      try {
          const result = await apiConnector("GET", categories.CATEGORIES_API); // api call
          if (result?.data?.data?.length > 0) {
              console.log("Printing Sublinks result:", result);
              setsublinks(result?.data?.data); // category lists
          }
          localStorage.setItem("sublinks", JSON.stringify(result.data.data));

      } catch (error) {
          // setsublinks(JSON.parse(localStorage.getItem("sublinks")));
          // console.log("could not fetch sublinks",localStorage.getItem("sublinks"));
          console.log(error);
      }
  }
  useEffect(() => {
      fetchSublinks();
  }, [])

  const show = useRef();
  const overlay = useRef();

  const shownav = () => {
      show.current.classList.toggle('navshow');
      overlay.current.classList.toggle('hidden');
  }



  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <div
      className={` flex sm:relative bg-richblack-900 w-screen relative z-50 h-14 items-center justify-center border-b-[1px] border-b-richblack-700 translate-y-  transition-all duration-500`}
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        {/* Image */}
        <Link to="/">
          <img
            src={logo} width={160} alt="Study Notion" loading="lazy" height={42} />
        </Link>

        {/* Navigation links */}
        <nav className="hidden md:block">
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div className=" flex items-center cursor-pointer relative gap-1 group">
                      <p>{link.title}</p>
                      <BsChevronDown />
                      <div className='invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]'>
                      <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                                                {
                                                    sublinks?.length < 0 ? (<div></div>) : (
                                                        sublinks?.map((element, index) => (
                                                            <Link to={`/catalog/${element?.name}`} key={index} className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50" >
                                                                <p className=''>
                                                                    {element?.name}
                                                                </p>
                                                            </Link>
                                                        ))
                                                    )

                                                }
                  </div></div>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Login/Signup/dashboard */}
        <div className="hidden items-center gap-x-4 md:flex">
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {token === null && (
            <Link to="/login">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Log in
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Sign up
              </button>
            </Link>
          )}
          {token !== null && <ProfileDropdown />}
        </div>
        <button className="mr-4 md:hidden">
          <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
        </button>
    </div>
    </div>
  );
};

export default Navbar;
