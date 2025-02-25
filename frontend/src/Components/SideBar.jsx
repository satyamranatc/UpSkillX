import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  BookOpen, 
  Coffee, 
  Mail, 
  Info,
  Menu,
  X
} from 'lucide-react';

const SideBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const menuItems = [
    { title: 'Home', path: '/', icon: <Home size={20} /> },
    { title: 'Courses', path: '/courses', icon: <BookOpen size={20} /> },
    { title: 'Donuts', path: '/donuts', icon: <Coffee size={20} /> },
    { title: 'Contact', path: '/contact', icon: <Mail size={20} /> },
    { title: 'About', path: '/about', icon: <Info size={20} /> },
  ];

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      {/* Mobile menu button */}
      <button 
        className="fixed top-4 left-4 z-50 md:hidden bg-white p-2 rounded-full shadow-md"
        onClick={toggleSidebar}
      >
        {isCollapsed ? <Menu size={20} /> : <X size={20} />}
      </button>

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-screen bg-gray-800 text-white transition-all duration-300 z-40
        ${isCollapsed ? 'w-0 md:w-16 overflow-hidden' : 'w-64'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo area */}
          <div className="flex items-center justify-center h-20 bg-gray-900">
            <h1 className={`text-xl font-bold ${isCollapsed ? 'hidden md:hidden' : 'block'}`}>LearnPro</h1>
            <span className={`text-xl font-bold ${isCollapsed ? 'hidden md:block' : 'hidden'}`}>LP</span>
          </div>

          {/* Navigation menu */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-2 px-2">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.title}>
                    <Link
                      to={item.path}
                      className={`
                        flex items-center py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors
                        ${isActive ? 'bg-blue-600 text-white' : ''}
                      `}
                    >
                      <span className="mr-3">{item.icon}</span>
                      <span className={isCollapsed ? 'hidden md:hidden' : 'block'}>{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Toggle button for larger screens */}
          <div className="hidden md:flex justify-center p-4 border-t border-gray-700">
            <button 
              onClick={toggleSidebar}
              className="p-2 rounded-full hover:bg-gray-700 transition-colors"
            >
              {isCollapsed ? <Menu size={20} /> : <X size={20} />}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;