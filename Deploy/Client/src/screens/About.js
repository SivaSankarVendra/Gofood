import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AboutPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="bg-black/85 flex-grow">
        <div className="container mx-auto px-4 py-8 text-white font-poppins">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">About GoFood</h1>
          <p className="mb-6 text-lg md:text-xl lg:text-2xl">
            GoFood is a leading food delivery platform that connects customers with a wide range of restaurants and eateries. Our mission is to provide convenient and reliable food delivery services while supporting local businesses and promoting diverse culinary experiences.
          </p>
          <p className="mb-6 text-lg md:text-xl lg:text-2xl">
            Whether you're craving your favorite comfort food, exploring new cuisines, or looking for quick and healthy options, GoFood has you covered. Our user-friendly app makes ordering food effortless, with options for delivery or pickup to suit your preferences.
          </p>
          <p className="mb-6 text-lg md:text-xl lg:text-2xl">
            At GoFood, we prioritize customer satisfaction, quality, and affordability. We work closely with our restaurant partners to ensure that every meal delivered to your doorstep is fresh, delicious, and prepared with care.
          </p>
          <p className="mb-6 text-lg md:text-xl lg:text-2xl">
            Thank you for choosing GoFood for your food delivery needs. We're committed to serving you the best food experiences, one order at a time.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;
