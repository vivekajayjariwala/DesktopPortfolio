import { ReactSketchCanvas } from 'react-sketch-canvas';
import { useRef, useState } from 'react';

const PaintWindow = ({ isOpen, onClose }) => {
  const canvasRef = useRef(null);
  const [strokeColor, setStrokeColor] = useState('black');
  const [strokeWidth, setStrokeWidth] = useState(4);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  if (!isOpen) return null;

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

  return (
    <div 
      className="fixed w-[450px] bg-gray-300 border-2 border-t-white border-l-white border-r-gray-800 border-b-gray-800 shadow-lg font-['Archivo']"
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
        <div className="w-[400px] h-[400px]">
          <ReactSketchCanvas
            ref={canvasRef}
            strokeWidth={strokeWidth}
            strokeColor={strokeColor}
            canvasColor="white"
            style={{
              border: '1px solid #999',
              width: '400px',
              height: '400px'
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