import React, { useState, useEffect } from 'react';

const StartMenu = ({ isOpen, onClose }) => {
  const [position, setPosition] = useState({ x: window.innerWidth / 2 - 150, y: window.innerHeight / 2 - 200 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (isOpen) {
      setPosition({
        x: window.innerWidth / 2 - 150, // Center the window
        y: window.innerHeight / 2 - 100,
      });
    }
  }, [isOpen]);

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
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;

      // Constrain dragging within the viewport
      const constrainedX = Math.max(0, Math.min(newX, window.innerWidth - 300)); // 300 is the width of the window
      const constrainedY = Math.max(0, Math.min(newY, window.innerHeight - 200)); // 200 is the height of the window

      setPosition({
        x: constrainedX,
        y: constrainedY,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed w-[90%] max-w-[300px] bg-gray-300 border-t border-l border-white border-r-2 border-b-2 border-r-gray-800 border-b-gray-800 shadow-lg font-['Archivo']"
      style={{
        left: position.x,
        top: position.y,
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
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
