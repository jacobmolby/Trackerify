
<template>
  <div>
    <button @click="$store.dispatch('addUserIsOpen',true)" class="btn btn-gray w-full">
      <svg class="h-4 w-4 hidden sm:block fill-current" viewBox="0 0 20 20">
        <path
          d="M2 6H0v2h2v2h2V8h2V6H4V4H2v2zm7 0a3 3 0 0 1 6 0v2a3 3 0 0 1-6 0V6zm11 9.14A15.93 15.93 0 0 0 12 13c-2.91 0-5.65.78-8 2.14V18h16v-2.86z"
        />
      </svg>
      <span class="ml-0 sm:ml-1 whitespace-no-wrap">Add User</span>
    </button>
    <portal to="popup-container" v-if="addUserIsOpen">
      <button @click="$store.dispatch('addUserIsOpen',false)" tabindex="-1" class="popup-bg"></button>
      <div class="popup">
        <div class="flex items-center justify-between border-b">
          <h2 class="text-left text-lg font-semibold">Add User To Board</h2>
          <button class="ml-4 hover:text-gray-900" @click="$store.dispatch('addUserIsOpen', false)">
            <svg class="h-4 w-4 fill-current" viewBox="0 0 20 20">
              <path
                d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"
              />
            </svg>
          </button>
        </div>
        <form @submit.prevent="search" class="mt-2 flex">
          <input
            class="w-full p-2 rounded-l rounded-r-none border-t border-l border-b border-gray-400"
            v-model.trim="searchInput"
            type="search"
            placeholder="Name or Email"
          />
          <button
            type="submit"
            class="py-2 px-4 rounded-r rounded-l-none bg-purple-800 hover:bg-purple-600"
          >
            <span class="text-white">Search</span>
          </button>
        </form>
        <div class="mt-2">
          <ul class="border rounded" v-if="searchResult.length > 0">
            <li
              class="border-t first:border-t-0 rounded-none first:rounded-t last:rounded-b hover:bg-green-400 odd:bg-gray-100"
              v-for="user in searchResult"
              :key="user._id"
            >
              <button
                @click="addUserToBoard(user._id)"
                class="w-full text-left py-1 px-2 hover:text-white"
              >{{user.name}}</button>
            </li>
          </ul>
          <div class="text-gray-700">{{searchMessage}}</div>
        </div>
      </div>
    </portal>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import UserBoardService from '../../services/UserBoardService';
import UserSearchService from '../../services/UserSearchService';

export default {
  data() {
    return {
      isOpen: false,
      userId: null,
      searchInput: '',
      searchMessage: '',
      searchResult: []
    };
  },
  computed: {
    ...mapState({
      board: state => state.board
    }),
    ...mapState(['addUserIsOpen'])
  },
  methods: {
    filterSearchResult(searchResult) {
      for (let i = searchResult.length - 1; i >= 0; i--) {
        for (let j = 0; j < this.board.users.length; j++) {
          if (
            searchResult[i] &&
            searchResult[i]._id === this.board.users[j]._id
          ) {
            searchResult.splice(i, 1);
          }
        }
      }

      return searchResult;
    },
    async search() {
      this.searchMessage = 'Loading...';
      this.searchResult = [];
      try {
        const response = (await UserSearchService.get(this.searchInput)).data;

        if (response.length > 0) {
          this.searchResult = this.filterSearchResult(response);
          if (this.searchResult.length > 0) {
            this.searchMessage = '';
          } else {
            this.searchMessage =
              'Users found were already assigned to this board.';
          }
        } else {
          this.searchMessage = 'No search result.';
        }
      } catch (error) {
        this.searchMessage = error.response.data.error;
      }
    },
    async addUserToBoard(userId) {
      this.searchMessage = null;

      const payload = {
        boardId: this.board._id,
        userId
      };
      try {
        const user = (await UserBoardService.post(payload)).data;

        const storePayload = {
          user,
          boardId: this.board._id
        };

        this.$store.dispatch('addUserToBoard', storePayload);
        this.searchInput = '';
        this.searchResult = [];
        this.$store.dispatch('addUserIsOpen', false);
      } catch (error) {
        this.searchMessage = error.response.data.error;
      }
    }
  },
  created() {
    const handleEscape = e => {
      if (this.addUserIsOpen && (e.key === 'Esc' || e.key === 'Escape')) {
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