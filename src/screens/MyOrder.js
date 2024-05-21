import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MyOrder = () => {
  const [orderData, setOrderData] = useState("");
  const fetchMyOrder = async () => {
    await fetch("http://localhost:5000/api/myOrders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: localStorage.getItem("email"),
      }),
    }).then(async (res) => {
      let response = await res.json();
      await setOrderData(response);
    });
  };
  useEffect(() => {
    fetchMyOrder();
  }, []);
  return (
    <div className="flex flex-col min-h-screen">
      <div>
        <Navbar />
      </div>
      <div className="bg-black/85">
        {Object.keys(orderData).length > 0 &&
          Array(orderData).map((data) =>
            data.orderData
              ? data.orderData.order_data
                  .slice(0)
                  .reverse()
                  .map((item) =>
                    item.map((arrayData) => (
                      <div key={arrayData._id} className="text-white m-6 text-xl font-poppins">
                        {arrayData.Order_date ? (
                          <div>
                            {(data = arrayData.Order_date)}
                            <hr />
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-lg font-readex-Pro">
                            <div className="w-full sm:w-72 m-5 rounded-lg overflow-hidden shadow-lg bg-gray-800 text-white">
                              <div className="p-6 flex flex-col justify-between h-full">
                                <div>
                                  <div className="text-lg font-semibold mb-2">
                                    Dish Name: {arrayData.name}
                                  </div>
                                  <div className="mb-2">Quantity: {arrayData.quantity}</div>
                                  <div className="mb-2">Size: {arrayData.size}</div>
                                </div>
                                <div className="flex justify-between items-center mt-4">
                                  <div className="text-xl font-semibold">
                                    Price: {arrayData.price}/-
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))
                  )
              : null
          )}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
  
};

export default MyOrder;
