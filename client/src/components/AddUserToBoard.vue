<template>
  <div>
    <button @click="isOpen = !isOpen">
      <svg
        class="relativ mx-1 h-8 w-8 rounded-full border border-dashed border-gray-500 fill-current border-gray-500 text-gray-500"
        viewBox="0 0 30 30"
      >
        <path d="M20.64 15.64H15.64V20.64H14V15.64H9V14H14V9H15.64V14H20.64V15.64Z" />
      </svg>
    </button>
    <button
      v-if="isOpen"
      @click="isOpen = false"
      tabindex="-1"
      class="fixed z-10 inset-0 h-full w-full bg-black opacity-25 cursor-default"
    ></button>
    <div v-if="isOpen" class="p-6 popup bg-white shadow-xl rounded text-gray-700">
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

      if (!this.userId) {
        return (this.error = 'Please enter a user Id.');
      }

      const payload = {
        boardId: this.boardId,
        userId: this.userId
      };
      try {
        const user = (await UserBoardService.post(payload)).data;

        this.$store.dispatch('addUserToBoard', user);
        this.userId = null;
        this.isOpen = false;
      } catch (error) {
        this.error = error.response.data.error;
        console.log(error.response.data.error);
      }
    }
  }
};
</script>

<style>
</style>