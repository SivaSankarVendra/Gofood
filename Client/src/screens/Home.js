import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Footer from '../components/Footer';
import Carousel from '../components/Carousel';
import { AiOutlineClose } from 'react-icons/ai';

const Home = () => {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let data = await response.json();
    setFoodItem(data.foodItems);
    setFoodCat(data.foodCategory);
  }

  useEffect(() => {
    loadData();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const filteredFoodItems = foodItem.filter(item => 
    item.name.toLowerCase().includes(searchQuery)
  );

  return (
    <div>
      <Navbar />
      <div className='bg-black/85'>
        <Carousel />
        <div className='p-4'>
          <div className="relative w-full md:w-1/2 lg:w-1/3 mx-auto">
            <input 
              type="text" 
              placeholder='Filter by dish name' 
              className='outline-none p-2 pl-3 pr-10 border rounded w-full text-white border-gray-500 bg-gray-700/70' 
              value={searchQuery}
              onChange={handleSearch}
            />
            {searchQuery && (
              <button 
                className="absolute inset-y-0 right-0 flex items-center justify-center p-2 rounded-r-md"
                onClick={clearSearch}
              >
                <AiOutlineClose size={18} className="text-gray-200" />
              </button>
            )}
          </div>
        </div>
        <div className='px-14'>
          {foodCat.length > 0 && foodCat.map((category) => (
            <div className='p-4' key={category._id}>
              <div className='text-3xl font-semibold mb-4 text-white'>
                {category.CategoryName}
                <hr className='mb-4 border-white/25' />
              </div>
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {filteredFoodItems.filter(item => item.CategoryName === category.CategoryName).map((item) => (
                  <Card 
                    key={item._id}
                    filterItems={item}
                    options={item.options[0]}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default Home;
