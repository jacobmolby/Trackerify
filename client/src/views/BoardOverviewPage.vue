<template>
  <div class="flex overflow-hidden h-screen">
    <Sidebar @closeSidebar="isOpen=false" :isOpen="isOpen" />
    <div v-if="!isLoading" class="flex-1 flex flex-col min-w-0 bg-white">
      <div class="flex-shrink-0 border-b border-gray-200">
        <header class>
          <div class="px-6">
            <TheTopbar @openSidebar="isOpen = true" />
            <div class="py-2 flex items-center justify-between">
              <h1 class="font-semibold text-2xl text-gray-800">Board Overview</h1>
              <CreateBoard />
            </div>
          </div>
        </header>
      </div>

      <!-- MAIN CONTENT -->
      <div
        v-if="user.boards && user.boards.length > 1"
        class="my-10 px-6 flex flex-col justify-between"
      >
        <router-link
          v-for="board in user.boards"
          :key="board._id"
          :to="{ name: 'board', params: { boardId: board._id }}"
          class="mt-4"
        >
          <div class="p-5 bg-gray-800 rounded-lg shadow text-gray-200 hover:bg-gray-600">
            <h2 class="font-bold text-2xl">{{board.title}}</h2>
            <ul class="mt-3">
              <li>
                <span>{{board.lists.length}} {{board.lists.length > 1 ? 'Lists': 'List'}}</span>
              </li>
              <li>
                <span>{{board.users.length}} {{board.users.length > 1 ?'Users' : 'User'}}</span>
              </li>
              <li v-if="isOwner(board.owner)">
                <span class="font-medium text-yellow-500">You are the owner</span>
              </li>
            </ul>
          </div>
        </router-link>
        <!-- </div> -->
      </div>
      <div v-else class="m-auto text-4xl p-6 font-light">There are no boards. You should create one.</div>
      <div v-if="error">{{error}}</div>
      <!-- END MAIN CONTENT -->
      <button
        @click="isOpen = false"
        :class="isOpen ? 'block' : 'hidden'"
        class="absolute w-full h-full inset-0 bg-black opacity-50 lg:hidden cursor-default"
      ></button>
    </div>
    <LoadingSpinner v-if="isLoading" class="mt-10 flex items-center justify-center" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import LoadingSpinner from '../components/reusables/LoadingSpinner';
import CreateBoard from '../components/board/CreateBoard';
import TheTopbar from '../components/TheTopbar';
import Sidebar from '../components/Sidebar';
import BoardService from '../services/BoardService';
export default {
  name: 'boardOverview',
  data() {
    return {
      error: null,
      isOpen: false
    };
  },
  components: {
    CreateBoard,
    TheTopbar,
    Sidebar,
    LoadingSpinner
  },
  computed: {
    ...mapState(['user', 'isLoading'])
  },
  methods: {
    isOwner(ownerId) {
      if (ownerId === this.user._id) {
        return true;
      } else {
        return false;
      }
    },
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