<template>
  <header class="header" :class="{ 'header-visible': isVisible, 'header-hidden': !isVisible }">
    <nav>
      <ul>
        <li><a href="#home" @click="scrollToSection('home')">Home</a></li>
        <li><a href="#timeline" @click="scrollToSection('timeline')">Timeline</a></li>
        <li><a href="#projects" @click="scrollToSection('projects')">Projects</a></li>
        <li><a href="#writing" @click="scrollToSection('writing')">Writings</a></li>
        <li><a href="#contact" @click="scrollToSection('contact')">Contact</a></li>
        <li><a :href="resumeInfo.link" download class="resume-link">Resume</a></li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import contactData from '@/assets/component-data/contact-data.json'

const isVisible = ref(true)
const lastScrollY = ref(0)
const mouseNearTop = ref(false)
const SHOW_HEADER_THRESHOLD = 50 // pixels from top to show header
const resumeInfo = contactData.resume

function updateHeaderVisibility(event?: MouseEvent) {
  const currentScrollY = window.scrollY
  const scrollingUp = currentScrollY < lastScrollY.value
  
  if (event) {
    // Update mouse position check
    mouseNearTop.value = event.clientY <= SHOW_HEADER_THRESHOLD
  }

  // Show header if:
  // 1. Mouse is near top OR
  // 2. Scrolling up OR
  // 3. At the top of the page
  isVisible.value = mouseNearTop.value || scrollingUp || currentScrollY === 0
  
  lastScrollY.value = currentScrollY
}

function scrollToSection(sectionId: string) {
  const element = document.getElementById(sectionId)
  if (element) {
    const headerHeight = document.querySelector('.header')?.getBoundingClientRect().height || 0
    const elementPosition = element.getBoundingClientRect().top + window.scrollY
    const offsetPosition = elementPosition - headerHeight

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
}

// Event listeners
onMounted(() => {
  window.addEventListener('scroll', () => updateHeaderVisibility())
  window.addEventListener('mousemove', updateHeaderVisibility)
})

onUnmounted(() => {
  window.removeEventListener('scroll', () => updateHeaderVisibility())
  window.removeEventListener('mousemove', updateHeaderVisibility)
})
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: var(--bg-primary);
  z-index: 1000;
  transition: transform 0.3s ease, opacity 0.3s ease;
  border-bottom: 1px solid var(--bg-secondary);
}

.header-visible {
  transform: translateY(0);
  opacity: 1;
}

.header-hidden {
  transform: translateY(-100%);
  opacity: 0;
}

nav {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 2rem;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
  height: var(--header-height);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
}

a {
  color: var(--text-primary);
  text-decoration: none;
  font-size: 1.1rem;
  transition: color 0.3s ease;
}

a:hover {
  color: var(--accent-color);
}

.resume-link {
  color: var(--color-primary);
  font-weight: 600;
}

.resume-link:hover {
  color: var(--color-primary-hover);
}

@media (max-width: 768px) {
  nav {
    padding: 0 1rem;
  }

  ul {
    gap: 1rem;
  }

  a {
    font-size: 1rem;
  }
}
</style>
