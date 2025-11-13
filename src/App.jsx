import { useRef, useEffect, useState } from 'react';
import './App.css';
import { TypeAnimation } from 'react-type-animation';


import searchIcon from './assets/images/icons8-search-128.png';
import githubIcon from './assets/images/icons8-github-100.png';
import linkedinIcon from './assets/images/icons8-linkedin.png';
import resumeIcon from './assets/images/icons8-paper-50.png';

const App = () => {
  const [showSocials, setShowSocials] = useState(false);
  const bubblesRef = useRef(null);

  const toggleSocials = () => {
    setShowSocials(!showSocials);
  };

  // Create bubbles on component mount
  useEffect(() => {
    const bubblesContainer = bubblesRef.current;
    const numberOfBubbles = 15;
    
    // Create bubbles
    for (let i = 0; i < numberOfBubbles; i++) {
      const bubble = document.createElement('div');
      bubble.className = 'bubble';
      
      // Random properties for each bubble
      const size = Math.random() * 120 + 30; // 30px to 150px
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const animationDelay = Math.random() * 20;
      
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      bubble.style.left = `${posX}%`;
      bubble.style.top = `${posY}%`;
      bubble.style.animationDelay = `${animationDelay}s`;
      
      // Add mouse move effect
      bubble.addEventListener('mousemove', (e) => {
        const rect = bubble.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const moveX = (e.clientX - centerX) * 0.1;
        const moveY = (e.clientY - centerY) * 0.1;
        
        bubble.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.2)`;
      });
      
      bubble.addEventListener('mouseleave', () => {
        bubble.style.transform = '';
      });
      
      bubblesContainer.appendChild(bubble);
    }
    
    // Cleanup function
    return () => {
      bubblesContainer.innerHTML = '';
    };
  }, []);

  return (
    <div className='main'>
      {/* Bubbles Background */}
      <div className="bubbles" ref={bubblesRef}></div>
      
      <div className="content">
        {/* Name at top center */}
        <div className="name-header">
          <h1>Bettino Gaussaint</h1>
        </div>
        
        {/* Main content in center */}
        <div className="center-content">
          <h2>I am a,</h2>
          <div className="typing-animation">
            <div className="search-bar-container">
              <div className="typing-container">
                <TypeAnimation
                  sequence={[
                    'Full-Stack Developer',
                    1000,
                    'Software Engineer',
                    1000,
                    'Problem Solver',
                    1000,
                    'Team Player',
                    1000,
                    'Continuous Learner',
                    1000,
                    'Builder',
                    1000,
                    'Competitive Gamer',
                    1000
                  ]}
                  wrapper="span"
                  speed={50}
                  style={{ 
                    fontSize: '3rem', 
                    display: 'inline-block',
                    color: 'white'
                  }}
                  repeat={Infinity}
                />
              </div>
              <div className="search-icon">
                <img src={searchIcon} alt="LinkedIn"/>
              </div>
            </div>
          </div>
        </div>
        
        {/* Navigation button and social icons at bottom */}
        <div className="bottom-nav">
          <button className="nav-button" onClick={toggleSocials}>
            {showSocials ? '▼' : '▲'}
          </button>
          <div className={`social-icons ${showSocials ? 'show' : ''}`}>
            <a href="https://github.com/BettinoCodes" className="social-icon" target="_blank" rel="noopener noreferrer">
              <img src={githubIcon} alt="GitHub"/>
            </a>
            <a href="https://linkedin.com/in/bettino-gaussaint" className="social-icon" target="_blank" rel="noopener noreferrer">
              <img src={linkedinIcon} alt="LinkedIn"/>
            </a>
            <a href="https://drive.google.com/file/d/1TBmnxB42bmnTw-nlOV3ZQyGMYiNr17yy/view?usp=sharing" className="social-icon" target="_blank" rel="noopener noreferrer">
              <img src={resumeIcon} alt="Resume"/>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;