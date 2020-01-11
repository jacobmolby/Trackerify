<template>
  <div>
    <button
      class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:bg-green-600"
      @click="isOpen = !isOpen"
    >Create New Board</button>
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
            class="mt-2 py-2 text-white bg-indigo-400 rounded shadow hover:bg-indigo-500"
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
    const handleEscape = e => {
      if (e.key === 'Esc' || e.key === 'Escape') {
        this.isOpen = false;
      }
    };
    document.addEventListener('keydown', handleEscape);
    this.$once('hook:beforeDestroy', () => {
      document.removeEventListener('keydown', handleEscape);
    });
  }
};
</script>

<style>
</style>