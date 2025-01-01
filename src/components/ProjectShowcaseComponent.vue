<template>
  <div class="projects-container" id="projects">
    <h2>Projects</h2>
    <div class="carousel-container">
      <button class="nav-button prev" @click="prevProject" :disabled="currentIndex === 0">&lt;</button>
      <div class="projects-carousel">
        <div class="carousel-track" :style="{ transform: `translateX(-${currentIndex * (100/3)}%)` }">
          <div v-for="project in projects" 
               :key="project.id" 
               class="project-card" 
               @click="selectProject(project)">
            <div class="category-badge" :style="{ backgroundColor: getCategoryColor(project.category) }">
              {{ project.category }}
            </div>
            <div class="project-content">
              <h3 class="project-title">{{ project.title }}</h3>
              <p class="project-description">{{ project.description }}</p>
              <div class="project-links" v-if="project.links.length > 0">
                <a v-for="(link, index) in project.links.slice(0, 2)"
                   :key="index"
                   :href="link.url"
                   target="_blank"
                   class="btn">{{ link.label }}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button class="nav-button next" @click="nextProject" :disabled="currentIndex >= projects.length - 3">&gt;</button>
    </div>

    <!-- Project Modal -->
    <div v-if="selectedProject" class="project-modal" @click.self="closeModal">
      <div class="modal-content">
        <button class="close-button" @click="closeModal">&times;</button>
        <div class="category-badge" :style="{ backgroundColor: getCategoryColor(selectedProject.category) }">
          {{ selectedProject.category }}
        </div>
        <h2>{{ selectedProject.title }}</h2>
        <div class="modal-details">
          <p class="detailed-summary">{{ selectedProject.detailedSummary }}</p>
          <div v-if="selectedProject.images" class="project-images">
            <img v-for="(image, index) in selectedProject.images" 
                 :key="index"
                 :src="getImageUrl(image)"
                 v-if="getImageUrl(image)"
                 :alt="`${selectedProject.title} screenshot ${index + 1}`"
                 class="project-image">
          </div>
          <div class="project-tags">
            <span v-for="tech in selectedProject.technologies" :key="tech" class="tag">{{ tech }}</span>
          </div>
          <div class="project-links" v-if="selectedProject.links.length > 0">
            <a v-for="(link, index) in selectedProject.links"
               :key="index"
               :href="link.url"
               target="_blank"
               class="btn">{{ link.label }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import projectsData from '@/assets/component-data/projects-data.json'

const currentIndex = ref(0)
const selectedProject = ref(null)
const imageUrls = ref<Record<string, string>>({})
const projects = ref(projectsData.projects)

// Use Vite's glob import to get all project images
const images = import.meta.glob('../assets/images/**/*')
console.log(images)

onMounted(async () => {
  // Load all images for all project items
  for (const item of projects.value) {
    // Load main image
    if (item.images) {
      for (const imagePath of item.images) {
        const fullPath = `../assets${imagePath}`
        if (images[fullPath]) {
          try {
            const module = await images[fullPath]()
            imageUrls.value[imagePath] = module.default
          } catch (error) {
            console.error(`Failed to load image: ${imagePath}`, error)
          }
        }
      }
    }
  }
})

const sortedProjects = computed(() => {
  return [...projects.value].sort((a, b) => {
    const priorityA = a.priority || Number.MAX_SAFE_INTEGER
    const priorityB = b.priority || Number.MAX_SAFE_INTEGER
    return priorityA - priorityB
  })
})

const getCategoryColor = (category: string) => {
  return projectsData.categoryColors[category] || '#666666'
}

const nextProject = () => {
  if (currentIndex.value < projects.value.length - 3) {
    currentIndex.value++
  }
}

const prevProject = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}

const selectProject = (project) => {
  selectedProject.value = project
}

const closeModal = () => {
  selectedProject.value = null
}

const getImageUrl = (path: string) => {
  return imageUrls.value[path] || ''
}
</script>

<style scoped>
.projects-container {
  width: 100%;
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
}

h2 {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 2rem;
  color: var(--color-heading);
}

.carousel-container {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
}

.projects-carousel {
  width: 100%;
  overflow: hidden;
}

.carousel-track {
  display: flex;
  transition: transform 0.3s ease;
}

.project-card {
  min-width: calc(33.333% - 1.33rem);
  margin-right: 2rem;
  position: relative;
  cursor: pointer;
  background: var(--bg-secondary);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
}

.project-card:hover {
  transform: translateY(-5px);
}

.category-badge {
  position: absolute;
  top: 1rem;
  left: 1rem;
  padding: 0.25rem 0.75rem;
  font-size: 0.875rem;
  border-radius: 1rem;
  color: white;
  font-weight: 500;
  z-index: 1;
}

.project-content {
  padding: 1.5rem;
  padding-top: 3rem;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.project-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 2rem;
  line-height: 2rem;
}

.project-description {
  margin-bottom: 1.5rem;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 4.8rem; /* 3 lines * 1.6 line height */
}

.project-links {
  margin-top: auto;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: var(--accent-color);
  color: var(--bg-primary);
  text-decoration: none;
  border-radius: 4px;
  transition: opacity 0.3s;
}

.btn:hover {
  opacity: 0.9;
}

.nav-button {
  background: var(--accent-color);
  color: var(--bg-primary);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s ease;
  flex-shrink: 0;
}

.nav-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Modal styles */
.project-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: var(--bg-secondary);
  padding: 2rem;
  border-radius: 12px;
  max-width: 800px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
}

.close-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 2rem;
  color: var(--text-primary);
  cursor: pointer;
}

.modal-details {
  margin-top: 1.5rem;
}

.detailed-summary {
  margin-bottom: 2rem;
  line-height: 1.6;
}

.project-images {
  margin: 2rem 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  width: 100%;
}

.project-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.project-image:hover {
  transform: scale(1.02);
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1rem 0;
}

.tag {
  padding: 0.25rem 0.75rem;
  background: var(--accent-color);
  color: var(--bg-primary);
  border-radius: 1rem;
  font-size: 0.875rem;
}

@media (max-width: 768px) {
  .project-card {
    min-width: 100%;
  }
  
  .carousel-track {
    transform: translateX(-${currentIndex * 100}%) !important;
  }
}
</style>
