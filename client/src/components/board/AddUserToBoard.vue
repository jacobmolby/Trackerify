
<template>
  <div>
    <button @click="$store.dispatch('addUserIsOpen',true)" class="primary-btn w-full">
      <svg class="h-4 w-4 hidden sm:block fill-current" viewBox="0 0 20 20">
       <path d="M2 6H0v2h2v2h2V8h2V6H4V4H2v2zm7 0a3 3 0 0 1 6 0v2a3 3 0 0 1-6 0V6zm11 9.14A15.93 15.93 0 0 0 12 13c-2.91 0-5.65.78-8 2.14V18h16v-2.86z"/>
      </svg>
      <span class="ml-0 sm:ml-1 whitespace-no-wrap">Add User</span>
    </button>
    <portal to="popup-container" v-if="addUserIsOpen">
      <button @click="$store.dispatch('addUserIsOpen',false)" tabindex="-1" class="popup-bg"></button>
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
    }),
    ...mapState(['addUserIsOpen'])
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
        this.$store.dispatch('addUserIsOpen', false);
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