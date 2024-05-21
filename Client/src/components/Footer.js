import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center text-white">
        <p>&copy; 2024 GoFood</p>
        <div className="flex gap-4">
          <Link to="/" className="hover:text-gray-500">Terms of Service</Link>
          <Link to="/" className="hover:text-gray-500">Privacy Policy</Link>
          {/* Add social media links */}
          <Link to="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-500 text-lg">
          <i className="fa-brands fa-facebook"></i>
          </Link>
          <Link to="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-500 text-xl">
          <i className="fa-brands fa-instagram"></i>
          </Link>
          <Link  to="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="hover:text-gray-500 text-xl">
          <i className="fa-brands fa-whatsapp"></i>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
