<template>
  <div class="timeline-container" id="experience">
    <h2 class="section-title">Experience</h2>
    <div class="timeline">
      <div v-for="item in timelineItems" :key="item.id" class="timeline-item">
        <div class="timeline-content">
          <div class="date">{{ item.date }}</div>
          <h3>{{ item.title }}</h3>
          <h4>{{ item.company }}</h4>
          <p>{{ item.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const timelineItems = [
  {
    id: 1,
    date: '2023 - Present',
    title: 'Senior Software Engineer',
    company: 'Tech Company',
    description: 'Leading development of cloud-native applications using modern technologies.'
  },
  {
    id: 2,
    date: '2021 - 2023',
    title: 'Frontend Developer',
    company: 'Web Agency',
    description: 'Developed responsive web applications using Vue.js and React.'
  }
]
</script>

<style scoped>
.timeline-container {
  width: 100%;
  overflow: visible;
  padding: 2rem 0;
}

h2.section-title {
  font-size: 2.5rem;
  margin-bottom: 3rem;
  text-align: center;
}

.timeline {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
}

.timeline::before {
  content: '';
  position: absolute;
  width: 2px;
  background: var(--accent-color);
  top: 0;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}

.timeline-item {
  padding: 2rem 0;
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
}

.timeline-content {
  background: var(--bg-secondary);
  padding: 1.5rem;
  border-radius: 12px;
  width: calc(50% - 2rem);
  position: relative;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.timeline-item:nth-child(odd) .timeline-content {
  margin-right: auto;
}

.timeline-item:nth-child(even) .timeline-content {
  margin-left: auto;
}

.timeline-content::before {
  content: '';
  position: absolute;
  width: 1rem;
  height: 1rem;
  background: var(--accent-color);
  border-radius: 50%;
  top: 50%;
  transform: translateY(-50%);
}

.timeline-item:nth-child(odd) .timeline-content::before {
  right: -3rem;
}

.timeline-item:nth-child(even) .timeline-content::before {
  left: -3rem;
}

.date {
  color: var(--accent-color);
  font-weight: bold;
  margin-bottom: 0.5rem;
}

h3 {
  font-size: 1.25rem;
  margin: 0.5rem 0;
}

h4 {
  color: var(--text-secondary);
  margin-bottom: 1rem;
}

@media (max-width: 768px) {
  .timeline::before {
    left: 2rem;
  }

  .timeline-content {
    width: calc(100% - 4rem);
    margin-left: 4rem !important;
  }

  .timeline-content::before {
    left: -3rem !important;
  }
}
</style>
