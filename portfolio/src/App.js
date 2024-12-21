import { useState } from 'react';
import StartMenu from './components/StartMenu';
import PaintWindow from './components/PaintWindow';
import DesktopIcon from './components/DesktopIcon';
import ContentWindow from './components/ContentWindow';
import TerminalWindow from './components/TerminalWindow';

function App() {
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [isPaintOpen, setIsPaintOpen] = useState(true);
  const [openWindows, setOpenWindows] = useState([]);
  const [isTerminalOpen, setIsTerminalOpen] = useState(true);

  const bondBrandLoyaltyIcon = '/img/bond_brand_loyalty_icon.png';
  const elimSolutionsIcon = '/img/elim_solutions_icon.png';
  const buckmasterInstituteIcon = '/img/buckmaster_institute_icon.png';

  const windows = {
    bondBrandLoyalty: {
      title: "Bond Brand Loyalty",
      content: (
        <div className="space-y-4">          
          <div>
            <p className="font-bold">Role:</p>
            <p>Software Engineering Intern</p>
          </div>

          <div>
            <p className="font-bold">Team:</p>
            <p>Artificial Intelligence Solutions</p>
          </div>

          <div>
            <p className="font-bold">Technologies:</p>
            <p>Python, Streamlit, Azure AI Services, Snowflake, SQL, Scikit-learn</p>
          </div>

          <div>
            <p className="font-bold">What I Did:</p>
            <p>I worked a bunch of different AI projects for both internal teams and clients during my internship.
              I built an AI brainstorming tool that marketing teams use to generate campaign ideas. 
               It uses ChatGPT and DALL-E to create text and visuals, and it can analyze over 75,000 ads 
               to find similar campaigns by comparing the cosine similarities of their embeddings. I also 
               created a tool that scans competitor flyers for a major grocery chain, helping them stay competitive in the market.
               My favorite project was building a Snowflake Native app that automates machine learning processes, making it accessible
              to non-technical users - it handles everything from feature selection to model comparison!</p>
          </div>
        </div>
      )
    },
    elimSolutions: {
      title: "Elim Solutions",
      content: (
        <div className="space-y-4">          
          <div>
            <p className="font-bold">Role:</p>
            <p>Software Developer Intern</p>
          </div>

          <div>
            <p className="font-bold">Team:</p>
            <p>Oracle NetSuite Implementation</p>
          </div>

          <div>
            <p className="font-bold">Technologies:</p>
            <p>Angular, Express.js, Node.js, MongoDB, AWS, JavaScript, TypeScript, NetSuite, SuiteScript, 
               Backbone.js, Handlebars</p>
          </div>

          <div>
            <p className="font-bold">What I Did:</p>
            <p>I built a full inventory management system from scratch using the MEAN stack, 
               complete with real-time updates and smooth animations. I also worked on some cool 
               e-commerce projects, connecting online stores to NetSuite and building modern 
               interfaces. One of my projects was creating an anonymous feedback system for 
               employees - it was challenging as I learned how to implement microservices, but I think it
               turned out great!</p>
          </div>
        </div>
      )
    },
    buckmasterInstitute: {
      title: "The Buckmaster Institute",
      content: (
        <div className="space-y-4">          
          <div>
            <p className="font-bold">Role:</p>
            <p>Software Developer Intern</p>
          </div>

          <div>
            <p className="font-bold">Team:</p>
            <p>Computer Vision</p>
          </div>


          <div>
            <p className="font-bold">Technologies:</p>
            <p>Python, OpenCV, Scikit-learn, NumPy, Pandas</p>
          </div>

          <div>
            <p className="font-bold">What I Did:</p>
            <p>I created a program that can recognize musical notes in digital scores with 
               over 95% accuracy! The focus of the internship was designing and iterating on custom 
               algorithms to match different types of notes and account for all possible edge cases. By
               the end of the project, we had collected over 25,000 data points that the company is
               continuing to use for their computer vision research.</p>
          </div>
        </div>
      )
    }
  };

  const handleWindowOpen = (windowId) => {
    if (!openWindows.includes(windowId)) {
      setOpenWindows([...openWindows, windowId]);
    }
  };

  const handleWindowClose = (windowId) => {
    setOpenWindows(openWindows.filter(id => id !== windowId));
  };

  return (
    <div className="h-screen w-full bg-cyan-500 flex flex-col">
      {/* Main desktop area */}
      <div className="flex-1">
        {/* Desktop Icons */}
        <div className="p-4 grid grid-cols-1 gap-2 w-fit">
          <DesktopIcon
            icon={bondBrandLoyaltyIcon}
            title="Bond Brand Loyalty"
            onClick={() => handleWindowOpen('bondBrandLoyalty')}
          />
          <DesktopIcon
            icon={elimSolutionsIcon}
            title="Elim Solutions"
            onClick={() => handleWindowOpen('elimSolutions')}
          />
          <DesktopIcon
            icon={buckmasterInstituteIcon}
            title="The Buckmaster Institute"
            onClick={() => handleWindowOpen('buckmasterInstitute')}
          />
          <DesktopIcon
            icon="/img/command_line_icon.png"
            title="Command Prompt"
            onClick={() => setIsTerminalOpen(true)}
          />
          <DesktopIcon
            icon="/img/paint_icon.png"
            title="Paint"
            onClick={() => setIsPaintOpen(true)}
          />
        </div>

        {/* Render Content Windows */}
        {Object.entries(windows).map(([id, window]) => (
          <ContentWindow
            key={id}
            isOpen={openWindows.includes(id)}
            onClose={() => handleWindowClose(id)}
            title={window.title}
          >
            {window.content}
          </ContentWindow>
        ))}

        <PaintWindow 
          isOpen={isPaintOpen} 
          onClose={() => setIsPaintOpen(false)} 
        />

        <TerminalWindow 
          isOpen={isTerminalOpen} 
          onClose={() => setIsTerminalOpen(false)} 
        />
      </div>

      {/* Windows taskbar */}
      <div className="h-12 bg-gray-300 border-t border-gray-400 flex items-center px-2">
        <button 
          className={`px-4 py-1 bg-gray-200 border-2 ${
            isStartMenuOpen 
              ? 'border-gray-800 border-t-2 border-l-2 border-r-white border-b-white' 
              : 'border-white border-t-2 border-l-2 border-r-gray-800 border-b-gray-800 hover:bg-gray-100'
          } font-['Archivo']`}
          onClick={() => setIsStartMenuOpen(!isStartMenuOpen)}
        >
          Start
        </button>
        <StartMenu 
          isOpen={isStartMenuOpen} 
          onClose={() => setIsStartMenuOpen(false)} 
        />
      </div>
    </div>
  );
}

export default App;