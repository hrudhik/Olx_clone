// import "./navbar.css";
// import logo from "../../assets/symbol.png";
// import Search from "../../assets/search1.svg";
// import Arrow from "../../assets/arrow-down.svg";
// import Searchwt from "../../assets/search.svg";
// // import { userAuth } from '../Context/Auth';
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth } from "../Firebase/firebase";
// import addbtn from "../../assets/addButton.png";

// const Navbar = (props) => {
//   const { user } = useAuthState(auth);
//   const { togglemodal, toggleSellmodal } = props;
//   return (
//     <div>
//       <nav className="fixed w-full bg-slate-100 shadow-md border-b-4 border-white">
//         <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 p-2 px-4 overflow-hidden">
//           {/* Logo */}
//           <img src={logo} alt="Logo" className="w-12 flex-shrink-0" />

//           {/* Location Search */}
//           <div className="relative location-search hidden md:block">
//             <img
//               src={Search}
//               alt="Search Icon"
//               className="absolute top-4 left-2 w-5"
//             />
//             <input
//               type="text"
//               className="w-[200px] lg:w-[260px] p-3 pl-8 pr-8 border-2 border-black rounded-md placeholder:truncate focus:outline-none focus:border-teal-300"
//               placeholder="search city, area, or location"
//             />
//             <img
//               src={Arrow}
//               alt="Arrow"
//               className="absolute right-3 top-4 cursor-pointer w-5"
//             />
//           </div>

//           {/* Main Search */}
//           <div className="relative flex-1 max-w-lg">
//             <input
//               type="text"
//               placeholder="find cars, mobile phone, and more"
//               className="w-full p-3 border-2 border-black rounded-md placeholder:truncate focus:outline-none focus:border-teal-300"
//             />
//             <div
//               style={{ backgroundColor: "#002f34" }}
//               className="flex justify-center items-center absolute top-0 right-0 h-full rounded-r-md w-12"
//             >
//               <img
//                 className="w-5 filter invert"
//                 src={Searchwt}
//                 alt="Search Icon"
//               />
//             </div>
//           </div>

//           {/* Language + Login + Sell */}
//           {/* <div className="flex items-center gap-4 ml-4">
//       <div className="flex items-center gap-1">
//         <p className="font-bold">English</p>
//         <img src={Arrow} alt="Arrow" className="w-5 cursor-pointer" />
//       </div>
//       <p onClick={togglemodal} className="cursor-pointer">Login</p>
//       <button
//         onClick={toggleSellmodal}
//         className="px-4 py-2 bg-yellow-400 text-black rounded-md font-bold"
//       >
//         + Sell
//       </button>
//     </div> */}
//         </div>
//         {!user ? (
//           <p onClick={togglemodal} className="cursor-pointer">
//             Login
//           </p>
//         ) : (
//           <div className="relative">
//             <p
//               style={{ colot: "#002f34" }}
//               className="font-bold ml-5 cursor-pointer"
//             >
//               {user.displayName?.split(" ")[0]}
//             </p>
//           </div>
//         )}
//         <img
//           src={addbtn}
//           onClick={user ? toggleSellmodal : togglemodal}
//           className="w-24 mx-1 sm:ml-5 sm:mr-5 shadow-xl rounded-full cursor-pointer"
//           alt=""
//         />
//       </nav>

//       <div className="w-full relative z-0 flex-shadow-md p-2 pt-20 pl-10 pr-10 sm:pl-44 md:pr-44 sub-list">
//           <ul className="list-none flex item-center justify-between w-full">
//             <div className="flex flex-shrink-0">
//               <p className="font-semibold uppercase all-cats">All Categories </p>
//               <img className="w-4 ml-2" src={Arrow} alt="" />
//             </div>

//             <li>Car</li>
//             <li>MotorCycles </li>
//             <li>Mobile Phones</li>
//             <li>For Sale:Houses & Apartments</li>
//             <li>Scooter</li>
//             <li>Commercial & Other Vehicles</li>
//             <li>For rent: Houses & Appartments</li>

//           </ul>
//       </div>
//     </div>
//   );
// };

// export default Navbar;

// // const Navbar = ({ togglemodal, toggleSellmodal }) => {
// //   return (
// //     <nav className="w-full bg-[#002f34] text-white shadow-md">
// //       <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

