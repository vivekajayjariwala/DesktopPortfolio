import React, { useRef, useState, useEffect } from 'react';

const ProjectPopup = ({ project, onClose }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const popupRef = useRef(null);

  useEffect(() => {
    if (project) {
      // Center the window on open
      const windowWidth = 400; // Set your desired width
      const windowHeight = 300; // Set your desired height
      setPosition({
        x: window.innerWidth / 2 - windowWidth / 2,
        y: window.innerHeight / 2 - windowHeight / 2,
      });
    }
  }, [project]);

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
      const constrainedX = Math.max(0, Math.min(newX, window.innerWidth - 400)); // 400 is the width of the popup
      const constrainedY = Math.max(0, Math.min(newY, window.innerHeight - 300)); // 300 is the height of the popup

      setPosition({
        x: constrainedX,
        y: constrainedY
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  if (!project) return null;

  return (
    <div 
      className="fixed w-[90%] max-w-[400px] bg-gray-300 border-t border-l border-white border-r-2 border-b-2 border-r-gray-800 border-b-gray-800 shadow-lg font-['Archivo']"
      style={{ left: position.x, top: position.y }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Window Header */}
      <div className="window-header h-8 bg-gradient-to-r from-blue-800 to-blue-600 flex items-center justify-between px-2 cursor-move">
        <span className="text-white font-bold">{project.title}</span>
        <button 
          onClick={onClose}
          className="text-white hover:bg-red-600 px-2 font-bold"
        >
          ✕
        </button>
      </div>

      {/* Window Content */}
      <div className="p-4 text-sm">
        <p className="font-bold">Description:</p>
        <p>{project.description}</p>
        
        <p className="font-bold mt-2">Technologies:</p>
        <p>{project.technologies.join(', ')}</p>

        <div className="mt-2">
          {project.videoLink && (
            <iframe 
              width="100%" 
              height="200" 
              src={project.videoLink} 
              title="Project Video" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          )}
        </div>

        <a 
          href={project.link} 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <button 
            className="px-3 py-1 bg-gray-300 hover:bg-gray-400 border border-gray-600 mt-2"
          >
            View on GitHub
          </button>
        </a>
      </div>
    </div>
  );
};

export default ProjectPopup; 