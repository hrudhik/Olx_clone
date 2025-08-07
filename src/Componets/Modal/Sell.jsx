// import { Modal, ModalBody } from "flowbite-react";
// import { useState } from "react";
// import Input from "../input/Input";
// import { userAuth } from "../Context/Auth";
// import { addDoc, collection } from "firebase/firestore";
// import { fetchfromFirestore, firestore } from "../Firebase/firebase";
// import fileupload from "../../assets/fileUpload.svg";
// import loading from "../../assets/loading.gif";
// import close from "../../assets/close.svg";
// const Sell = ({ toggleSellmodal, status, setItems }) => {
//   const [title, setTitle] = useState("");
//   const [category, setCategory] = useState("");
//   const [price, setPrice] = useState("");
//   const [description, setDescription] = useState("");
//   const [submitting, setSubmitting] = useState(false);
//   const [image, setImage] = useState(null);

//   const { user } = userAuth();

//   const handelimageUplad = (event) => {
//     if (event.target.files) setImage(event.target.files[0]);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!user) {
//       alert("Please Login To Continue");
//       return;
//     }

//     setSubmitting(true);

//     const readImageasurl = (file) => {
//       return new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.onloadend = () => {
//           const imgurl = reader.result;
//           localStorage.setItem(`image_${file.name}`, imgurl);
//           resolve(imgurl);
//         };
//         reader.onerror = reject;
//         reader.readAsDataURL(file);
//       });
//     };
//     let imageurl = "";
//     if (image) {
//       try {
//         imageurl = await readImageasurl(image);
//       } catch (error) {
//         console.log(error);
//         alert("faild to read image");
//         return;
//       }
//     }

//     try {
//       await addDoc(collection(firestore, "products"), {
//         title: title.trim(),
//         category: category.trim(),
//         price: price.toString().trim(),
//         description: description.trim(),
//         imageurl,
//         userId: user.uid,
//         userName: user.displayName || "Anonymous",
//         createdAt: new Date().toISOString(),
//       });

//       const datas = await fetchfromFirestore();
//       setItems(datas);
//       toggleSellmodal();
//     } catch (error) {
//       console.error("Firestore Error:", error);
//       alert("Failed to add item to Firestore");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div>
//       <Modal
//         show={status}
//         size="sm" // ✅ makes the modal small
//         popup={true}
//         onClose={toggleSellmodal}
//         position="center"
//       >
//         <ModalBody
//           className="bg-white rounded-lg max-w-md w-full mx-auto"
//           onClick={(event) => event.stopPropagation()}
//         >
//           <img
//             src={close}
//             alt=""
//             className="w-6 absolute z-10 top-6 right-8 cursor pointer"
//             onClick={() => {
//               toggleSellmodal();
//               setImage(null);
//             }}
//           />
//           <div className="p-6">
//             <p className="font-bold text-lg mb-3">Sell item</p>

//             <form onSubmit={handleSubmit} className="flex flex-col gap-3">
//               <Input placeholder="Title" setInput={setTitle} />
//               <Input placeholder="Category" setInput={setCategory} />
//               <Input placeholder="Price" setInput={setPrice} type="number" />
//               <Input placeholder="Description" setInput={setDescription} />

//               <div className="pt-2 w-full relative">
//                 {image ? (
//                   <div className="relative h-32 w-full flex justify-center border-2 border-black border-solid rounded-md overflow-hidden">
//                     <img
//                       className="object-contain"
//                       src={URL.createObjectURL(image)}
//                       alt=""
//                     />
//                   </div>
//                 ) : (
//                   <div className="relative h-32 w-full border-black border-2 border-solid rounded-md">
//                     <input
//                       type="file"
//                       className="absolute inset-0 h-full w-full opacity-0 cursor-pointer z-30"
//                       onChange={handelimageUplad}
//                     />
//                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
//                       <img className="w-10" src={fileupload} alt="" />
//                       <p className="text-center text-sm pt-2">
//                         Click to upload
//                       </p>
//                       <p className="text-center text-xs">SVG, PNG, JPG</p>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {submitting ? (
//                 <div className="w-full flex h-12 justify-center pt-4">
//                   <img
//                     src={loading}
//                     alt="loading"
//                     className="w-24 object-cover"
//                   />
//                 </div>
//               ) : (
//                 <div className="w-full pt-2">
//                   <button
//                     type="submit"
//                     className="w-full p-3 rounded-lg text-white"
//                     style={{ backgroundColor: "#002f34" }}
//                   >
//                     Sell item
//                   </button>
//                 </div>
//               )}
//             </form>
//           </div>
//         </ModalBody>
//       </Modal>
//     </div>
//   );
// };

