import './navbar.css';
import logo from "../../assets/symbol.png";
import Search from "../../assets/search1.svg";
import Arrow from "../../assets/arrow-down.svg";
import Searchwt from "../../assets/search.svg";

const Navbar = (props) => {
  const {togglemodal,toggleSellmodal}=props
  return (
    <div>
      <nav className="navbar fixed w-full overflow-auto p-2 pl-3 pr-3 shadow-md bg-slate-100 border-b-4 border-solid border-b-white">
        
        <img src={logo} alt="Logo" className="w-12" />

        
        <div className="relative location-search ml-5">
          <img src={Search} alt="Search Icon" className="absolute top-4 left-2 w-5" />
          <input
            type="text"
            className="w-[50px] sm:w-[150px] md:w-[250px] lg:w-[260px] p-3 pl-8 pr-8 border-black border-solid border-2 rounded-md placeholder:truncate focus:outline-none focus:border-teal-300"
            placeholder="search city, area, or location"
          />
          <img src={Arrow} alt="Arrow" className="absolute right-3 top-4 cursor-pointer w-5" />
        </div>

        
        <div className="ml-5 mr-2 relative w-full main-search">
          <input
            type="text"
            placeholder="find cars, mobile phone, and more"
            className="w-full p-3 border-black border-solid border-2 rounded-md placeholder:truncate focus:outline-none focus:border-teal-300"
          />
          <div
            style={{ backgroundColor: "#002f34" }}
            className="flex justify-center items-center absolute top-0 right-0 h-full rounded-e-md w-12"
          >
            <img className="w-5 filter invert" src={Searchwt} alt="Search Icon" />
          </div>
        </div>

        
        <div className="mx-1 sm:ml-5 sm:mr-5 relative lang">
          <p className="font-bold mr-3">English</p>
          <img src={Arrow} alt="Arrow" className="w-5 cursor-pointer" />
        </div>
        <p onClick={togglemodal}>Login</p>
        <br />
        <p onClick={toggleSellmodal}>Sell</p>
      </nav>
      

    </div>
    
  );
};

export default Navbar;
