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
          <template v-if="writing.type === 'external'">
            <a :href="writing.filePath"
               class="action-button external-button"
               target="_blank"
               rel="noopener noreferrer">
              Visit
            </a>
          </template>
          <template v-if="writing.type === 'pdf'">
            <a :href="writing.filePath"
               download
               class="action-button download-button">
              Download
            </a>
          </template>
          <template v-if="writing.type === 'markdown'">
            <button
              class="action-button read-button"
              @click="openMarkdownModal(writing)"
              :disabled="isLoading"
            >
              {{ isLoading ? 'Loading...' : 'Read' }}
            </button>
          </template>
        </div>
      </div>
    </div>

    <!-- Markdown Reading Modal -->
    <div v-if="showMarkdownModal" class="modal-overlay" @click="closeMarkdownModal">
      <div class="modal-content" @click.stop>
        <button class="close-button" @click="closeMarkdownModal">&times;</button>
        <div v-if="currentWriting" class="modal-header">
          <h2>{{ currentWriting.title }}</h2>
          <span class="modal-date">{{ formatDate(currentWriting.date) }}</span>
        </div>
        <div class="markdown-content" v-html="parsedMarkdown"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { marked } from 'marked'
import writingData from '@/assets/component-data/writing-data.json'

interface Writing {
  title: string
  date: string
  type: 'markdown' | 'pdf' | 'external'
  description: string
  filePath: string
  previewText?: string
}

// State
const showMarkdownModal = ref(false)
const currentWriting = ref<Writing | null>(null)
const parsedMarkdown = ref('')
const isLoading = ref(false)

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

// Format date for display
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

// Get filename from path
function getFileName(filePath: string): string {
  try {
    return filePath.split('/').pop() || ''
  } catch (error) {
    console.warn('Invalid file path:', filePath)
    return ''
  }
}

// Handle markdown reading
async function openMarkdownModal(writing: Writing) {
  try {
    isLoading.value = true
    currentWriting.value = writing
    
    const response = await fetch(writing.filePath)
    if (!response.ok) throw new Error('Failed to fetch markdown content')
    
    const markdown = await response.text()
    parsedMarkdown.value = marked(markdown)
    showMarkdownModal.value = true
  } catch (error) {
    console.error('Error loading markdown:', error)
    alert('Failed to load the article. Please try again later.')
  } finally {
    isLoading.value = false
  }
}

// Handle file downloads
async function handleFileDownload(writing: Writing) {
  try {
    isLoading.value = true
    const response = await fetch(writing.filePath)
    if (!response.ok) throw new Error('Failed to fetch file')
    
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    
    const a = document.createElement('a')
    a.href = url
    a.download = getFileName(writing.filePath)
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    
    // Clean up the URL object after a short delay
    setTimeout(() => window.URL.revokeObjectURL(url), 100)
  } catch (error) {
    console.error('Error downloading file:', error)
    alert('Failed to download the file. Please try again later.')
  } finally {
    isLoading.value = false
  }
}

// Close markdown modal
function closeMarkdownModal() {
  showMarkdownModal.value = false
  currentWriting.value = null
  parsedMarkdown.value = ''
}

// Handle escape key press
function handleEscapeKey(event: KeyboardEvent) {
  if (event.key === 'Escape' && showMarkdownModal.value) {
    closeMarkdownModal()
  }
}

// Add and remove event listeners
onMounted(() => {
  document.addEventListener('keydown', handleEscapeKey)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscapeKey)
})
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
  text-align: center;
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
  gap: 1rem;
  justify-content: flex-end;
}

.action-button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  text-decoration: none;
  transition: opacity 0.2s;
  background: var(--accent-color);
  color: var(--bg-primary);
}

.action-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.action-button:not(:disabled):hover {
  opacity: 0.9;
}

/* Modal styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: var(--bg-primary);
  padding: 2rem;
  border-radius: 8px;
  max-width: 800px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
}

.close-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 2rem;
  color: var(--text-primary);
  cursor: pointer;
  padding: 0;
  line-height: 1;
}

.modal-header {
  margin-bottom: 2rem;
}

.modal-header h2 {
  margin: 0;
  color: var(--text-primary);
}

.modal-date {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.markdown-content {
  line-height: 1.6;
  color: var(--text-primary);
}

.markdown-content :deep(h1),
.markdown-content :deep(h2),
.markdown-content :deep(h3),
.markdown-content :deep(h4) {
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: var(--color-heading);
}

.markdown-content :deep(p) {
  margin-bottom: 1rem;
}

.markdown-content :deep(code) {
  background: var(--bg-secondary);
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-size: 0.9em;
}

.markdown-content :deep(pre) {
  background: var(--bg-secondary);
  padding: 1rem;
  border-radius: 4px;
  overflow-x: auto;
  margin: 1rem 0;
}

.markdown-content :deep(a) {
  color: var(--accent-color);
  text-decoration: none;
}

.markdown-content :deep(a:hover) {
  text-decoration: underline;
}

.markdown-content :deep(ul),
.markdown-content :deep(ol) {
  margin: 1rem 0;
  padding-left: 2rem;
}

.markdown-content :deep(blockquote) {
  border-left: 4px solid var(--accent-color);
  margin: 1rem 0;
  padding-left: 1rem;
  color: var(--text-secondary);
}

@media (max-width: 768px) {
  .writing-item {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .writing-actions {
    justify-content: flex-start;
  }

  .modal-content {
    padding: 1.5rem;
    width: 95%;
  }
}
</style>
