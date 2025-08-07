
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
//                               <p className="text-sm pt-2">{item.category}</p>
//                             <p className="pt-2">{item.title}</p>
//                         </div>
//                     </div>
//                 })}
//             </div>
//         </div>
//     )
// }

// export default Card

import favorite from '../../assets/favorite.svg'
const Card = ({ items }) => {
  return (
    <div className="p-10 px-5 sm:px-15">
      <h1 style={{ color: "#002f34" }} className="text-2xl">
        Fresh recommendations
      </h1>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-5">
        {items.map((item) =>{
          <Link to={'/details'} state={{item}} key={item.id} styke={{borderWidth:'1px',borderColor:"lightgray"}} >
           <div
            key={item.id}
            style={{ borderWidth: "1px", borderColor: "lightgray" }}
            className="relative w-full h-72 rounded-md border-solid bg-gray-50 overflow-hidden cursor-pointer"
          >

          <div className="w-full flex justify-center p-2 overflow-hidden">
                <img className="h-36 object-contain"
                src={item.imageurl || 'httpS://via.placeholder.com/150'} alt={item.title} />
          </div>

            <div className="details p-1 pl-4 pr-4">
              <h1 style={{ color: "#002f34" }} className="font-bold text-xl">
                ₹{item.price}
              </h1>
              <p className="text-sm pt-2">{item.category}</p>
              <p className="pt-2">{item.title}</p>

                <div className="absolute flex justify-center items-center p-2 bg-white rounded-full top-3 right-3 cursor-pointer" > 
                    <img className='w-5' src={favorite} alt="" />
                </div>


            </div>
          </div>
          </Link>
          
})}
      </div>
    </div>
  );
};

export default Card;
