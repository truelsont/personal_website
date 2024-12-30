<template>
  <div class="blog-container" id="blog">
    <h2 class="section-title">Blog</h2>
    <div class="blog-grid">
      <article v-for="post in blogPosts" :key="post.id" class="blog-card">
        <div class="blog-image">
          <img :src="post.image" :alt="post.title" />
        </div>
        <div class="blog-content">
          <div class="blog-date">{{ post.date }}</div>
          <h3>{{ post.title }}</h3>
          <p>{{ post.excerpt }}</p>
          <a :href="post.link" class="read-more">Read More</a>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
const blogPosts = [
  {
    id: 1,
    title: 'Building Modern Web Applications',
    date: 'Dec 29, 2023',
    excerpt: 'Exploring the latest trends and best practices in web development.',
    image: '/blog/web-dev.jpg',
    link: '#'
  },
  // Add more blog posts here
]
</script>

<style scoped>
.blog-container {
  width: 100%;
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 1rem 0;
}

.blog-card {
  background: var(--bg-secondary);
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.blog-card:hover {
  transform: translateY(-5px);
}

.blog-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.blog-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.blog-card:hover .blog-image img {
  transform: scale(1.05);
}

.blog-content {
  padding: 1.5rem;
}

.blog-date {
  color: var(--accent-color);
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

h3 {
  margin-bottom: 1rem;
  font-size: 1.25rem;
}

p {
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.read-more {
  color: var(--accent-color);
  text-decoration: none;
  font-weight: bold;
  transition: opacity 0.2s ease;
}

.read-more:hover {
  opacity: 0.8;
}

@media (max-width: 768px) {
  .blog-grid {
    grid-template-columns: 1fr;
  }
}
</style>
