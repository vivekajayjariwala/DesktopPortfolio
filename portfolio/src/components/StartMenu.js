const StartMenu = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 bg-gray-300 border-t border-l border-white border-r-2 border-b-2 border-r-gray-800 border-b-gray-800 shadow-lg font-['Archivo']">
      {/* Menu Header */}
      <div className="h-8 bg-gradient-to-r from-blue-800 to-blue-600 flex items-center justify-between px-2">
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
        <p className="mb-2">Welcome to my portfolio!</p>
        <p className="mb-2">This is a Windows 98-style website showcasing my work and experience.</p>
        <p>Feel free to explore by clicking on the desktop icons.</p>
      </div>
    </div>
  );
};

export default StartMenu; 