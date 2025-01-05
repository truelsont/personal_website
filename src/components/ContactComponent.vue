<template>
  <div class="contact-section" id="contact">
    <div class="contact-header">
      <h2>Thank You for Visiting!</h2>
      <p class="thank-you-message">
        I appreciate you taking the time to explore my portfolio. If you'd like to connect or discuss potential opportunities,
        here's how you can reach me:
      </p>
    </div>
    <div class="contact-grid">
      <a v-for="contact in contactInfo" 
         :key="contact.type"
         :href="contact.link"
         target="_blank"
         rel="noopener noreferrer"
         class="contact-card"
         :style="{ '--card-color': contact.color }">
        <div class="card-content">
          <span class="icon">{{ contact.icon }}</span>
          <h3>{{ contact.type }}</h3>
          <p>{{ contact.value }}</p>
        </div>
        <div class="card-overlay"></div>
      </a>
    </div>

    <div class="resume-section">
      <a :href="resumeInfo.link"
         download
         class="resume-card"
         :style="{ '--card-color': resumeInfo.color }">
        <div class="card-content">
          <span class="icon">{{ resumeInfo.icon }}</span>
          <h3>{{ resumeInfo.title }}</h3>
          <p>{{ resumeInfo.description }}</p>
          <span class="last-updated">Last updated: {{ resumeInfo.lastUpdated }}</span>
        </div>
        <div class="card-overlay"></div>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import contactData from '@/assets/component-data/contact-data.json'
const resumeInfo = contactData.resume
const contactInfo = contactData.contactInfo
</script>

<style scoped>
.contact-section {
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
}

.contact-header {
  text-align: center;
  max-width: 800px;
}

h2 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: var(--color-heading);
}

.thank-you-message {
  font-size: 1.2rem;
  line-height: 1.6;
  color: var(--text-secondary);
  margin: 0 auto;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  width: 100%;
  justify-items: center;
}

.resume-section {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.contact-card, .resume-card {
  position: relative;
  width: 100%;
  max-width: 350px;
  height: 200px;
  border-radius: 15px;
  overflow: hidden;
  text-decoration: none;
  color: var(--text-primary);
  background: var(--bg-secondary);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.resume-card {
  max-width: 400px;
}

.contact-card:hover, .resume-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.card-content {
  position: relative;
  z-index: 1;
  height: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: var(--bg-secondary);
  transition: background-color 0.3s ease;
}

.contact-card:hover .card-content,
.resume-card:hover .card-content {
  background-color: var(--card-color);
  color: white;
}

.icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

p {
  font-size: 1rem;
  opacity: 0.9;
}

.last-updated {
  font-size: 0.875rem;
  opacity: 0.8;
  margin-top: 0.5rem;
}

.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    var(--card-color) 0%,
    transparent 100%
  );
  opacity: 0.1;
  transition: opacity 0.3s ease;
}

.contact-card:hover .card-overlay,
.resume-card:hover .card-overlay {
  opacity: 0.2;
}

@media (max-width: 1024px) {
  .contact-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .contact-section {
    padding: 1rem;
  }

  .contact-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
    padding: 0;
  }
  
  .contact-card, .resume-card {
    max-width: 100%;
    height: auto;
    box-shadow: none;
    border: 1px solid var(--border-color);
    background: var(--bg-secondary);
  }

  .resume-card {
    grid-column: span 2;
  }

  .contact-header {
    padding: 0;
    margin-bottom: 1rem;
  }

  h2 {
    font-size: 1.75rem;
  }

  .thank-you-message {
    font-size: 1rem;
  }

  .icon {
    display: none;
  }

  .card-content {
    padding: 0.5rem;
    min-height: unset;
  }

  .card-content h3 {
    margin: 0;
    font-size: 0.9rem;
    text-align: center;
  }

  .card-content p {
    display: none;
  }

  .card-overlay {
    display: none;
  }

  .last-updated {
    font-size: 0.8rem;
  }
}
</style>
