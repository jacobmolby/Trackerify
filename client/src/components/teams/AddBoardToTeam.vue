<template>
  <div>
    <button @click="isOpen = true" class="w-full primary-btn mt-2">
      <svg class="h-4 w-4 fill-current" viewBox="0 0 20 20">
        <path d="M12 4H8v12h4V4zm2 0v12h4V4h-4zM6 4H2v12h4V4zM0 2h20v16H0V2z" />
      </svg>
      <span class="ml-2">Add Board</span>
    </button>
    <portal to="popup-container" v-if="isOpen">
      <button @click="isOpen = false" tabindex="-1" class="popup-bg"></button>
      <div class="popup">
        <div class="flex items-center justify-between border-b">
          <h2 class="text-left text-lg font-semibold">Add Board</h2>
          <button class="ml-4 hover:text-gray-900" @click="isOpen = false">
            <svg class="h-4 w-4 fill-current" viewBox="0 0 20 20">
              <path
                d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"
              />
            </svg>
          </button>
        </div>
        <div class="mt-2 flex">
          <input
            @change="search"
            class="w-full p-2 rounded-l rounded-r-none border-t border-l border-b border-gray-400"
            v-model.trim="searchInput"
            type="search"
            placeholder="Title or the ID"
          />
          <button
            @click="search"
            class="py-2 px-4 rounded-r rounded-l-none bg-purple-800 hover:bg-purple-600"
          >
            <span class="text-white">Search</span>
          </button>
        </div>
        <div class="mt-2">
          <ul class="border rounded" v-if="searchResult.length > 0">
            <li
              class="border-t first:border-t-0 rounded-none first:rounded-t last:rounded-b hover:bg-green-400 odd:bg-gray-100"
              v-for="board in searchResult"
              :key="board._id"
            >
              <button
                @click="addBoardToTeam(board)"
                class="w-full text-left font-semibold text-gray-700 py-1 px-2 hover:text-white"
              >{{board.title}}</button>
            </li>
          </ul>
          <div class="text-gray-700">{{searchMessage}}</div>
        </div>
      </div>
    </portal>
  </div>
</template>
<script>
import BoardSearchService from '../../services/BoardSearchService';

export default {
  data: () => ({
    isOpen: false,
    searchInput: '',
    searchMessage: '',
    searchResult: [],
    error: ''
  }),
  props: {
    team: {
      type: Object,
      required: true
    }
  },
  methods: {
    async addBoardToTeam(board) {
      try {
        await this.$store.dispatch('addBoardToTeam', {
          teamId: this.team._id,
          board
        });
        this.isOpen = false;
        this.searchInput = '';
        this.searchResult = [];
      } catch (error) {
        console.log(error.response.data.error);
      }
    },
    filterSearchResult(searchResult) {
      for (let i = searchResult.length - 1; i >= 0; i--) {
        for (let j = 0; j < this.team.boards.length; j++) {
          if (
            searchResult[i] &&
            searchResult[i]._id === this.team.boards[j]._id
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
        const response = (await BoardSearchService.get(this.searchInput)).data;

        if (response.length > 0) {
          this.searchResult = this.filterSearchResult(response);

          if (this.searchResult.length > 0) {
            this.searchMessage = '';
          } else {
            this.searchMessage =
              'Boards found were already assigned to this team.';
          }
        } else {
          this.searchMessage = 'No search result.';
        }
      } catch (error) {
        this.searchMessage = error.response.data.error;
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