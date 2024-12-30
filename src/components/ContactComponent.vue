<template>
  <div class="contact-container" id="contact">
    <h2 class="section-title">Get in Touch</h2>
    <div class="contact-content">
      <div class="contact-info">
        <h3>Let's Connect</h3>
        <p>Feel free to reach out for collaborations, opportunities, or just to say hello!</p>
        <div class="contact-links">
          <a href="mailto:your.email@example.com" class="contact-link">
            <i class="fas fa-envelope"></i>
            your.email@example.com
          </a>
          <a href="https://github.com/yourusername" target="_blank" class="contact-link">
            <i class="fab fa-github"></i>
            GitHub
          </a>
          <a href="https://linkedin.com/in/yourusername" target="_blank" class="contact-link">
            <i class="fab fa-linkedin"></i>
            LinkedIn
          </a>
        </div>
      </div>
      <form class="contact-form" @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" id="name" v-model="form.name" required />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="form.email" required />
        </div>
        <div class="form-group">
          <label for="message">Message</label>
          <textarea id="message" v-model="form.message" required></textarea>
        </div>
        <button type="submit" class="submit-btn">Send Message</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const form = reactive({
  name: '',
  email: '',
  message: ''
})

const handleSubmit = () => {
  // Handle form submission
  console.log('Form submitted:', form)
}
</script>

<style scoped>
.contact-container {
  width: 100%;
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  max-width: 1000px;
  margin: 0 auto;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.contact-info h3 {
  font-size: 2rem;
  color: var(--accent-color);
}

.contact-info p {
  font-size: 1.1rem;
  line-height: 1.6;
}

.contact-links {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: var(--text-primary);
  text-decoration: none;
  font-size: 1.1rem;
  transition: color 0.2s ease;
}

.contact-link:hover {
  color: var(--accent-color);
}

.contact-link i {
  width: 24px;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  font-size: 0.9rem;
  color: var(--text-secondary);
}

input, textarea {
  padding: 0.75rem;
  background: var(--bg-secondary);
  border: 1px solid var(--text-secondary);
  border-radius: 4px;
  color: var(--text-primary);
  font-size: 1rem;
}

textarea {
  min-height: 150px;
  resize: vertical;
}

.submit-btn {
  background: var(--accent-color);
  color: var(--bg-primary);
  border: none;
  padding: 1rem;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.submit-btn:hover {
  opacity: 0.9;
}

@media (max-width: 768px) {
  .contact-content {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}
</style>
