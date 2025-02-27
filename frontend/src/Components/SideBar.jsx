import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  BookOpen, 
  Coffee, 
  Mail, 
  Info,
  ChevronLeft,
  ChevronRight
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
    <div className={`
      h-full bg-white border-r border-gray-200 transition-all duration-300 ease-in-out
      ${isCollapsed ? 'w-20' : 'w-64'}
    `}>
      <div className="flex flex-col h-full">
        {/* Logo area */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-100">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
              LP
            </div>
            {!isCollapsed && (
              <h1 className="ml-3 text-lg font-semibold text-gray-800">LearnPro</h1>
            )}
          </div>
          
          {/* Toggle button integrated into header */}
          <button 
            onClick={toggleSidebar}
            className="p-1 rounded text-gray-500 hover:bg-gray-100 focus:outline-none"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        {/* Navigation menu */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.title}>
                  <Link
                    to={item.path}
                    className={`
                      flex items-center py-2 px-3 rounded-lg transition-colors
                      ${isActive 
                        ? 'bg-indigo-50 text-indigo-700 font-medium' 
                        : 'text-gray-700 hover:bg-gray-100'}
                      ${isCollapsed ? 'justify-center' : ''}
                    `}
                    title={isCollapsed ? item.title : ""}
                  >
                    <span className={`${isActive ? 'text-indigo-600' : 'text-gray-500'}`}>
                      {item.icon}
                    </span>
                    {!isCollapsed && (
                      <span className="ml-3">{item.title}</span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer area */}
        <div className="p-4 border-t border-gray-100">
          <div className={`flex ${isCollapsed ? 'justify-center' : 'items-center'}`}>
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-sm font-medium text-gray-700">US</span>
            </div>
            {!isCollapsed && (
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">User Settings</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;