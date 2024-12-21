import React, { useState, useRef } from 'react';
import ProjectPopup from './ProjectPopup';

const projectIcons = [
  {
    title: "Next Stop",
    icon: "/img/projects_icon.png",
    link: "https://github.com/vivekajayjariwala/NextStop",
    description: "A social platform for travelers to discover and share hidden gems around the world.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    videoLink: "https://www.youtube.com/embed/JN5ZydEXF6s"
  },
  {
    title: "Bulletin Board",
    icon: "/img/projects_icon.png",
    link: "https://github.com/vivekajayjariwala/BulletinBoard",
    description: "Real-time collaborative workspace for teams to brainstorm and organize ideas together.",
    technologies: ["Angular", "MongoDB", "Express", "Node.js", "Angular Material", "AWS"],
    videoLink: "https://www.youtube.com/embed/N1UzDbpYp6c"
  },
  {
    title: "Battle of the Marauders",
    icon: "/img/projects_icon.png",
    link: "https://github.com/vivekajayjariwala/BattleOfTheMarauders",
    description: "A 16-bit adventure game featuring turn-based combat and dynamic platforming mechanics.",
    technologies: ["Python", "Pygame"],
    videoLink: "https://www.youtube.com/embed/qAzOMhzLd8Q"
  },
  {
    title: "Machine Learning Challenge",
    icon: "/img/projects_icon.png",
    link: "https://github.com/vivekajayjariwala/MachineLearningChallenge",
    description: "Award-winning predictive model for analyzing and forecasting customer behavior patterns.",
    technologies: ["Python", "Scikit-learn", "TensorFlow", "Seaborn", "NumPy", "Pandas"],
    videoLink: ""
  },
  {
    title: "Fantasy League Manager",
    icon: "/img/projects_icon.png",
    link: "https://github.com/vivekajayjariwala/FantasyLeagueManager",
    description: "Comprehensive management system for organizing and tracking fantasy sports leagues.",
    technologies: ["Java", "Java DB", "JavaFX", "SceneBuilder", "SQL"],
    videoLink: "https://www.youtube.com/embed/AGVLh1lgr00"
  },
  {
    title: "Riddles Emporium",
    icon: "/img/projects_icon.png",
    link: "https://github.com/vivekajayjariwala/RiddlesEmporium",
    description: "Interactive community platform where users can create, solve, and discuss riddles.",
    technologies: ["C#", "ASP. NET Core MVC"],
    videoLink: "https://www.youtube.com/embed/v9BiX87_evE"
  },
  {
    title: "Sales Forecaster",
    icon: "/img/projects_icon.png",
    link: "https://github.com/vivekajayjariwala/SalesForecaster",
    description: "Advanced analytics tool for predicting retail sales trends and market patterns.",
    technologies: ["Python", "Pandas", "Matplotlib"],
    videoLink: "https://www.youtube.com/embed/BsD-FK6dPkQ"
  },
];

const ProjectsWindow = ({ isOpen, onClose }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [position, setPosition] = useState({ x: window.innerWidth / 2 - 300, y: window.innerHeight / 2 - 200 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const windowRef = useRef(null);

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

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleClosePopup = () => {
    setSelectedProject(null);
  };

  if (!isOpen) return null;

  return (
    <>
      <div 
        ref={windowRef}
        className="fixed w-[600px] bg-gray-300 border-2 border-t-white border-l-white border-r-gray-800 border-b-gray-800 shadow-lg font-['Archivo']"
        style={{
          left: position.x,
          top: position.y,
        }}
        onMouseDown={handleMouseDown}
      >
        {/* Window Header */}
        <div className="window-header h-8 bg-gradient-to-r from-blue-800 to-blue-600 flex items-center justify-between px-2 cursor-move">
          <span className="text-white font-bold select-none">Projects</span>
          <button 
            onClick={onClose}
            className="text-white hover:bg-red-600 px-2 font-bold"
          >
            ✕
          </button>
        </div>

        {/* Project Names */}
        <div className="p-4 grid grid-cols-3 gap-4">
          {projectIcons.map((project, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center cursor-pointer transition duration-200" 
              onClick={() => handleProjectClick(project)}
            >
              <div className="relative">
                <img 
                  src={project.icon} 
                  alt={`${project.title} icon`} 
                  className="w-16 h-16 mb-2 transition-transform duration-200" 
                />
                <div className="absolute inset-0 bg-gray-200 opacity-0 hover:opacity-50 transition-opacity duration-200"></div>
              </div>
              <p className="text-gray-800 text-center">{project.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Project Popup */}
      <ProjectPopup project={selectedProject} onClose={handleClosePopup} />
    </>
  );
};

export default ProjectsWindow; 