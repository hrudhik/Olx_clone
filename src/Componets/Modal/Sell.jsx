import { Modal, ModalBody } from "flowbite-react";
import { useState } from "react";
import Input from "../input/Input";
import { userAuth } from "../Context/Auth";
import { addDoc, collection } from "firebase/firestore";
import { fetchfromFirestore, firestore } from "../Firebase/firebase";
import fileupload from "../../assets/fileUpload.svg";
import loading from "../../assets/loading.gif";

const Sell = ({ toggleSellmodal, status, setItems }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [image, setImage] = useState(null);

  const { user } = userAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!user) {
      alert("Please Login To Continue");
      return;
    }

    setSubmitting(true);

    try {
      await addDoc(collection(firestore, "products"), {
        title: title.trim(),
        category: category.trim(),
        price: price.toString().trim(),
        description: description.trim(),
        userId: user.uid,
        userName: user.displayName || "Anonymous",
        createdAt: new Date().toISOString(),
      });

      const datas = await fetchfromFirestore();
      setItems(datas);
      toggleSellmodal();
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
        theme={{
          content: {
            base: "relative w-full p-4 md:h-auto",
            inner:
              "relative flux max-h-[900vh] flex-col rounded-lg bg-white shadow dark:bg-gray-700",
          },
        }}
        onClick={toggleSellmodal}
        show={status}
        className="bg-black"
        position="center"
        size="md"
        popup={true}
      >
        <ModalBody
          className="bg-white h-auto p-0 rounded-md"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="p-6 pl-8 pr-8 pb-8">
            <p className="font-bold text-lg mb-3">Sell item</p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <Input placeholder="Title" setInput={setTitle} />
              <Input placeholder="Category" setInput={setCategory} />
              <Input placeholder="Price" setInput={setPrice} type="number" />
              <Input placeholder="Description" setInput={setDescription} />

              <div className="pt-2 w-full relative">
                {image ? (
                  <div className="relative h-40 sm:h-60 w-full flex justify-center border-2 border-black border-solid rounded-md overflow-hidden">
                    <img
                      className="object-contain"
                      src={URL.createObjectURL(image)}
                      alt=""
                    />
                  </div>
                ) : (
                  <div className="relative h-40 w-full sm:h-60 border-black border-2 border-solid rounded-md">
                    <input
                      type="file"
                      className="absolute inset-0 h-full w-full opacity-0 cursor-pointer z-30"
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                    <div className="absolute top-[50%] left-[50%] translate-x-[-50%] flex flex-col items-center">
                      <img className="w-12" src={fileupload} alt="" />
                      <p className="text-center text-sm pt-2">
                        Click to upload image
                      </p>
                      <p className="text-center text-sm pt-2">SVG, PNG, JPG</p>
                    </div>
                  </div>
                )}
              </div>

              {submitting ? (
                <div className="w-full flex h-14 justify-center pt-4 pb-2">
                  <img src={loading} alt="loading" className="w-32 object-cover" />
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
