import React from 'react'
import { useCart, useDispatch } from '../components/ContentReducer'

const Wishlist = () => {
    let data=useCart()
    let dispatch=useDispatch()
    if(data.length===0){
        return(
            <div>
                <div className='m-5 p-5 text-center text-2xl'>Your Wishlist is Empty</div>
            </div>
        )
    }
    let totalPrice=data.reduce((total,food)=>total=total+food.price,0)

    const handleCheckout=async()=>{
      let userEmail=localStorage.getItem('email')
      let response=await fetch("https://gofood-16d6.onrender.com/api/orderData",{
        method:"POST",
        headers: { "Content-Type": "application/json" },
        body:JSON.stringify({
          order_data:data,
          email:userEmail,
          order_date:new Date().toDateString()
        })
      })
      console.log(response)
      if(response.status===200){
        dispatch({type:"DROP"})
      }
    }
  return (
    <div className="text-center justify-center m-5">
      <div className='m-4 text-3xl font-poppins font-bold'>My Wishlist</div>
            <table className="table-auto w-full border-collapse border border-gray-200 mx-2">
                <thead>
                    <tr>
                        <th className="border border-gray-200 p-2">S.No</th>
                        <th className="border border-gray-200 p-2">Name</th>
                        <th className="border border-gray-200 p-2">Quantity</th>
                        <th className="border border-gray-200 p-2">Option</th>
                        <th className="border border-gray-200 p-2">Price</th>
                        <th className="border border-gray-200 p-2"></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((food, index) => (
                        <tr key={index} className="border border-gray-200">
                            <td className="border border-gray-200 p-2">{index + 1}</td>
                            <td className="border border-gray-200 p-2">{food.name}</td>
                            <td className="border border-gray-200 p-2">{food.quantity}</td>
                            <td className="border border-gray-200 p-2">{food.size}</td>
                            <td className="border border-gray-200 p-2">{food.price.toFixed(2)} /-</td>
                            <td className="border border-gray-200 p-2">
                                <button 
                                    onClick={() => {dispatch({type:'REMOVE',index:index})}} 
                                    className="text-red-600 hover:text-red-600"
                                >
                                    <i className="fa-regular fa-trash-can"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="text-right m-5">
                <strong>Total Price: {totalPrice} /-</strong>
            </div>
            <div className='text-left'><button className="bg-white block md:inline my-2 text-green-700 font-Poppins font-semibold duration-500 px-6 py-2 mx-1 lg:mx-2 rounded-md hover:bg-gray-200 hover:text-black" onClick={handleCheckout}>Check out</button></div>
        </div>
  )
}

export default Wishlist