// export default Sell;



import { Modal, ModalBody } from "flowbite-react";
import { useState } from "react";
import Input from "../input/Input";
import { userAuth } from "../Context/Auth";
import { addDoc, collection } from "firebase/firestore";
import { fetchfromFirestore, firestore, storage } from "../Firebase/firebase"; // 👈 make sure storage is exported
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import fileupload from "../../assets/fileUpload.svg";
import loading from "../../assets/loading.gif";
import close from "../../assets/close.svg";

const Sell = ({ toggleSellmodal, status, setItems }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [image, setImage] = useState(null);

  const { user } = userAuth();

  const handelimageUplad = (event) => {
    if (event.target.files) setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!user) {
      alert("Please Login To Continue");
      return;
    }

    setSubmitting(true);

    let imageurl = "";
    if (image) {
      try {
        // Create a reference in Firebase Storage
        const storageRef = ref(storage, `products/${Date.now()}_${image.name}`);
        // Upload image
        await uploadBytes(storageRef, image);
        // Get public download URL
        imageurl = await getDownloadURL(storageRef);
      } catch (error) {
        console.error("Image upload failed", error);
        alert("Failed to upload image");
        setSubmitting(false);
        return;
      }
    }

    try {
      await addDoc(collection(firestore, "products"), {
        title: title.trim(),
        category: category.trim(),
        price: price.toString().trim(),
        description: description.trim(),
        imageurl,
        userId: user.uid,
        userName: user.displayName || "Anonymous",
        createdAt: new Date().toISOString(),
      });

      const datas = await fetchfromFirestore();
      setItems(datas);
      toggleSellmodal();
      setImage(null); // reset image
    } catch (error) {
      console.error("Firestore Error:", error);
      alert("Failed to add item to Firestore");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Modal
        show={status}
        size="sm"
        popup={true}
        onClose={toggleSellmodal}
        position="center"
      >
        <ModalBody
          className="bg-white rounded-lg max-w-md w-full mx-auto"
          onClick={(event) => event.stopPropagation()}
        >
          <img
            src={close}
            alt=""
            className="w-6 absolute z-10 top-6 right-8 cursor-pointer"
            onClick={() => {
              toggleSellmodal();
              setImage(null);
            }}
          />
          <div className="p-6">
            <p className="font-bold text-lg mb-3">Sell item</p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <Input placeholder="Title" setInput={setTitle} />
              <Input placeholder="Category" setInput={setCategory} />
              <Input placeholder="Price" setInput={setPrice} type="number" />
              <Input placeholder="Description" setInput={setDescription} />

              <div className="pt-2 w-full relative">
                {image ? (
                  <div className="relative h-32 w-full flex justify-center border-2 border-black border-solid rounded-md overflow-hidden">
                    <img
                      className="object-contain"
                      src={URL.createObjectURL(image)}
                      alt=""
                    />
                  </div>
                ) : (
                  <div className="relative h-32 w-full border-black border-2 border-solid rounded-md">
                    <input
                      type="file"
                      className="absolute inset-0 h-full w-full opacity-0 cursor-pointer z-30"
                      onChange={handelimageUplad}
                    />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                      <img className="w-10" src={fileupload} alt="" />
                      <p className="text-center text-sm pt-2">Click to upload</p>
                      <p className="text-center text-xs">SVG, PNG, JPG</p>
                    </div>
                  </div>
                )}
              </div>

              {submitting ? (
                <div className="w-full flex h-12 justify-center pt-4">
                  <img src={loading} alt="loading" className="w-24 object-cover" />
                </div>
              ) : (
                <div className="w-full pt-2">
                  <button
                    type="submit"
                    className="w-full p-3 rounded-lg text-white"
                    style={{ backgroundColor: "#002f34" }}
                  >
                    Sell item
                  </button>
                </div>
              )}
            </form>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Sell;
