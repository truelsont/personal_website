<template>
  <header class="header" :class="{ 'header-hidden': !isVisible }">
    <nav class="nav-links">
      <ul>
        <li><a href="#home" @click="scrollToSection('home')">Home</a></li>
        <li><a href="#timeline" @click="scrollToSection('timeline')">Timeline</a></li>
        <li><a href="#projects" @click="scrollToSection('projects')">Projects</a></li>
        <li><a href="#blog" @click="scrollToSection('blog')">Blog</a></li>
        <li><a href="#contact" @click="scrollToSection('contact')">Contact</a></li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isVisible = ref(true)
let lastScrollY = 0

const handleScroll = () => {
  const currentScrollY = window.scrollY
  isVisible.value = currentScrollY < lastScrollY || currentScrollY < 50
  lastScrollY = currentScrollY
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    const headerHeight = document.querySelector('.header')?.offsetHeight || 0
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
    const offsetPosition = elementPosition - headerHeight

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
}
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--header-height);
  background: var(--bg-secondary);
  z-index: 1000;
  transition: transform 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.header-hidden {
  transform: translateY(-100%);
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-links ul {
  display: flex;
  list-style: none;
  justify-content: center;
  margin: 0;
  padding: 0;
  gap: 2rem;
}

.nav-links a {
  color: var(--text-primary);
  text-decoration: none;
  font-size: 1rem;
  transition: color 0.2s ease;
}

.nav-links a:hover {
  color: var(--accent-color);
}

@media (max-width: 768px) {
  .nav-links {
    gap: 1rem;
  }

  .nav-links a {
    font-size: 0.9rem;
  }
}
</style>
