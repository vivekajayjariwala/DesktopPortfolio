import React, { useRef, useState } from 'react';

const ProjectPopup = ({ project, onClose }) => {
  const [position, setPosition] = useState({ x: window.innerWidth / 2 - 150, y: window.innerHeight / 2 - 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const popupRef = useRef(null);

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
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  React.useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  if (!project) return null;

  return (
    <div 
      className="fixed w-96 bg-gray-300 border-t border-l border-white border-r-2 border-b-2 border-r-gray-800 border-b-gray-800 shadow-lg font-['Archivo'] flex flex-col" 
      style={{ left: position.x, top: position.y, transform: 'translate(-50%, -50%)' }}
      onMouseDown={handleMouseDown}
      ref={popupRef}
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