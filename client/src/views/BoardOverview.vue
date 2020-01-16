<template>
  <div>
    <TheTopbar />
    <div class="m-6">
      <CreateBoard />
      <div v-if="user.boards" class="my-10 flex flex-row flex-wrap justify-start">
        <router-link
          v-for="board in user.boards"
          :key="board._id"
          :to="{ name: 'board', params: { boardId: board._id }}"
          class="odd:mr-8 my-4 flex-2 w-full"
        >
          <div class="p-5 bg-indigo-500 rounded-lg shadow text-gray-200 hover:bg-indigo-600">
            <h2 class="font-bold text-2xl">{{board.title}}</h2>
            <ul class="mt-3">
              <li>
                <span v-if="board.lists.length > 1">{{board.lists.length}} Lists</span>
                <span v-else>{{board.lists.length}} List</span>
              </li>
              <li>
                <span v-if="board.users.length > 1">{{board.users.length}} Users</span>
                <span v-else>{{board.users.length}} User</span>
              </li>
            </ul>
          </div>
        </router-link>
      </div>
      <div v-else>There are no boards</div>
      <div v-if="error">{{error}}</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import CreateBoard from '../components/board/CreateBoard';
import TheTopbar from '../components_v2/TheTopbar';
import BoardService from '../services/BoardService';
export default {
  name: 'boardOverview',
  data() {
    return {
      error: null
    };
  },
  components: {
    CreateBoard,
    TheTopbar
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    ...mapActions(['setBoardOverview'])
  },
  async mounted() {
    this.error = null;
    try {
      await this.setBoardOverview();
    } catch (error) {
      this.error = error.response.data.error;
    }
  }
};
</script>

<style>
</style>