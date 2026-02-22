import React from 'react';
import './about.css';
import { useFadeInOnScroll } from '../hooks/useFadeInOnScroll';

const About = () => {
  const [sectionRef, isVisible] = useFadeInOnScroll();
  return (
    <section ref={sectionRef} className={`about-section scroll-fade ${isVisible ? 'visible' : ''}`}>
      <div className="about-header">
        <h2>About Me</h2>
      </div>
      <div className="about-content">
        <p>
        I am a full stack developer with strong experience in Python. I enjoy full stack development because I love seeing how systems connect, from backend logic to clean, intuitive interfaces. I also challenge myself with LeetCode to test my coding skills and learn to optimize solutions.
        </p>
        <p>
          More than anything, I'm driven by solving real problems, learning new technologies quickly, and building solutions that make a meaningful impact for users and businesses.
        </p>
      </div>
    </section>
  );
};

export default About;
