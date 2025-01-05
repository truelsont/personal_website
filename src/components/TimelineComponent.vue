<template>
  <div class="timeline-section" id="timeline">
    <div class="timeline-header">
      <h2>Experience Timeline</h2>
    </div>
    <div class="timeline-scroll">
      <div class="timeline-container">
        <div class="timeline-line"></div>
        
        <div v-for="(item, index) in items" 
             :key="index"
             class="timeline-item"
             :class="{ 
               'left': index % 2 === 0,
               'right': index % 2 === 1
             }"
             @click="selectItem(index)">
          <div class="timeline-content-wrapper">
            <div class="timeline-connector"></div>
            <div class="timeline-content">
              <div class="timeline-header">
                <h3>{{ item.title }}</h3>
                <div class="timeline-org">{{ item.organization }}</div>
                <div class="timeline-date">{{ item.date }}</div>
              </div>
              <img v-if="item.image" 
                   :src="getImageUrl(item.image)" 
                   :alt="item.title"
                   class="timeline-preview-image">
            </div>
          </div>
        </div>

        <!-- Expanded View -->
        <div v-if="selectedItem !== null" 
             class="timeline-expanded"
             @click.self="closeExpanded">
          <div class="expanded-content">
            <button class="close-button" @click="closeExpanded">&times;</button>
            <h3>{{ items[selectedItem].title }}</h3>
            <div class="timeline-org">{{ items[selectedItem].organization }}</div>
            <div class="timeline-date">{{ items[selectedItem].date }}</div>
            <div class="expanded-details">
              <!-- Main image -->
              <img v-if="items[selectedItem].image" 
                   :src="getImageUrl(items[selectedItem].image)" 
                   :alt="items[selectedItem].title"
                   class="main-image">
              
              <!-- Additional images if they exist -->
              <div v-if="items[selectedItem].additionalImages" class="additional-images">
                <img v-for="(imagePath, imgIndex) in items[selectedItem].additionalImages"
                     :key="imgIndex"
                     :src="getImageUrl(imagePath)"
                     :alt="`${items[selectedItem].title} - ${imgIndex + 2}`"
                     class="additional-image">
              </div>
              <p>{{ items[selectedItem].summary }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import timelineData from '@/assets/component-data/timeline-data.json'

const currentIndex = ref(0)
const selectedItem = ref(null)
const items = ref([])
const imageUrls = ref<Record<string, string>>({})

// Use Vite's glob import to get all timeline images
const images = import.meta.glob('../assets/images/**/*')
console.log('Available images:', images)

onMounted(async () => {
  items.value = timelineData.items
  console.log('Timeline items:', items.value)

  // Load all images for all timeline items
  for (const item of items.value) {
    if (item.image) {
      const mainPath = `../assets/images${item.image}`
      console.log('Looking for image at:', mainPath)
      if (images[mainPath]) {
        try {
          const module = await images[mainPath]()
          imageUrls.value[item.image] = module.default
          console.log('Successfully loaded image:', item.image)
        } catch (error) {
          console.error(`Failed to load image: ${item.image}`, error)
        }
      } else {
        console.warn('Image not found:', mainPath)
      }
    }
  }
  console.log('Final imageUrls:', imageUrls.value)
})

const selectItem = (index) => {
  selectedItem.value = index
}

const closeExpanded = () => {
  selectedItem.value = null
}

const getImageUrl = (path: string) => {
  return imageUrls.value[path] || ''
}
</script>

<style scoped>
.timeline-section {
  width: 100%;
  padding: 1rem 0 4rem;
  display: flex;
  flex-direction: column;
  max-height: 90vh;
}

.timeline-scroll {
  height: 100%;
  flex-grow: 1;
  overflow-y: auto;
  padding: 2rem 0;
}

.timeline-container {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 0;
}

.timeline-line {
  position: absolute;
  width: 4px;
  height: 100%;
  background: var(--accent-color);
  z-index: 1;
}

.timeline-line::before,
.timeline-line::after {
  content: '';
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  background: var(--bg-primary);
  padding: 0.5rem;
  font-size: 0.9rem;
  color: var(--text-secondary);
  white-space: nowrap;
  z-index: 2;
}

.timeline-line::before {
  content: 'Present';
  top: -3rem;
}

.timeline-line::after {
  content: 'January 2020';
  bottom: -3rem;
}

.timeline-item {
  width: 100%;
  display: flex;
  margin: 2rem 0;
  align-items: center;
}

.timeline-item.left {
  justify-content: flex-end;
}

.timeline-item.right {
  justify-content: flex-start;
}

.timeline-content-wrapper {
  width: 400px;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.timeline-item.left .timeline-content-wrapper {
  flex-direction: row-reverse;
  margin-right: 50%;
  padding-right: 1rem;
}

.timeline-item.right .timeline-content-wrapper {
  margin-left: 50%;
  padding-left: 1rem;
}

.timeline-connector {
  width: 3rem;
  height: 2px;
  background: var(--accent-color);
}

.timeline-content {
  flex: 1;
  background: var(--bg-secondary);
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
}

.timeline-content:hover {
  transform: translateX(5px);
}

.timeline-header {
  text-align: center;
  margin-bottom: 2rem;
}

.timeline-header h2 {
  font-size: 2.5rem;
  color: var(--color-heading);
}

.timeline-org {
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

.timeline-date {
  color: var(--accent-color);
  font-size: 0.9rem;
  margin-top: 0.25rem;
}

.timeline-preview-image {
  width: 100%;
  height: auto;
  max-height: 200px;
  object-fit: contain;
  border-radius: 8px;
  margin-top: 1rem;
}

.main-image {
  width: 100%;
  height: auto;
  max-height: 400px;
  object-fit: contain;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.additional-images {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.additional-image {
  width: 100%;
  height: auto;
  max-height: 150px;
  object-fit: contain;
  border-radius: 8px;
  transition: transform 0.2s;
}

.additional-image:hover {
  transform: scale(1.05);
}

/* Expanded view */
.timeline-expanded {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.expanded-content {
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
  color: var(--text-primary);
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
}

.expanded-details {
  margin-top: 2rem;
}

.expanded-details p {
  line-height: 1.6;
  color: var(--text-secondary);
}

@media (max-width: 768px) {
  .timeline-section {
    padding: 0.5rem;
    max-height: calc(100vh - 100px);
    overflow-y: auto;
  }

  .timeline-container {
    padding: 1rem 0;
  }

  .timeline-line {
    display: none;
  }

  .timeline-item {
    width: 100%;
    margin: 0.5rem 0;
  }

  .timeline-item.left,
  .timeline-item.right {
    justify-content: center;
    padding: 0;
  }

  .timeline-content-wrapper {
    width: 95%;
    margin: 0 !important;
  }

  .timeline-connector {
    display: none;
  }

  .timeline-content {
    width: 100%;
    padding: 1rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    background: var(--bg-secondary);
  }

  .timeline-header {
    margin-bottom: 0.75rem;
  }

  .timeline-header h2 {
    font-size: 1.4rem;
  }

  .timeline-preview-image {
    max-height: 150px;
  }

  .additional-images {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
}
</style>
