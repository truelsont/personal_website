<template>
  <div class="container">
    <HeaderComponent />
    <div class="content">
      <SummaryComponent />
      <TimelineComponent />
      <ProjectShowcaseComponent />
      <BlogComponent />
      <ContactComponent />
    </div>
  </div>
</template>

<script setup lang="ts">
import TimelineComponent from './components/TimelineComponent.vue'
import ProjectShowcaseComponent from './components/ProjectShowcaseComponent.vue'
import SummaryComponent from './components/SummaryComponent.vue'
import HeaderComponent from './components/HeaderComponent.vue'
import BlogComponent from './components/BlogComponent.vue'
import ContactComponent from './components/ContactComponent.vue'
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --text-primary: #f8f9fa;
  --text-secondary: #e9ecef;
  --bg-primary: #1a1a1a;
  --bg-secondary: #2c2c2c;
  --accent-color: #42b983;
  --header-height: 60px;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  padding: 0;
  background: var(--bg-primary);
  color: var(--text-primary);
  font-family: Arial, sans-serif;
  overflow-y: auto;
}

#app {
  width: 100%;
  margin: 0 !important;
  padding: 0 !important;
  max-width: none !important;
}

.container {
  width: 100%;
}

.content {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  padding-top: calc(var(--header-height) + 2rem);
  display: flex;
  flex-direction: column;
  gap: 6rem;
}

h1 {
  font-size: 4rem;
  font-weight: bold;
}

.section-title {
  font-size: 2.5rem;
  margin-bottom: 3rem;
  text-align: center;
}
</style>