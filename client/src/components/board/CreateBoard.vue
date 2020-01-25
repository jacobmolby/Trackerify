<template>
  <div>
    <button @click="isOpen = !isOpen" class="primary-btn">
      <svg class="h-4 w-4 fill-current" viewBox="0 0 20 20">
        <path d="M12 4H8v12h4V4zm2 0v12h4V4h-4zM6 4H2v12h4V4zM0 2h20v16H0V2z" />
      </svg>
      <span class="ml-1">New Board</span>
    </button>
    <portal to="popup-container" v-if="isOpen">
      <button @click="isOpen = false" tabindex="-1" class="popup-bg"></button>
      <div class="popup">
        <h2 class="text-left text-lg font-semibold">Create Board</h2>
        <form class="pt-3 flex flex-col" @submit.prevent="createBoard">
          <input
            v-model="title"
            class="p-2 rounded border border-gray-400"
            type="text"
            placeholder="Board Name"
          />
          <div v-if="error">{{this.error}}</div>
          <button
            class="mt-2 py-2 text-white bg-indigo-600 rounded shadow hover:bg-indigo-500"
          >Create Board</button>
        </form>
      </div>
    </portal>
  </div>
</template>

<script>
import BoardService from '@/services/BoardService';
export default {
  data() {
    return {
      title: null,
      isOpen: false,
      error: null
    };
  },
  methods: {
    async createBoard() {
      this.error = null;
      if (!this.title || this.title.length < 1) {
        return (this.error = 'Please choose a title.');
      }
      try {
        await this.$store.dispatch('createBoard', { title: this.title });
        //reset component
        this.isOpen = false;
        this.title = null;
      } catch (error) {
        console.log(error);
      }
    }
  },
  created() {
    const handleKeyPresses = e => {
      if (e.key === 'Esc' || e.key === 'Escape') {
        this.isOpen = false;
      }
      if (e.key === 'b' && e.ctrlKey) {
        this.isOpen = !this.isOpen;
      }
    };
    document.addEventListener('keydown', handleKeyPresses);
    this.$once('hook:beforeDestroy', () => {
      document.removeEventListener('keydown', handleKeyPresses);
    });
  }
};
</script>

<style>
</style>