<template>
  <div class="projects-container">
    <h2>Projects</h2>
    <div class="projects-grid">
      <div v-for="project in projects" :key="project.id" class="project-card">
        <div class="project-content">
          <h3>{{ project.title }}</h3>
          <p class="project-description">{{ project.description }}</p>
          <div class="project-tags">
            <span v-for="tech in project.technologies" :key="tech" class="tag">{{ tech }}</span>
          </div>
          <div class="project-links">
            <a v-if="project.demo" :href="project.demo" target="_blank" class="btn">View Demo</a>
            <a v-if="project.github" :href="project.github" target="_blank" class="btn">GitHub</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const projects = [
  {
    id: 1,
    title: 'Personal Portfolio',
    description: 'A Vue.js-based personal portfolio website showcasing projects and experience.',
    technologies: ['Vue.js', 'TypeScript', 'CSS3'],
    demo: 'https://portfolio.example.com',
    github: 'https://github.com/username/portfolio'
  },
  {
    id: 2,
    title: 'Task Manager',
    description: 'Full-stack task management application with real-time updates.',
    technologies: ['React', 'Node.js', 'MongoDB'],
    demo: 'https://task-manager.example.com',
    github: 'https://github.com/username/task-manager'
  }
]
</script>

<style scoped>
.projects-container {
  width: 100%;
}

h2 {
  font-size: 2.5rem;
  margin-bottom: 3rem;
  text-align: center;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.project-card {
  background: var(--bg-secondary);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
}

.project-card:hover {
  transform: translateY(-5px);
}

.project-content {
  padding: 1.5rem;
}

h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.project-description {
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.tag {
  background: var(--accent-color);
  color: var(--bg-primary);
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.875rem;
}

.project-links {
  display: flex;
  gap: 1rem;
}

.btn {
  background: var(--accent-color);
  color: var(--bg-primary);
  padding: 0.5rem 1rem;
  border-radius: 6px;
  text-decoration: none;
  font-weight: bold;
  transition: opacity 0.2s ease;
}

.btn:hover {
  opacity: 0.9;
}
</style>
