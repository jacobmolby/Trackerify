<template>
  <div>
    <button v-if="notAssignedUsers.length > 0" @click="isOpen = !isOpen">
      <svg
        class="mx-1 h-6 w-6 rounded-full border border-dashed border-gray-500 fill-current text-gray-500"
        viewBox="0 0 30 30"
      >
        <path d="M20.64 15.64H15.64V20.64H14V15.64H9V14H14V9H15.64V14H20.64V15.64Z" />
      </svg>
    </button>
    <portal to="popup-container-important" v-if="isOpen">
      <button @click="isOpen = false" tabindex="-1" class="popup-bg"></button>
      <div class="popup">
        <h2 class="text-left text-lg font-semibold">Add User To Card</h2>
        <form class="pt-3 flex flex-col" @submit.prevent="addUserToCard">
          <select v-model="userId" class="p-2 border-2 rounded">
            <option disabled value>Please select one</option>
            <option v-for="user in notAssignedUsers" :key="user._id" :value="user._id">{{user.name}}</option>
          </select>
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
    card() {
      return this.$store.getters.getCardById(this.cardId);
    },
    // ...mapState({
    //   users: state => state.board.users
    // }),
    notAssignedUsers() {
      let allUsers = [...this.$store.state.board.users];
      for (let i = allUsers.length - 1; i >= 0; i--) {
        for (let j = 0; j < this.card.assignedUsers.length; j++) {
          if (
            allUsers[i] &&
            allUsers[i]._id === this.card.assignedUsers[j]._id
          ) {
            allUsers.splice(i, 1);
          }
        }
      }

      return allUsers;
    }
  },
  props: { cardId: String, assignedUsers: Array },
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
        let response = (await UserCardService.post(payload)).data;
        //TODO check om det stadig bliver brugt
        if (response.error) {
          return (this.error = response.error);
        }
        //Add board id for socket.io
        response.boardId = this.$store.state.board._id;
        this.$store.dispatch('addUserToCard', response);
        this.$socket.emit('addUserToCard', response);
        this.userId = '';
        this.isOpen = false;
      } catch (error) {
        this.error = error.response.data.error;
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