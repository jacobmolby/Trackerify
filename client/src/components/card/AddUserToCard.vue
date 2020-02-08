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
        <div class="flex justify-between items-center">
          <h2 class="text-left text-lg font-semibold">Add User To Card</h2>
          <button @click="isOpen = !isOpen">
            <svg class="h-4 w-4 fill-current" viewBox="0 0 20 20">
              <path
                d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"
              />
            </svg>
          </button>
        </div>
        <form class="pt-3 flex flex-col" @submit.prevent="addUserToCard">
          <select v-model="userId" class="p-2 border-2 rounded">
            <option disabled value>Please select one</option>
            <option v-for="user in notAssignedUsers" :key="user._id" :value="user._id">{{user.name}}</option>
          </select>
          <div class="text-red-500 font-semibold">{{this.error}}</div>
          <button type="submit" class="mt-2 btn btn-gray">Add User</button>
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
    notAssignedUsers() {
      //Finds all the users in the board that is not already assigned to the card
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
      try {
        await this.$store.dispatch('addUserToCard', {
          cardId: this.cardId,
          userId: this.userId
        });
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