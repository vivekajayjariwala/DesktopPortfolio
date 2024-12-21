import React, { useState, useEffect, useRef } from 'react';

const PhotoViewer = ({ isOpen, onClose }) => {
  const [photos, setPhotos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const viewerRef = useRef(null);

  const fetchPhotos = () => {
    const images = [
      {
        src: '/img/photos/2022-06-26 21:48:58.364.JPG',
        description: "Never listened to Wallows before their concert, but they're incredible.",
      },
      {
        src: '/img/photos/2022-08-06 23:12:09.551.JPG',
        description: 'One of the best moments of my life.',
      },
      {
        src: '/img/photos/2022-09-10 21:43:24.914.JPG',
        description: 'Farm house made during Engineering Orientation Week.',
      },
      {
        src: '/img/photos/2022-09-22 22:20:46.281.JPG',
        description: "The Weeknd's vocals are even crazier in person.",
      },
      {
        src: '/img/photos/2022-10-10 22:25:43.382.JPG',
        description: 'Nectar by Joji is one of the best albums of all time.',
      },
      {
        src: '/img/photos/2023-02-13 19:48:22.802.JPG',
        description: "Engineering vs Ivey Men's Hockey Game. Ivey lost. Should've switched sides.",
      },
      {
        src: '/img/photos/2023-06-02 23:05:29.419.JPG',
        description: "I won't lie, the Bellagio Fountains dance better than me.",
      },
      {
        src: '/img/photos/2023-10-06 23:15:35.643.JPG',
        description: "Me being a huge Drake fan part 2.",
      },
      {
        src: '/img/photos/2024-01-11 20:41:07.751.JPG',
        description: "My friend's A-MAZ-ING magazine launch event!",
      },
      {
        src: '/img/photos/2024-03-11 20:19:24.909.JPG',
        description: "Went to Crafting For A Cure's SPECTACULAR talent show.",
      },
      {
        src: '/img/photos/2024-05-12 22:59:55.215.JPG',
        description: "Probably the best photo I've ever taken.",
      },
      {
        src: '/img/photos/2024-07-01 21:42:33.409.JPG',
        description: 'Fun fact, I used to be scared of fireworks.',
      },
      {
        src: '/img/photos/2024-08-15 16:39:09.198.JPG',
        description: 'Honestly just super aesthetic office vibes.',
      },
      {
        src: '/img/photos/2024-10-20 12:29:01.102.JPG',
        description: 'Um...random San Francisco intersection!?',
      },
      {
        src: '/img/photos/2024-10-20 12:29:03.248.JPG',
        description: "You've probably seen this photo 100 times before.",
      },
    ];
    setPhotos(images);
  };

  useEffect(() => {
    if (isOpen) {
      fetchPhotos();
    }
  }, [isOpen]);

  const handleNext = () => {
    if (photos.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
    }
  };

  const handlePrev = () => {
    if (photos.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length);
    }
  };

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

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed w-[600px] bg-gray-300 border-2 border-t-white border-l-white border-r-gray-800 border-b-gray-800 shadow-lg font-['Archivo']"
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
        <span className="text-white font-bold select-none">Photo Viewer</span>
        <button 
          onClick={onClose}
          className="text-white hover:bg-red-600 px-2 font-bold"
        >
          ✕
        </button>
      </div>

      {/* Photo Display */}
      <div className="flex flex-col items-center h-full">
        <div className="flex h-full">
          <button onClick={handlePrev} className="flex items-center justify-center w-10 bg-gray-200 hover:bg-gray-300">←</button>
          <div className="flex-1 flex items-center justify-center">
            {photos.length > 0 ? (
              <img src={photos[currentIndex].src} alt={`Image ${currentIndex + 1}`} className="max-h-full max-w-full" />
            ) : (
              <p>No photos available</p>
            )}
          </div>
          <button onClick={handleNext} className="flex items-center justify-center w-10 bg-gray-200 hover:bg-gray-300">→</button>
        </div>
        {/* Description */}
        <p className="mt-2 text-center">{photos.length > 0 ? photos[currentIndex].description : ''}</p>
      </div>

      {/* Thumbnail Previews */}
      <div className="flex overflow-x-auto p-2 space-x-2">
        {photos.map((photo, index) => (
          <img
            key={index}
            src={photo.src}
            alt={`Thumbnail ${index + 1}`}
            className={`w-20 h-20 object-cover cursor-pointer ${currentIndex === index ? 'border-2 border-blue-600' : ''}`}
            onClick={() => handleThumbnailClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default PhotoViewer; 