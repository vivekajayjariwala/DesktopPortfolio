const DesktopIcon = ({ icon, title, onClick }) => {
  return (
    <div 
      className="flex flex-col items-center w-20 cursor-pointer group m-4"
      onClick={onClick}
    >
      <img 
        src={icon} 
        alt={title}
        className="w-12 h-12 group-hover:opacity-80"
      />
      <span className="text-white text-center text-sm mt-1 select-none">
        {title}
      </span>
    </div>
  );
};

export default DesktopIcon; 