<template>
  <div>
    <div class="flex justify-center">
      <button
        @click="isOpen = !isOpen"
        class="flex items-center text-sm font-semibold tracking-wide text-gray-600 hover:text-gray-800 focus:text-gray-800 focus:outline-none"
      >
        <svg class="h-4 w-4 fill-current" viewBox="0 0 20 20">
          <path
            d="M11 9h4v2h-4v4H9v-4H5V9h4V5h2v4zm-1 11a10 10 0 110-20 10 10 0 010 20zm0-2a8 8 0 100-16 8 8 0 000 16z"
          />
        </svg>
        <span class="ml-1">Add Card</span>
      </button>
      <portal to="popup-container" v-if="isOpen">
        <button @click="isOpen = false" tabindex="-1" class="popup-bg"></button>
        <div class="popup">
          <h2 class="text-left text-lg font-semibold">Add Card</h2>
          <form class="pt-3 flex flex-col" @submit.prevent="addCard">
            <input
              v-model="title"
              class="p-2 rounded border border-gray-400"
              type="text"
              placeholder="Card Name"
            />
            <input
              v-model="description"
              class="mt-2 p-2 rounded border border-gray-400"
              type="text"
              placeholder="Description"
            />
            <div v-if="error">{{this.error}}</div>
            <button
              class="mt-2 py-2 text-white bg-indigo-400 rounded shadow hover:bg-indigo-500"
            >Add New Card</button>
          </form>
        </div>
      </portal>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddCard',
  props: ['listId'],
  data() {
    return {
      isOpen: false,
      title: null,
      description: null,
      error: null
    };
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
  },
  methods: {
    async addCard() {
      this.error = null;
      if (!this.title) {
        return (this.error = 'Please enter a title.');
      }
      if (this.title && this.title.trim() === '') {
        this.title = null;
        return (this.error = 'Please enter a title.');
      }
      if (this.title) {
        try {
          await this.$store.dispatch('addCard', {
            title: this.title,
            description: this.description,
            listId: this.listId
          });
          //reset component
          this.isOpen = false;
          this.title = null;
          this.description = null;
        } catch (error) {
          this.error = error.response.data.error;
          console.log(error.response.data.error);
        }
      }
    }
  }
};
</script>

<style>
</style>