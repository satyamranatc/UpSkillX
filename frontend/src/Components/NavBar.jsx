import React, { useState, useEffect } from 'react';
import { Search, LogIn, UserCircle, Bell, Menu } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState("");
  const [notifications, setNotifications] = useState(3);
  
  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      let userData = localStorage.getItem('user');
      setUserData(JSON.parse(userData));
    }
  }, []);

  return (
    <nav className="bg-white border-b border-gray-100 px-6 py-4 sticky top-0 z-30">
      <div className="flex justify-between items-center">
        {/* Left side - Only visible on mobile for menu toggle */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-1 rounded text-gray-500 hover:bg-gray-100"
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Center - Search Bar */}
        <div className="relative max-w-md w-full mx-auto md:mx-0">
          <input
            type="text"
            placeholder="Search courses, topics, instructors..."
            className="w-full py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <Search 
            size={18} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
          />
        </div>

        {/* Right side - Auth/User Section */}
        <div className="hidden md:flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              {/* Notifications */}
              <div className="relative">
                <button className="p-2 rounded-full hover:bg-gray-100 text-gray-600">
                  <Bell size={20} />
                  {notifications > 0 && (
                    <span className="absolute top-0 right-0 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {notifications}
                    </span>
                  )}
                </button>
              </div>

              {/* User Menu */}
              <div className="flex items-center space-x-2">
                <UserCircle size={32} className="text-gray-600" />
                <div className="hidden lg:block">
                  <p className="text-sm font-medium text-gray-700">{userData.name}</p>
                  <p className="text-xs text-gray-500">Premium Member</p>
                  <button onClick={()=>{
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    setIsLoggedIn(false);
                    navigate('/');
                  }} >Log out</button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => navigate('/login')} 
                className="px-4 py-2 rounded-lg text-indigo-600 hover:bg-indigo-50 transition-colors flex items-center"
              >
                <LogIn size={18} className="mr-2" />
                Log In
              </button>
              <button 
                onClick={() => navigate('/signup')} 
                className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>

        {/* Mobile User Icon (when logged in) or Login Button */}
        <div className="md:hidden">
          {isLoggedIn ? (
            <button className="p-1">
              <UserCircle size={28} className="text-gray-600" />
            </button>
          ) : (
            <button 
              onClick={() => navigate('/login')} 
              className="p-1 rounded text-indigo-600"
            >
              <LogIn size={24} />
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden pt-4 pb-3 border-t mt-3">
          {isLoggedIn ? (
            <div className="flex items-center space-x-3 px-4 py-2 mb-3">
              <UserCircle size={36} className="text-gray-600" />
              <div>
                <p className="font-medium text-gray-800">{userData.name}</p>
                <p className="text-sm text-gray-500">Premium Member</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col space-y-2 px-4">
              <button 
                onClick={() => navigate('/login')} 
                className="px-4 py-2 rounded-lg border border-indigo-600 text-indigo-600 flex items-center justify-center"
              >
                <LogIn size={18} className="mr-2" />
                Log In
              </button>
              <button 
                onClick={() => navigate('/signup')} 
                className="px-4 py-2 rounded-lg bg-indigo-600 text-white"
              >
                Sign Up
              </button>
            </div>
          )}
          
          {/* Mobile Notifications */}
          {isLoggedIn && (
            <div className="mt-4 px-4 py-2 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-700">Notifications</span>
                {notifications > 0 && (
                  <span className="bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}