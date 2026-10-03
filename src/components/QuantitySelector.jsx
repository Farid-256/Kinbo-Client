// 'use client'

// import { useState } from 'react'

// export const QuantitySelector = () => {
//     const [quantity, setQuantity] = useState(1)

//     const handleMinus = () => {
//         if( quantity > 1){
//             setQuantity(quantity - 1)
//         }
//     }

//     const handlePlus = () => {
//         setQuantity(quantity + 1)
//     }

//     return (
//         <div className="flex items-center gap-4">
//             <span className="text-sm font-medium text-gray-700">Quantity:</span>
//             <div className="flex items-center border border-gray-300 rounded-lg">
//                 <button onClick={handleMinus} className="px-4 py-2 text-gray-600 hover:bg-gray-50 cursor-pointer">
//                     -
//                 </button>

//                 <span className="px-5 py-2 border-x border-gray-300 font-semibold">
//                     {quantity}
//                 </span>


//                 <button onClick={handlePlus} className="px-4 py-2 text-gray-600 hover:bg-gray-50 cursor-pointer">
//                     +
//                 </button>
//             </div>
//         </div>
//     )
// }

// export default QuantitySelector