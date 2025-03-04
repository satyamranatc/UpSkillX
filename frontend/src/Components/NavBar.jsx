import React, { useState, useEffect } from 'react';
import { Search, LogIn, UserCircle, Bell, Menu, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [notifications, setNotifications] = useState(3);
  
  const navigate = useNavigate();

  useEffect(() => {
    // Check for token and user data on component mount
    const checkAuth = () => {
      let token = localStorage.getItem('token');
      let storedUserData = localStorage.getItem('user');
      
      if (token && storedUserData) {
        try {
          const parsedUserData = JSON.parse(storedUserData);
          setIsLoggedIn(true);
          setUserData(parsedUserData);
        } catch (error) {
          console.error("Failed to parse user data:", error);
          handleLogout();
        }
      }
    };
    
    checkAuth();
    
    // Listen for storage events (in case another tab logs the user out)
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUserData(null);
    navigate('/');
  };

  return (
    <nav className="bg-white border-b border-gray-100 px-4 sm:px-6 py-4 sticky top-0 z-30 shadow-sm">
      <div className="flex justify-between items-center">
        {/* Left side - Logo and Mobile Menu Toggle */}
        <div className="flex items-center">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-1 rounded text-gray-500 hover:bg-gray-100 md:hidden mr-3"
          >
            <Menu size={24} />
          </button>
          
          <Link to="/" className="text-xl font-bold text-indigo-600">
            LearnHub
          </Link>
        </div>

        {/* Center - Search Bar */}
        <div className="relative max-w-md w-full mx-4 hidden sm:block">
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
          {isLoggedIn && userData ? (
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
              <div className="flex items-center space-x-3 group relative">
                <div className="h-8 w-8 rounded-full overflow-hidden bg-gray-200">
                  {userData.profilePicture ? (
                    <img 
                      src={userData.profilePicture} 
                      alt={userData.name}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.target.src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(userData.name);
                      }}
                    />
                  ) : (
                    <UserCircle size={32} className="text-gray-600" />
                  )}
                </div>
                <div className="hidden lg:block">
                  <p className="text-sm font-medium text-gray-700">{userData.name}</p>
                  <p className="text-xs text-gray-500">{userData.role === "user" ? "Member" : "Administrator"}</p>
                </div>
                
                {/* Dropdown Menu */}
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg hidden group-hover:block py-1 z-50">
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Profile
                  </Link>
                  <Link to="/my-courses" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    My Courses
                  </Link>
                  <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Settings
                  </Link>
                  <div className="border-t border-gray-100 my-1"></div>
                  <button 
                    onClick={handleLogout} 
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 font-medium"
                  >
                    Log out
                  </button>
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
        <div className="md:hidden flex items-center">
          {/* Mobile search button */}
          <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100 mr-1">
            <Search size={20} />
          </button>
          
          {isLoggedIn && userData ? (
            <div className="h-8 w-8 rounded-full overflow-hidden bg-gray-200">
              {userData.profilePicture ? (
                <img 
                  src={userData.profilePicture} 
                  alt={userData.name}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.target.src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(userData.name);
                  }}
                />
              ) : (
                <UserCircle size={28} className="text-gray-600" />
              )}
            </div>
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
          {/* Mobile Search (only shown in menu when mobile) */}
          <div className="px-4 pb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none"
              />
              <Search 
                size={18} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
              />
            </div>
          </div>
          
          {isLoggedIn && userData ? (
            <>
              <div className="flex items-center space-x-3 px-4 py-2 mb-3">
                <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-200">
                  {userData.profilePicture ? (
                    <img 
                      src={userData.profilePicture} 
                      alt={userData.name}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.target.src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(userData.name);
                      }}
                    />
                  ) : (
                    <UserCircle size={40} className="text-gray-600" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-800">{userData.name}</p>
                  <p className="text-sm text-gray-500">{userData.role === "user" ? "Member" : "Administrator"}</p>
                </div>
              </div>
              
              {/* Mobile menu links */}
              <div className="border-t border-gray-100">
                <Link to="/profile" className="block px-4 py-3 text-gray-700 hover:bg-gray-100">
                  Profile
                </Link>
                <Link to="/my-courses" className="block px-4 py-3 text-gray-700 hover:bg-gray-100">
                  My Courses
                </Link>
                <Link to="/settings" className="block px-4 py-3 text-gray-700 hover:bg-gray-100">
                  Settings
                </Link>
                
                {/* Mobile Notifications */}
                <div className="px-4 py-3 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Bell size={20} className="text-gray-500 mr-3" />
                      <span className="font-medium text-gray-700">Notifications</span>
                    </div>
                    {notifications > 0 && (
                      <span className="bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {notifications}
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Logout button */}
                <div className="border-t border-gray-100 mt-2">
                  <button 
                    onClick={handleLogout} 
                    className="flex items-center px-4 py-3 text-red-600 hover:bg-gray-100 w-full"
                  >
                    <LogOut size={20} className="mr-3" />
                    <span className="font-medium">Log out</span>
                  </button>
                </div>
              </div>
            </>
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
        </div>
      )}
    </nav>
  );
}