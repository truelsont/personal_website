<template>
  <div class="summary-section" id="home">
    <div class="profile-container">
      <div class="profile-image-container">
        <img :src="imageUrl" :alt="summaryData.name" class="profile-image">
      </div>
      <div class="profile-text">
        <h1>{{ summaryData.name }}</h1>
        <h2>{{ summaryData.title }}</h2>
        <p class="location">{{ summaryData.location }}</p>
        <p class="short-bio">{{ summaryData.shortBio }}</p>
      </div>
    </div>

    <div class="description">
      <p v-for="(paragraph, index) in summaryData.description" 
         :key="index" 
         class="description-paragraph">
        {{ paragraph }}
      </p>
      <p class="highlights">{{ summaryData.highlights }}</p>
    </div>

    <div class="skills-section">
      <div class="skills-category">
        <h3>Languages</h3>
        <div class="skills-tags">
          <span v-for="lang in summaryData.skills.languages" 
                :key="lang" 
                class="skill-tag">{{ lang }}</span>
        </div>
      </div>
      <div class="skills-category">
        <h3>Tools</h3>
        <div class="skills-tags">
          <span v-for="tool in summaryData.skills.tools" 
                :key="tool" 
                class="skill-tag">{{ tool }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import summaryData from '@/assets/component-data/summary-data.json'
import { ref, onMounted } from 'vue'

const imageUrl = ref('')

// Use Vite's glob import to get all images
const images = import.meta.glob('../assets/images/*')

onMounted(async () => {
  const imagePath = `../assets/${summaryData.profileImage}`
  if (images[imagePath]) {
    const module = await images[imagePath]()
    imageUrl.value = module.default
  } else {
    console.error(`Image not found: ${imagePath}`)
  }
})
</script>

<style scoped>
.summary-section {
  padding: 4rem 2rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

.profile-container {
  display: flex;
  align-items: center;
  gap: 3rem;
  margin-bottom: 3rem;
}

.profile-image-container {
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-image {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border: 4px solid var(--accent-color);
}

.profile-text {
  flex: 1;
}

h1 {
  font-size: 3rem;
  margin-bottom: 0.5rem;
  color: var(--color-heading);
}

h2 {
  font-size: 1.8rem;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
}

.location {
  font-size: 1.2rem;
  color: var(--text-secondary);
  margin-bottom: 1rem;
}

.short-bio {
  font-size: 1.4rem;
  line-height: 1.6;
}

.description {
  margin: 2rem 0;
}

.description-paragraph {
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 1rem;
  color: var(--text-secondary);
}

.highlights {
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--text-secondary);
  margin-top: 1rem;
  font-style: italic;
}

.skills-section {
  margin: 2rem 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.skills-category h3 {
  font-size: 1.4rem;
  margin-bottom: 1rem;
  color: var(--accent-color);
}

.skills-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.skill-tag {
  background: var(--bg-secondary);
  color: var(--text-primary);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  transition: background-color 0.3s ease;
}

.skill-tag:hover {
  background: var(--accent-color);
  color: var(--bg-primary);
}

@media (max-width: 768px) {
  .profile-container {
    flex-direction: column;
    text-align: center;
    gap: 2rem;
  }

  .profile-image-container {
    margin: 0 auto;
  }

  h1 {
    font-size: 2.5rem;
  }

  h2 {
    font-size: 1.5rem;
  }

  .short-bio {
    font-size: 1.2rem;
  }

  .description-paragraph {
    font-size: 1rem;
  }

  .skills-section {
    grid-template-columns: 1fr;
  }
}
</style>
