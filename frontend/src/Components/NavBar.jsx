import React, { useState } from 'react';
import { Search, LogIn, Menu } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-md px-4 py-3 sticky top-0 z-30">
      <div className="container mx-auto flex justify-between items-center">
        {/* Brand */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-blue-600">UpSkillX</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6 flex-1 justify-end">
          {/* Search Bar */}
          <div className="relative max-w-md w-full mx-6">
            <input
              type="text"
              placeholder="Search courses..."
              className="w-full py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search 
              size={18} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
            />
          </div>

          {/* Login Section */}
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => navigate('/login')} 
              className="px-4 py-2 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors flex items-center"
            >
              <LogIn size={18} className="mr-2" />
              Log In
            </button>
            <button 
              onClick={() => navigate('/signup')} 
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden pt-4 pb-3 border-t mt-3">
          <div className="relative px-4 mb-4">
            <input
              type="text"
              placeholder="Search courses..."
              className="w-full py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search 
              size={18} 
              className="absolute left-7 top-1/2 transform -translate-y-1/2 text-gray-400" 
            />
          </div>
          <div className="flex flex-col space-y-2 px-4">
            <button 
              onClick={() => navigate('/login')} 
              className="px-4 py-2 rounded-lg border border-blue-600 text-blue-600 flex items-center justify-center"
            >
              <LogIn size={18} className="mr-2" />
              Log In
            </button>
            <button 
              onClick={() => navigate('/signup')} 
              className="px-4 py-2 rounded-lg bg-blue-600 text-white"
            >
              Sign Up
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}