// //         {/* Left side */}
// //         <div className="flex items-center gap-4">
// //           <h1 className="text-xl font-bold">My OLX Clone</h1>
// //         </div>

// //         {/* Right side */}
// //         <div className="flex items-center gap-4">
// //           <button
// //             onClick={togglemodal}
// //             className="px-4 py-2 bg-white text-[#002f34] rounded-lg"
// //           >
// //             Login
// //           </button>

// //           <button
// //             onClick={toggleSellmodal}
// //             className="px-4 py-2 bg-yellow-400 text-black rounded-lg"
// //           >
// //             + Sell
// //           </button>
// //         </div>
// //       </div>
// //     </nav>
// //   );
// // };

// // export default Navbar;



import { useState, useRef, useEffect } from "react";
import logo from "../../assets/symbol.png";
import searchIcon from "../../assets/search1.svg";
import arrowDown from "../../assets/arrow-down.svg";
import searchWhite from "../../assets/search.svg";
import { UserAuth } from "../Context/Auth";
import { toast } from 'react-toastify';

function Navbar({ togglemodal, toggmodalSell }) {
  const { user, logout } = UserAuth(); 
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      if (typeof logout === 'function') {
        await logout(); 
        toast.info("Logout successful"); 
      } else {
        console.error("Logout function is not available in UserAuth context");
      }
      setShowDropdown(false);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const getDisplayName = () => {
    if (!user) return null;
    
    if (user.displayName) {
      return user.displayName;
    } else if (user.email) {
    
      return user.email.split('@')[0];
    } else {
      return "User";
    }
  };

  return (
    <nav className="w-full fixed top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        
       
        <div className="flex items-center gap-5 flex-1">
          <img
            src={logo}
            alt="Logo"
            className="w-10 sm:w-12 hover:scale-105 transition-transform duration-200"
          />

          {/* Location Search */}
          <div className="relative w-full max-w-xs hidden md:block">
            <input
              type="text"
              placeholder="Search city, area..."
              className="w-full pl-10 pr-8 py-2 rounded-md border border-gray-300 bg-gray-100 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <img
              src={searchIcon}
              alt="Search Icon"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4"
            />
            <img
              src={arrowDown}
              alt="Dropdown"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 cursor-pointer opacity-70 hover:opacity-100"
            />
          </div>
        </div>

        {/* Center: Main Search */}
        <div className="relative w-full max-w-md hidden sm:block mx-4">
          <input
            type="text"
            placeholder="Search products like mobiles, bikes..."
            className="w-full pl-4 pr-12 py-2 rounded-md border border-gray-300 bg-gray-100 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button className="absolute right-0 top-0 h-full px-4 bg-teal-700 hover:bg-teal-800 rounded-e-md flex items-center justify-center">
            <img src={searchWhite} alt="Search" className="w-5 invert" />
          </button>
        </div>

        {/* Right Section: Language + Buttons */}
        <div className="flex items-center gap-4 justify-end">
          
          {/* Language */}
          <div className="flex items-center gap-1 text-sm text-gray-700 cursor-pointer hover:text-teal-600">
            <span>ENGLISH</span>
            <img src={arrowDown} alt="Arrow" className="w-4" />
          </div>

          {/* User Section */}
          <div className="flex items-center gap-2">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <div 
                  className="flex items-center gap-1 cursor-pointer px-3 py-1.5 rounded-full hover:bg-gray-100"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <span className="text-gray-800 font-medium">{getDisplayName()}</span>
                  <img src={arrowDown} alt="Arrow" className="w-3 h-3" />
                </div>
                
                {/* Dropdown Menu */}
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={togglemodal}
                className="px-4 py-1.5 text-sm font-medium bg-white border border-teal-600 text-teal-700 rounded-full hover:bg-teal-50 transition"
              >
                Login
              </button>
            )}
            
            <button
              onClick={toggmodalSell}
              className="px-4 py-1.5 text-sm font-medium bg-teal-600 text-white rounded-full hover:bg-teal-700 transition"
            >
              Sell
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Search - Only visible on small screens */}
      <div className="sm:hidden px-4 pb-3">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-4 pr-12 py-2 rounded-md border border-gray-300 bg-gray-100 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button className="absolute right-0 top-0 h-full px-4 bg-teal-700 hover:bg-teal-800 rounded-e-md flex items-center justify-center">
            <img src={searchWhite} alt="Search" className="w-5 invert" />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;