<template>
  <div>
    <div class="flex justify-center">
      <button
        @click="isOpen = !isOpen"
        class="flex items-center text-sm font-semibold tracking-wide text-gray-600 hover:text-gray-800 focus:text-gray-800 focus:outline-none"
      >
        Add Card
        <svg class="h-6 w-6 fill-current" viewBox="0 0 30 30">
          <path d="M20.64 15.64H15.64V20.64H14V15.64H9V14H14V9H15.64V14H20.64V15.64Z" />
        </svg>
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
import CardService from '@/services/CardService';
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
        const payload = {
          title: this.title,
          description: this.description,
          listId: this.listId
        };
        try {
          let card = (await CardService.post(payload)).data;
          //BoardId used for socket io
          card.boardId = this.$store.state.board._id;
          this.$store.dispatch('addCard', card);
          this.$socket.emit('addCard', card);
          //reset component
          this.isOpen = false;
          this.title = null;
          this.description = null;
        } catch (error) {
          console.log(error);
        }
      }
    }
  }
};
</script>

<style>
</style>