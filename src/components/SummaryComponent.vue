<template>
  <div class="summary">
    <h2 class="section-title">About Me</h2>
    <div class="summary-content">
      <div class="profile">
        <div class="profile-image">
          <img src="../assets/profile.jpg" alt="Profile" />
        </div>
        <div class="social-links">
          <a href="https://github.com/yourusername" target="_blank" class="social-link">
            <i class="fab fa-github"></i>
          </a>
          <a href="https://linkedin.com/in/yourusername" target="_blank" class="social-link">
            <i class="fab fa-linkedin"></i>
          </a>
        </div>
      </div>
      <div class="bio">
        <p>
          Hi, I'm Thor! I'm a passionate Software Engineer with expertise in full-stack development.
          I love building elegant solutions to complex problems and am constantly learning new technologies.
        </p>
        <div class="skills">
          <h3>Core Skills</h3>
          <div class="skill-tags">
            <span class="skill-tag">Vue.js</span>
            <span class="skill-tag">React</span>
            <span class="skill-tag">Node.js</span>
            <span class="skill-tag">TypeScript</span>
            <span class="skill-tag">Python</span>
            <span class="skill-tag">AWS</span>
          </div>
        </div>
        <div class="interests">
          <h3>Interests</h3>
          <p>
            Beyond coding, I'm passionate about technology, open-source contribution, and staying
            up-to-date with the latest industry trends. I enjoy problem-solving and creating
            efficient, scalable solutions.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.summary {
  width: 100%;
}

.summary-content {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 4rem;
  align-items: start;
}

.profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.profile-image {
  width: 250px;
  height: 250px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid var(--accent-color);
}

.profile-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-link {
  font-size: 1.5rem;
  color: var(--text-primary);
  transition: color 0.2s ease;
}

.social-link:hover {
  color: var(--accent-color);
}

.bio {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.bio p {
  font-size: 1.1rem;
  line-height: 1.6;
}

.skills, .interests {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

h3 {
  font-size: 1.5rem;
  color: var(--accent-color);
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.skill-tag {
  background: var(--bg-secondary);
  color: var(--text-primary);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  border: 1px solid var(--accent-color);
}

@media (max-width: 768px) {
  .summary-content {
    grid-template-columns: 1fr;
  }

  .profile {
    margin-bottom: 2rem;
  }
}
</style>
