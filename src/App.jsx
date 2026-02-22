import { useRef, useEffect, useState } from 'react';
import './App.css';
import { TypeAnimation } from 'react-type-animation';

import searchIcon from './assets/images/icons8-search-128.png';
import githubIcon from './assets/images/icons8-github-100.png';
import linkedinIcon from './assets/images/icons8-linkedin.png';
import resumeIcon from './assets/images/icons8-paper-50.png';
import About from './sections/About';
import Projects from './sections/project';
import { useFadeInOnScroll } from './hooks/useFadeInOnScroll';

const App = () => {
  const bubblesRef = useRef(null);
  const [showAlert, setShowAlert] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [heroRef, isHeroVisible] = useFadeInOnScroll({ threshold: 0.05, initialVisible: true });

  // Create bubbles once on mount; never recreate so positions stay fixed
  useEffect(() => {
    const bubblesContainer = bubblesRef.current;
    if (!bubblesContainer) return;

    const numberOfBubbles = 15;
    for (let i = 0; i < numberOfBubbles; i++) {
      const bubble = document.createElement('div');
      bubble.className = 'bubble';

      const size = Math.random() * 120 + 30;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const animationDelay = Math.random() * 20;

      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      bubble.style.left = `${posX}%`;
      bubble.style.top = `${posY}%`;
      bubble.style.animationDelay = `${animationDelay}s`;

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

    return () => {
      bubblesContainer.innerHTML = '';
    };
  }, []);

  // Hide "Scroll for more" on first scroll (separate from bubbles so scrolling doesn't recreate bubbles)
  useEffect(() => {
    const handleScroll = () => {
      if (!hasScrolled) {
        setShowAlert(false);
        setHasScrolled(true);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasScrolled]);

  // Alternative: Add a timeout to auto-hide the alert after some time
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 5000); // Auto-hide after 5 seconds
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Bubbles background - outside main content */}
      <div ref={bubblesRef} className="bubbles-background"></div>
      
      <div className='main'>
          <div ref={heroRef} className={`main-content scroll-fade ${isHeroVisible ? 'visible' : ''}`}>
            <div className="name-header">
              <h1>Bettino Gaussaint</h1>
            </div>
            
            <div className="center-header">
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
                    <img src={searchIcon} alt="Search"/>
                  </div>
                </div>
            </div>
            </div>
            
            <div className="bottom-nav">
              <div className="social-icons">
                <a href="https://github.com/BettinoCodes" className="social-icon" target="_blank" rel="noopener noreferrer">
                  <img src={githubIcon} alt="GitHub"/>
                </a>
                <a href="https://linkedin.com/in/bettino-gaussaint" className="social-icon" target="_blank" rel="noopener noreferrer">
                  <img src={linkedinIcon} alt="LinkedIn"/>
                </a>
                <a href="https://drive.google.com/file/d/1sXLVFTJ-5yB2Y-lEe5RVJGCHxgvnpQh1/view?usp=sharing" className="social-icon" target="_blank" rel="noopener noreferrer">
                  <img src={resumeIcon} alt="Resume"/>
                </a>
              </div>
            </div>
            
            {/* Scroll Alert */}
            <div className={`scroll-alert ${showAlert ? 'visible' : 'hidden'}`}>
              Scroll for more
            </div>
          </div>
        </div>
        {/* About Me Section */}
        <About />
        {/* Projects Section */}
        <Projects />
    </>
  )
}

export default App;