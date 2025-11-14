import React from 'react';
import './project.css';

const Project = () => {
  const projects = [
      {
      id: 1,
      name: "FAQ Search Engine - Internship",
      visibility: "private",
      tags: ["Python", "HTML", "CSS", "Javascript", "ML", "MongoDB", "Digital Ocean", "Wordpress"],
      description: "Machine learning powered FAQ page using semantic search.",
      link: "https://estate-lawyer-ny.com/help/"
    },
    {
      id: 2,
      name: "Anime Rank Voting Platform",
      visibility: "public",
      tags: ["React", "Node.js", "MongoDB", "Express", "AWS", "Render"],
      description: "Full-stack anime voting platform to find the best animes to watch.",
      link: "https://d4joto8i7bqrk.cloudfront.net/"
    },
    {
      id: 3,
      name: "W-10K Analyzer - Finance Research Assistant",
      visibility: "private",
      tags: ["Python", "ML", "Linux", "Bash", "Regex"],
      description: "A machine learning pipeline to retrieve mission/vision statements of companies from 10ks.",
      link: "#"
    },
    {
      id: 4,
      name: "Endless Journey Mobile Game",
      visibility: "public",
      tags: ["Java", "SQLite", "Junit", "Mobile", "Android Studio", "Teamwork"],
      description: "Endless survival zombie shooter mobile game.",
      link: "https://github.com/BettinoCodes/Endless-Journey-Mobile"
    },
    {
      id: 5,
      name: "Whack-A-Prof",
      visibility: "public",
      tags: ["HTML", "CSS", "Javascript", "JSON", "Teamwork"],
      description: "A Whack a mole web game but instead of a mole its our professor",
      link: "https://github.com/BettinoCodes/Whack-A-Prof"
    },
    {
      id: 5,
      name: "Plenty more on my github",
      visibility: "public",
      tags: ["Continous Learner", "No Limits"],
      description: "My github profile",
      link: "https://github.com/BettinoCodes"
    }
  ];

  const handleReadMore = (project) => {
    if (project.link && project.link !== '#') {
      window.open(project.link, '_blank', 'noopener noreferrer');
    } else {
      // For private projects, you could show a modal or message
      console.log(`Project ${project.name} is private`);
      // You can implement a modal here for private projects
      alert(`🚧 ${project.name} is a private project. Details are confidential.`);
    }
  };

  return (
    <section className="projects-section">
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
                aria-label={`Read more about ${project.name}`}
              >
                Read More
                <span className="arrow-icon">→</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Project;