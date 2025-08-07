import "./navbar.css";
import logo from "../../assets/symbol.png";
import Search from "../../assets/search1.svg";
import Arrow from "../../assets/arrow-down.svg";
import Searchwt from "../../assets/search.svg";
// import { userAuth } from '../Context/Auth';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Firebase/firebase";
import addbtn from "../../assets/addButton.png";

const Navbar = (props) => {
  const { user } = useAuthState(auth);
  const { togglemodal, toggleSellmodal } = props;
  return (
    <div>
      <nav className="fixed w-full bg-slate-100 shadow-md border-b-4 border-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 p-2 px-4 overflow-hidden">
          {/* Logo */}
          <img src={logo} alt="Logo" className="w-12 flex-shrink-0" />

          {/* Location Search */}
          <div className="relative location-search hidden md:block">
            <img
              src={Search}
              alt="Search Icon"
              className="absolute top-4 left-2 w-5"
            />
            <input
              type="text"
              className="w-[200px] lg:w-[260px] p-3 pl-8 pr-8 border-2 border-black rounded-md placeholder:truncate focus:outline-none focus:border-teal-300"
              placeholder="search city, area, or location"
            />
            <img
              src={Arrow}
              alt="Arrow"
              className="absolute right-3 top-4 cursor-pointer w-5"
            />
          </div>

          {/* Main Search */}
          <div className="relative flex-1 max-w-lg">
            <input
              type="text"
              placeholder="find cars, mobile phone, and more"
              className="w-full p-3 border-2 border-black rounded-md placeholder:truncate focus:outline-none focus:border-teal-300"
            />
            <div
              style={{ backgroundColor: "#002f34" }}
              className="flex justify-center items-center absolute top-0 right-0 h-full rounded-r-md w-12"
            >
              <img
                className="w-5 filter invert"
                src={Searchwt}
                alt="Search Icon"
              />
            </div>
          </div>

          {/* Language + Login + Sell */}
          {/* <div className="flex items-center gap-4 ml-4">
      <div className="flex items-center gap-1">
        <p className="font-bold">English</p>
        <img src={Arrow} alt="Arrow" className="w-5 cursor-pointer" />
      </div>
      <p onClick={togglemodal} className="cursor-pointer">Login</p>
      <button
        onClick={toggleSellmodal}
        className="px-4 py-2 bg-yellow-400 text-black rounded-md font-bold"
      >
        + Sell
      </button>
    </div> */}
        </div>
        {!user ? (
          <p onClick={togglemodal} className="cursor-pointer">
            Login
          </p>
        ) : (
          <div className="relative">
            <p
              style={{ colot: "#002f34" }}
              className="font-bold ml-5 cursor-pointer"
            >
              {user.displayName?.split(" ")[0]}
            </p>
          </div>
        )}
        <img
          src={addbtn}
          onClick={user ? toggleSellmodal : togglemodal}
          className="w-24 mx-1 sm:ml-5 sm:mr-5 shadow-xl rounded-full cursor-pointer"
          alt=""
        />
      </nav>

      <div className="w-full relative z-0 flex-shadow-md p-2 pt-20 pl-10 pr-10 sm:pl-44 md:pr-44 sub-list">
          <ul className="list-none flex item-center justify-between w-full">
            <div className="flex flex-shrink-0">
              <p className="font-semibold uppercase all-cats">All Categories </p>
              <img className="w-4 ml-2" src={Arrow} alt="" />
            </div>

            <li>Car</li>
            <li>MotorCycles </li>
            <li>Mobile Phones</li>
            <li>For Sale:Houses & Apartments</li>
            <li>Scooter</li>
            <li>Commercial & Other Vehicles</li>
            <li>For rent: Houses & Appartments</li>

          </ul>
      </div>
    </div>
  );
};

export default Navbar;

// const Navbar = ({ togglemodal, toggleSellmodal }) => {
//   return (
//     <nav className="w-full bg-[#002f34] text-white shadow-md">
//       <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

//         {/* Left side */}
//         <div className="flex items-center gap-4">
//           <h1 className="text-xl font-bold">My OLX Clone</h1>
//         </div>

//         {/* Right side */}
//         <div className="flex items-center gap-4">
//           <button
//             onClick={togglemodal}
//             className="px-4 py-2 bg-white text-[#002f34] rounded-lg"
//           >
//             Login
//           </button>

//           <button
//             onClick={toggleSellmodal}
//             className="px-4 py-2 bg-yellow-400 text-black rounded-lg"
//           >
//             + Sell
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
