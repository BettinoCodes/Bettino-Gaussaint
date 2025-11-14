import React, { useState, useRef, useEffect } from 'react';
import './project.css';

// Import your images
import faqSearchImage from '../assets/images/faq-search-engine.png';
import animeVotingImage from '../assets/images/anime-voting-platform.png';
import endlessJourneyImage from '../assets/images/endless-journey.png';
import whackAProfImage from '../assets/images/whack-a-prof.png';
import githubProfileImage from '../assets/images/github-profile.png';

const Project = () => {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [imageLoaded, setImageLoaded] = useState({});
  const hoverTimeoutRef = useRef(null);
  const hoverImageRef = useRef(null);

  const projects = [
    {
      id: 1,
      name: "FAQ Search Engine - Internship",
      visibility: "private",
      tags: ["Python", "HTML", "CSS", "Javascript", "ML", "MongoDB", "Digital Ocean", "Wordpress"],
      description: "Machine learning powered FAQ page using semantic search.",
      link: "https://estate-lawyer-ny.com/help/",
      image: faqSearchImage
    },
    {
      id: 2,
      name: "Anime Rank Voting Platform",
      visibility: "public",
      tags: ["React", "Node.js", "MongoDB", "Express", "AWS", "Render"],
      description: "Full-stack anime voting platform to find the best animes to watch.",
      link: "https://d4joto8i7bqrk.cloudfront.net/",
      image: animeVotingImage
    },
    {
      id: 3,
      name: "W-10K Analyzer - Finance Research Assistant",
      visibility: "private",
      tags: ["Python", "ML", "Linux", "Bash", "Regex"],
      description: "A machine learning pipeline to retrieve mission/vision statements of companies from 10ks.",
      link: "#",
      image: ""
    },
    {
      id: 4,
      name: "Endless Journey Mobile Game",
      visibility: "public",
      tags: ["Java", "SQLite", "Junit", "Mobile", "Android Studio", "Teamwork"],
      description: "Endless survival zombie shooter mobile game.",
      link: "https://github.com/BettinoCodes/Endless-Journey-Mobile",
      image: endlessJourneyImage
    },
    {
      id: 5,
      name: "Whack-A-Prof",
      visibility: "public",
      tags: ["HTML", "CSS", "Javascript", "JSON", "Teamwork"],
      description: "A Whack a mole web game but instead of a mole its our professor",
      link: "https://github.com/BettinoCodes/Whack-A-Prof",
      image: whackAProfImage
    },
    {
      id: 6,
      name: "Plenty more on my github",
      visibility: "public",
      tags: ["Continous Learner", "No Limits"],
      description: "My github profile",
      link: "https://github.com/BettinoCodes",
      image: githubProfileImage
    }
  ];

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleReadMore = (project) => {
    if (project.link && project.link !== '#') {
      window.open(project.link, '_blank', 'noopener noreferrer');
    } else {
      console.log(`Project ${project.name} is private`);
      alert(`🚧 ${project.name} is a private project. Details are confidential.`);
    }
  };

  const handleMouseEnter = (projectId) => {
    // Clear any existing timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    
    // Set a small delay to prevent flickering
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredProject(projectId);
    }, 100);
  };

  const handleMouseLeave = () => {
    // Clear timeout if mouse leaves quickly
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setHoveredProject(null);
  };

  const handleImageLoad = (projectId) => {
    setImageLoaded(prev => ({ ...prev, [projectId]: true }));
  };

  const handleImageError = (projectId) => {
    setImageLoaded(prev => ({ ...prev, [projectId]: false }));
  };

  // Get the current hovered project data
  const currentHoveredProject = projects.find(project => project.id === hoveredProject);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  return (
    <section 
      className="projects-section" 
      onMouseMove={handleMouseMove}
    >
      <div className="projects-header">
        <h2>Projects & Experience</h2>
        <p>A collection of my recent work and contributions</p>
      </div>
      
      <div className="projects-container">
        {projects.map((project) => (
          <div key={project.id} className="project-item">
            <div className="project-content">
              <div className="project-header">
                <div className="project-name-container">
                  <h3 className="project-name">{project.name}</h3>
                  <span className={`project-visibility visibility-${project.visibility}`}>
                    {project.visibility}
                  </span>
                </div>
              </div>
              
              <div className="project-tags">
                {project.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="project-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="project-action">
              <button 
                className="read-more-btn"
                onClick={() => handleReadMore(project)}
                onMouseEnter={() => handleMouseEnter(project.id)}
                onMouseLeave={handleMouseLeave}
                aria-label={`Read more about ${project.name}`}
              >
                Read More
                <span className="arrow-icon">→</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Hover Image Display */}
      {hoveredProject && currentHoveredProject && currentHoveredProject.image && (
        <div 
          ref={hoverImageRef}
          className="project-hover-image"
          style={{
            left: `${mousePosition.x + 20}px`,
            top: `${mousePosition.y + 20}px`
          }}
        >
          <img 
            src={currentHoveredProject.image}
            alt={`Preview of ${currentHoveredProject.name}`}
            onLoad={() => handleImageLoad(currentHoveredProject.id)}
            onError={() => handleImageError(currentHoveredProject.id)}
          />
          {!imageLoaded[currentHoveredProject.id] && (
            <div className="image-loading">Loading preview...</div>
          )}
        </div>
      )}
    </section>
  );
};

export default Project;