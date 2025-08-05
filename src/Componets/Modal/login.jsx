import { Carousel, Modal, ModalBody } from "flowbite-react";
import React from "react";
import guitar from "../../assets/guita.png";
import close from "../../assets/close.svg";
import google from "../../assets/google.png";
import { signInWithPopup } from "firebase/auth";
import { auth ,provider } from "../Firebase/firebase";

const Login = ({ togglemodal, status }) => {
    const handleClick=async()=>{
        try {
             const result = await signInWithPopup(auth,provider)
             togglemodal()
             console.log("result",result.user)
        } catch (error) {
            console.log(error);
            
        }
    }
  return (
    <div>
      <Modal
        show={status}
        onClose={togglemodal}
        popup
        size="md"
        theme={{
          root: {
            base: "fixed inset-0 z-50 flex items-center justify-center",
            show: {
              on: "flex bg-black bg-opacity-50",
              off: "hidden",
            },
          },
          content: {
            base: "relative w-[350px] rounded-lg bg-white shadow",
          },
        }}
      >
        <div
          className="p-6 pl-2 pr-2 bg-white"
          onClick={(event) => event.stopPropagation()}
        >
          <img
            onClick={togglemodal}
            src={close}
            alt=""
            className="w-6 absolute z-10 top-4 right-4 cursor-pointer"
          />
          
           
            <div className="flex flex-col items-center justify-center">
              <img src={guitar} alt="car image 1" className="w-24 pb-5" />
              <p
                style={{ color: "#002f34" }}
                className="w-60 sm:w-72 text-center pb-5 font-semibold"
              >
                Help us become one of the safest to buy and sell.
              </p>
            </div>
            
          
        </div>
        <ModalBody
          className="bg-white h-96 p-0 rounded-none"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="p-6 pt-0">
            <div onClick={handleClick} className="flex items-center justify-center rounded-md border-2 border-gray-300 py-2 px-4 relative cursor-pointer hover:bg-gray-100">
              <img src={google} alt="" className="w-7 absolute left-2" />
              <p className="text-sm text-gray-500">Countinue with Google</p>
            </div>
            <div className="pt-5 flex flex-col items-center justify-center">
              <p className="font-semibold text-sm">OR</p>
              <p className="font-bold text-sm pt-3 underline underline-offset-4">
                Login With Email{" "}
              </p>
            </div>
            <div className="pt-10 sm:pt-20 flex flex-col items-center justify-center">
              <p className="text-xs">
                All your personal details are safe with us.
              </p>
              <p className="text-xs pt-5 text-center">
                If you countinue, you are accepting{" "}
                <span className="text-blue-600">
                  OLX terms and Conditions and privacy policy
                </span>
              </p>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Login;
