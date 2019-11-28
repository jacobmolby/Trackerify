<template>
  <div>
    <button @click="isOpen = !isOpen">
      <svg
        class="mx-1 h-8 w-8 rounded-full border border-dashed border-gray-500 fill-current text-gray-500"
        viewBox="0 0 30 30"
      >
        <path d="M20.64 15.64H15.64V20.64H14V15.64H9V14H14V9H15.64V14H20.64V15.64Z" />
      </svg>
    </button>
    <button
      v-if="isOpen"
      @click="isOpen = false"
      tabindex="-1"
      class="fixed inset-0 h-full w-full bg-black opacity-25 cursor-default"
    ></button>
    <div v-if="isOpen" class="popup bg-white shadow-xl rounded p-6 text-gray-700">
      <h2 class="text-left text-lg font-semibold">Add User To Card</h2>
      <form class="pt-3 flex flex-col" @submit.prevent="addUserToCard">
        <select v-model="userId" class="p-2 border-2 rounded">
          <option disabled value>Please select one</option>
          <!-- TODO remove users already in the card -->
          <option v-for="user in users" :key="user._id" :value="user._id">{{user.name}}</option>
        </select>
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
import UserCardService from '@/services/UserCardService';
export default {
  data() {
    return {
      isOpen: false,
      error: null,
      userId: ''
    };
  },
  computed: {
    ...mapState({
      users: state => state.board.users
    })
  },
  props: { cardId: String },
  methods: {
    async addUserToCard() {
      this.error = null;

      if (!this.userId) {
        return (this.error = 'Please choose a user');
      }

      const payload = {
        cardId: this.cardId,
        userId: this.userId
      };
      try {
        const response = (await UserCardService.post(payload)).data;
        console.log(response);

        this.$store.dispatch('addUserToCard', response);
        this.userId = '';
        this.isOpen = false;
      } catch (error) {
        this.error = error.response.data.error;
        //console.log(error.response.data.error);
      }
    }
  }
};
</script>

<style>
</style>