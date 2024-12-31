<template>
  <div class="app-container">
    <HeaderComponent />
    <main class="content">
      <SummaryComponent />
      <TimelineComponent />
      <ProjectShowcaseComponent />
      <WritingComponent />
      <ContactComponent />
    </main>
  </div>
</template>

<script setup lang="ts">
import TimelineComponent from './components/TimelineComponent.vue'
import ProjectShowcaseComponent from './components/ProjectShowcaseComponent.vue'
import SummaryComponent from './components/SummaryComponent.vue'
import HeaderComponent from './components/HeaderComponent.vue'
import WritingComponent from './components/WritingComponent.vue'
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
  --max-width: 1200px;
}

html {
  scroll-behavior: smooth;
  scroll-padding-top: var(--header-height);
}

body {
  margin: 0;
  padding: 0;
  background: var(--bg-primary);
  color: var(--text-primary);
  font-family: Arial, sans-serif;
  min-height: 100vh;
}

.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.content {
  width: 100%;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  margin-top: var(--header-height);
}

@media (max-width: 768px) {
  .content {
    padding: 0 0.5rem;
  }
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