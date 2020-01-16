
<template>
  <div>
    <button
      @click="isOpen = !isOpen"
      class="w-full inline-flex items-center justify-center px-2 py-2 text-sm font-medium text-white bg-gray-800 rounded hover:bg-gray-700"
    >
      <svg class="h-4 w-4 fill-current" viewBox="0 0 20 20">
        <path d="M7 8a4 4 0 110-8 4 4 0 010 8zm0 1c2.15 0 4.2.4 6.1 1.09L12 16h-1.25L10 20H4l-.75-4H2L.9 10.09A17.93 17.93 0 017 9zm8.31.17c1.32.18 2.59.48 3.8.92L18 16h-1.25L16 20h-3.96l.37-2h1.25l1.65-8.83zM13 0a4 4 0 11-1.33 7.76 5.96 5.96 0 000-7.52C12.1.1 12.53 0 13 0z"/></svg>
      <span class="ml-1">Add User</span>
    </button>
    <portal to="popup-container" v-if="isOpen">
      <button @click="isOpen = false" tabindex="-1" class="popup-bg"></button>
      <div class="popup">
        <h2 class="text-left text-lg font-semibold">Add User To Board</h2>

        <form class="pt-3 flex flex-col" @submit.prevent="addUserToBoard">
          <input
            v-model="userId"
            class="p-2 rounded border border-gray-400"
            type="text"
            placeholder="UserId"
          />
          <div class="text-red-500 font-semibold">{{this.error}}</div>
          <button
            type="submit"
            class="mt-2 py-2 text-white bg-indigo-400 rounded shadow hover:bg-indigo-500"
          >Add User</button>
        </form>
      </div>
    </portal>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import UserBoardService from '@/services/UserBoardService';

export default {
  data() {
    return {
      isOpen: false,
      userId: null,
      error: null
    };
  },
  computed: {
    ...mapState({
      boardId: state => state.board._id
    })
  },
  methods: {
    async addUserToBoard() {
      //TODO check if the user is in the board client side
      this.error = null;

      if (!this.userId || !this.userId.match(/^[0-9a-fA-F]{24}$/)) {
        return (this.error = 'Please enter a valid user ID.');
      }

      const payload = {
        boardId: this.boardId,
        userId: this.userId
      };
      try {
        const user = (await UserBoardService.post(payload)).data;

        const storePayload = {
          user,
          boardId: this.boardId
        };

        this.$store.dispatch('addUserToBoard', storePayload);
        this.$socket.emit('addUserToBoard', storePayload);
        this.userId = null;
        this.isOpen = false;
      } catch (error) {
        this.error = error.response.data.error;
        console.log(error.response.data.error);
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