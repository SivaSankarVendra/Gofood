import React, { useEffect, useRef, useState } from "react";
import star from "../assets/star.svg";
import starhalf from "../assets/star-half-fill.svg";
import nostar from "../assets/star-no-fill.svg";
import { useCart, useDispatch } from "./ContentReducer";

const Card = (props) => {
  const priceRef = useRef();
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");
  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const dispatch = useDispatch();
  const stateData = useCart();

  const handleWishlist = async () => {
    let food = {};
    for (const item of stateData) {
      if (item._id === props.filterItems._id) {
        food = item;
        break;
      }
    }
    if (Object.keys(food).length > 0) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          _id: props.filterItems._id,
          price: finalPrice,
          quantity: quantity,
        });
        return;
      } else if (food.size !== size) {
        await dispatch({
          type: "ADD",
          _id: props.filterItems._id,
          name: props.filterItems.name,
          price: finalPrice,
          quantity: quantity,
          size: size,
        });
        return;
      }
      return;
    }
    await dispatch({
      type: "ADD",
      _id: props.filterItems._id,
      name: props.filterItems.name,
      price: finalPrice,
      quantity: quantity,
      size: size,
    });
  };

  let finalPrice = quantity * parseInt(props.options[size]);
  let priceOptions = Object.keys(props.options);


  return (
    <div className="relative max-w-xs mx-auto rounded-lg overflow-hidden shadow-lg my-4 text-white border-[0.5px] border-white/15">
      <img
        className="w-72 h-48 object-cover object-center relative cursor-pointer"
        src={props.filterItems.img}
        alt="img"
      />

      <div className="p-4">
        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          {props.filterItems.tags.map((badge, index) => (
            <span
              key={index}
              className="px-2 py-1 rounded-full text-xs bg-gray-600"
            >
              {badge}
            </span>
          ))}
        </div>
        {/* Product Title */}
        <h2 className="text-lg font-semibold mt-2">{props.filterItems.name}</h2>
        {/* Price */}
        <div className="flex items-center mt-1">
          <span className="text-lg font-bold">${finalPrice}</span>
        </div>
        {/* Quantity Selector */}
        <div className="flex items-center justify-between mt-3">
          <select
            className="px-3 py-1 border border-gray-300 rounded-md bg-white/80 text-sm text-gray-700 cursor-pointer"
            onChange={(e) => {
              setSize(e.target.value);
            }}
            ref={priceRef}
          >
            {priceOptions.map((val) => {
              return (
                <option key={val} value={val}>
                  {val}
                </option>
              );
            })}
          </select>
          <div className="flex items-center gap-2">
            <button
              onClick={decreaseQuantity}
              className="bg-gray-600 px-2 py-1 rounded-md text-sm"
            >
              -
            </button>
            <span className="px-2 py-1 text-sm">{quantity}</span>
            <button
              onClick={increaseQuantity}
              className="bg-gray-600 px-2 py-1 rounded-md text-sm"
            >
              +
            </button>
          </div>
        </div>
        {/* Ratings */}
        <div className="flex items-center mt-3">
          {[...Array(5)].map((_, index) => (
            <img
              key={index}
              src={index < 3 ? star : index === 3 ? starhalf : nostar}
              alt="star"
              className="w-4 h-4 mr-1"
            />
          ))}
          <span className="text-xs text-gray-500">{"reviews"} reviews</span>
        </div>
        {/* Action Buttons */}
        <div className="flex mt-3 gap-2">
          <button className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-md text-sm font-medium text-white">
            Order Now
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-md text-sm font-medium text-gray-700"
            onClick={handleWishlist}
          >
            Wishlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
