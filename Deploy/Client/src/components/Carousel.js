import React, { useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';
import Briyani from '../assets/Briyani.jpg'
import Softdrinks from '../assets/Softdrink.jpg'
import Noodles from '../assets/Noodles.jpg'
import Icecream from '../assets/Icecream.jpg'
import Friedrice from '../assets/Friedrice.jpg'

function Carousel() {
  const slides = [
    { url: Briyani },
    { url: Icecream },
    { url: Noodles },
    { url: Softdrinks },
    { url: Friedrice }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="max-w-[1440px] h-[680px] w-full m-auto pt-6 pb-16 px-4 relative group">
      <div
        style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
        className="w-full h-full rounded-2xl bg-center bg-cover duration-500"
      >
        <div
          className="hidden group-hover:block absolute top-[50%] bg-black/20 -translate-x-0 -translate-y-[-50%] left-5 text-2xl rounded-full p-2 text-white cursor-pointer"
          onClick={prevSlide}
        >
          <BsChevronCompactLeft size={30} />
        </div>
        <div
          className="hidden group-hover:block absolute top-[50%] bg-black/20 -translate-x-0 -translate-y-[-50%] right-5 text-2xl rounded-full p-2 text-white cursor-pointer"
          onClick={nextSlide}
        >
          <BsChevronCompactRight size={30} />
        </div>
      </div>
      <div className="flex justify-center py-2 top-4">
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={`text-2xl cursor-pointer ${currentIndex === slideIndex ? 'text-black' : 'text-gray-400'}`}
          >
            <RxDotFilled />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Carousel;
