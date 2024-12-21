import { ReactSketchCanvas } from 'react-sketch-canvas';
import { useRef, useState, useEffect } from 'react';

const PaintWindow = ({ isOpen, onClose }) => {
  const canvasRef = useRef(null);
  const [strokeColor, setStrokeColor] = useState('black');
  const [strokeWidth, setStrokeWidth] = useState(4);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (isOpen) {
      setPosition({
        x: window.innerWidth / 2 - 225, // Center the window
        y: window.innerHeight / 2 - 200,
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
      const constrainedX = Math.max(0, Math.min(newX, window.innerWidth - 450)); // 450 is the width of the window
      const constrainedY = Math.max(0, Math.min(newY, window.innerHeight - 400)); // 400 is the height of the window

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
      className="fixed w-[90%] max-w-[450px] bg-gray-300 border-2 border-t-white border-l-white border-r-gray-800 border-b-gray-800 shadow-lg font-['Archivo']"
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
        <span className="text-white font-bold select-none">Paint</span>
        <button 
          onClick={onClose}
          className="text-white hover:bg-red-600 px-2 font-bold"
        >
          ✕
        </button>
      </div>

      {/* Paint Canvas */}
      <div className="p-2 bg-gray-200 flex-1">
        <div className="w-full h-[400px]">
          <ReactSketchCanvas
            ref={canvasRef}
            strokeWidth={strokeWidth}
            strokeColor={strokeColor}
            canvasColor="white"
            style={{
              border: '1px solid #999',
              width: '100%',
              height: '100%'
            }}
          />
        </div>
        <div className="flex gap-2 mt-2 mb-4">
          <button 
            onClick={() => canvasRef.current.undo()}
            className="px-3 py-1 bg-gray-300 hover:bg-gray-400 border border-gray-600"
          >
            Undo
          </button>
          <button 
            onClick={() => canvasRef.current.redo()}
            className="px-3 py-1 bg-gray-300 hover:bg-gray-400 border border-gray-600"
          >
            Redo
          </button>
          <button 
            onClick={() => canvasRef.current.clearCanvas()}
            className="px-3 py-1 bg-gray-300 hover:bg-gray-400 border border-gray-600"
          >
            Clear
          </button>
          <button 
            onClick={() => {
              canvasRef.current.exportImage('png')
                .then(data => {
                  const link = document.createElement('a');
                  link.download = 'drawing.png';
                  link.href = data;
                  link.click();
                });
            }}
            className="px-3 py-1 bg-gray-300 hover:bg-gray-400 border border-gray-600"
          >
            Save
          </button>
        </div>
        <div className="flex gap-4">
          <input 
            type="color" 
            value={strokeColor}
            onChange={(e) => setStrokeColor(e.target.value)}
          />
          <input 
            type="range" 
            min="1" 
            max="20" 
            value={strokeWidth}
            onChange={(e) => setStrokeWidth(parseInt(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
};

export default PaintWindow; 