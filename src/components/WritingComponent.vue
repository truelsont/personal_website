<template>
  <div class="writing-section" id="writing">
    <div class="writing-header">
      <h2>Writing</h2>
    </div>
    
    <div class="writings-container">
      <div v-for="writing in sortedWritings" 
           :key="writing.title"
           class="writing-item">
        <div class="writing-title">
          <h3>{{ writing.title }}</h3>
          <span class="writing-date">{{ formatDate(writing.date) }}</span>
        </div>
        
        <div class="writing-summary">
          <p>{{ writing.description }}</p>
        </div>

        <div class="writing-actions">
          <template v-if="writing.type === 'markdown'">
            <a :href="writing.filePath"
               class="action-button read-button"
               target="_blank"
               @click.prevent="handleFileAction(writing.filePath, 'read')">
              Read
            </a>
          </template>
          <a :href="writing.filePath"
             :download="getFileName(writing.filePath)"
             class="action-button download-button"
             @click.prevent="handleFileAction(writing.filePath, 'download')">
            Download
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import writingData from '@/assets/component-data/writing-data.json'

interface Writing {
  title: string
  date: string
  type: 'markdown' | 'pdf'
  description: string
  filePath: string
  previewText?: string
}

// Filter out entries with invalid file paths and sort by date
const sortedWritings = computed(() => {
  return writingData.writings
    .filter((writing: Writing) => {
      try {
        return writing.filePath && writing.title && writing.date
      } catch (error) {
        console.warn('Invalid writing entry:', error)
        return false
      }
    })
    .sort((a: Writing, b: Writing) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
})

function formatDate(dateString: string): string {
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } catch (error) {
    console.warn('Invalid date:', dateString)
    return 'Date unavailable'
  }
}

function getFileName(filePath: string): string {
  try {
    return filePath.split('/').pop() || ''
  } catch (error) {
    console.warn('Invalid file path:', filePath)
    return ''
  }
}

function handleFileAction(filePath: string, action: 'read' | 'download') {
  try {
    // Check if file exists (you might want to implement a more robust check)
    fetch(filePath)
      .then(response => {
        if (!response.ok) throw new Error('File not found')
        if (action === 'download') {
          window.open(filePath, '_blank')
        } else {
          window.open(filePath, '_blank')
        }
      })
      .catch(error => {
        console.error('Error accessing file:', error)
        alert('Sorry, this file is currently unavailable')
      })
  } catch (error) {
    console.error('Error handling file action:', error)
    alert('Sorry, this file is currently unavailable')
  }
}
</script>

<style scoped>
.writing-section {
  padding: 4rem 2rem;
  max-width: var(--max-width);
  margin: 0 auto;
  width: 100%;
}

.writing-header {
  margin-bottom: 2rem;
}

.writing-header h2 {
  font-size: 2.5rem;
  color: var(--color-heading);
}

.writings-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: 600px;
  overflow-y: auto;
  padding-right: 1rem;
}

.writings-container::-webkit-scrollbar {
  width: 8px;
}

.writings-container::-webkit-scrollbar-track {
  background: var(--bg-secondary);
  border-radius: 4px;
}

.writings-container::-webkit-scrollbar-thumb {
  background: var(--accent-color);
  border-radius: 4px;
}

.writing-item {
  display: grid;
  grid-template-columns: 2fr 3fr 1fr;
  gap: 2rem;
  padding: 1.5rem;
  background: var(--bg-secondary);
  border-radius: 8px;
  align-items: center;
}

.writing-title {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.writing-title h3 {
  font-size: 1.2rem;
  color: var(--text-primary);
  margin: 0;
}

.writing-date {
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.writing-summary p {
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.4;
  margin: 0;
}

.writing-actions {
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
}

.action-button {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  font-size: 0.9rem;
  transition: background-color 0.3s ease;
  text-align: center;
  min-width: 80px;
}

.read-button {
  background-color: transparent;
  color: var(--text-primary);
  border: 1px solid var(--text-secondary);
}

.read-button:hover {
  background-color: var(--bg-primary);
}

.download-button {
  background-color: var(--accent-color);
  color: var(--bg-primary);
}

.download-button:hover {
  background-color: var(--accent-color-dark);
}

@media (max-width: 1024px) {
  .writing-item {
    grid-template-columns: 2fr 2fr 1fr;
    gap: 1rem;
  }
}

@media (max-width: 768px) {
  .writing-section {
    padding: 2rem 1rem;
  }

  .writing-item {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }

  .writing-actions {
    justify-content: flex-start;
  }

  .writings-container {
    max-height: 500px;
  }
}
</style>
