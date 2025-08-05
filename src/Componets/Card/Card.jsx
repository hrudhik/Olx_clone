
// const Card=({items})=>{
//     return (
//         <div className="p-10 px-5 sm:px-15 md:">
//             <h1 style={{color:'#002f34'}} className="text-2xl">Fresh recomandations</h1>
//             <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-5">
//                 {items.map((item)=>{
//                     <div key={item.id}
//                     style={{borderWidth:'1px' , borderColor:'lightgray'}}
//                     className="relative w-full h-72 rounded-md border-solid bg-gray-50 overflow-hidden cursor-pointer">
//                         <div className="details p-1 pl-4 pr-4">
//                             <h1 style={{color:'#002f34'}} className="font-bold text-xl">₹{item.price}</h1>
//                             <p className="text-sm pt-2">{item.category}</p>
//                             <p className="pt-2">{item.title}</p>
//                         </div>
//                     </div>
//                 })}
//             </div>
//         </div>
//     )
// }

// export default Card

const Card = ({ items }) => {
  return (
    <div className="p-10 px-5 sm:px-15">
      <h1 style={{ color: "#002f34" }} className="text-2xl">
        Fresh recommendations
      </h1>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-5">
        {items.map((item) =>{
          return <div
            key={item.id}
            style={{ borderWidth: "1px", borderColor: "lightgray" }}
            className="relative w-full h-72 rounded-md border-solid bg-gray-50 overflow-hidden cursor-pointer"
          >
            <div className="details p-1 pl-4 pr-4">
              <h1 style={{ color: "#002f34" }} className="font-bold text-xl">
                ₹{item.price}
              </h1>
              <p className="text-sm pt-2">{item.category}</p>
              <p className="pt-2">{item.title}</p>
            </div>
          </div>
})}
      </div>
    </div>
  );
};

export default Card;
