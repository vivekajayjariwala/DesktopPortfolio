import { useState, useEffect } from 'react';

const ContentWindow = ({ isOpen, onClose, title, children }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (isOpen) {
      // Center the window on open
      const windowWidth = 400; // Set your desired width
      const windowHeight = 300; // Set your desired height
      setPosition({
        x: window.innerWidth / 2 - windowWidth / 2,
        y: window.innerHeight / 2 - windowHeight / 2,
      });
    }
  }, [isOpen]);

  const handleMouseDown = (e) => {
    if (e.target.closest('.window-header')) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;

      // Constrain dragging within the viewport
      const constrainedX = Math.max(0, Math.min(newX, window.innerWidth - 400)); // 400 is the width of the window
      const constrainedY = Math.max(0, Math.min(newY, window.innerHeight - 300)); // 300 is the height of the window

      setPosition({
        x: constrainedX,
        y: constrainedY
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed w-[90%] max-w-[400px] bg-gray-300 border-t border-l border-white border-r-2 border-b-2 border-r-gray-800 border-b-gray-800 shadow-lg font-['Archivo']"
      style={{
        left: position.x,
        top: position.y,
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Window Header */}
      <div className="window-header h-8 bg-gradient-to-r from-blue-800 to-blue-600 flex items-center justify-between px-2 cursor-move">
        <span className="text-white font-bold">{title}</span>
        <button 
          onClick={onClose}
          className="text-white hover:bg-red-600 px-2 font-bold"
        >
          ✕
        </button>
      </div>

      {/* Window Content */}
      <div className="p-4 text-sm">
        {children}
      </div>
    </div>
  );
};

export default ContentWindow; 