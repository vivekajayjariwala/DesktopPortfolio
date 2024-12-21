import { useState, useEffect } from 'react';

const TerminalWindow = ({ isOpen, onClose }) => {
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [currentText, setCurrentText] = useState('');
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [previousLines, setPreviousLines] = useState([]);

  const funFacts = [
    "My first experience coding was making a Batman video game at 14-years-old!",
    "My favourite programming languages are Java and Python.",
    "I used to create album artwork and apparel for music artists and record labels.",
    "My favourite music genres are Rap and RnB (been getting really into 90s RnB lately).",
    "I built a project presented at CUCAI, Canada's largest AI conference!",
    "The best TV show I've ever watched is Avatar The Last Airbender (I've watched it over 15 times).",
    "My favorite data structure is a linked list (binary trees can see themself out).",
    "I've participated and volunteered in 6 hackathons (and have won one of them)!",
  ];

  useEffect(() => {
    if (!isOpen) return;

    const typewriterInterval = setInterval(() => {
      const currentFact = funFacts[currentFactIndex];
      
      if (charIndex < currentFact.length) {
        setCurrentText(currentFact.substring(0, charIndex + 1));
        setCharIndex(prev => prev + 1);
      } else {
        clearInterval(typewriterInterval);
        
        setTimeout(() => {
          setPreviousLines(prev => [...prev, currentFact]);
          setCurrentText('');
          setCharIndex(0);
          setCurrentFactIndex((prev) => (prev + 1) % funFacts.length);
        }, 3000);
      }
    }, 100);

    return () => clearInterval(typewriterInterval);
  }, [charIndex, currentFactIndex, isOpen]);

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
      className="fixed w-[500px] bg-gray-300 border-2 border-t-white border-l-white border-r-gray-800 border-b-gray-800 shadow-lg font-['Archivo']"
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
        <span className="text-white font-bold select-none">Command Prompt</span>
        <button 
          onClick={onClose}
          className="text-white hover:bg-red-600 px-2 font-bold"
        >
          ✕
        </button>
      </div>

      {/* Terminal Content */}
      <div className="p-2 bg-black h-[300px] font-mono text-green-500 overflow-y-auto">
        <div className="mb-2">Vivek Jariwala [Version 10.14.2003]</div>
        <div className="mb-2">(c) Vivek Jariwala Corporation. All rights reserved.</div>
        
        {previousLines.map((line, index) => (
          <div key={index} className="mb-2">
            <span className="mr-2">C:\Users\Guest&gt;</span>
            <span>{line}</span>
          </div>
        ))}
        
        <div className="flex flex-wrap">
          <span className="mr-2">C:\Users\Guest&gt;</span>
          <div className="flex-1">
            <span>{currentText}</span>
            {currentText.length === funFacts[currentFactIndex].length ? null : (
              <span className="animate-blink">_</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerminalWindow; 