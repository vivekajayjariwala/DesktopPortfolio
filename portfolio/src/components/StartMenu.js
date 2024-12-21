import React, { useState, useEffect } from 'react';

const StartMenu = ({ isOpen, onClose }) => {
  const [position, setPosition] = useState({ x: window.innerWidth / 2 - 300, y: window.innerHeight / 2 - 200 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    if (e.target.closest('.window-header')) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 bg-gray-300 border-t border-l border-white border-r-2 border-b-2 border-r-gray-800 border-b-gray-800 shadow-lg font-['Archivo']"
      style={{
        left: position.x,
        top: position.y,
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Menu Header */}
      <div className="window-header h-8 bg-gradient-to-r from-blue-800 to-blue-600 flex items-center justify-between px-2 cursor-move">
        <span className="text-white font-bold">About This Site</span>
        <button 
          onClick={onClose}
          className="text-white hover:bg-red-600 px-2 font-bold"
        >
          ✕
        </button>
      </div>

      {/* Menu Content */}
      <div className="p-4 text-sm">
        <p className="mb-2">Hi, welcome to my portfolio!</p>
        <p className="mb-2">This is a Windows 98-inspired website showcasing my projects, experience, and interests.</p>
        <p>Feel free to explore by clicking on the desktop icons.</p>
      </div>

      {/* Social Links */}
      <div className="p-4 flex justify-around">
        <a href="https://www.linkedin.com/in/vivek-jariwala/" target="_blank" rel="noopener noreferrer" className="px-3 py-1 bg-gray-300 hover:bg-gray-400 border border-gray-600">
          LinkedIn
        </a>
        <a href="https://github.com/vivekajayjariwala" target="_blank" rel="noopener noreferrer" className="px-3 py-1 bg-gray-300 hover:bg-gray-400 border border-gray-600">
          GitHub
        </a>
      </div>
    </div>
  );
};

export default StartMenu;
