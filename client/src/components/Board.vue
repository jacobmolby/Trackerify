<template>
  <!-- <div style="height: calc(100% - 4em);" class="bg-white flex min-w-screen"> -->
  <!-- <nav-bar></!-->

  <div>
    <main v-if="board" class="px-10">
      <!-- OVER THE lists -->
      <div class="ml-2 pt-6 flex justify-between items-center">
        <div class="inline-flex items-baseline">
          <h1
            v-if="this.board.title"
            class="font-semibold text-2xl text-gray-700"
          >{{this.board.title}}</h1>
          <h1 v-else class="font-semibold text-2xl text-gray-700">Loading Title</h1>

          <add-list></add-list>
        </div>
        <div class="flex">
          <div
            class="py-2 text-xs align-text-middle text-red-500 font-semibold"
            v-if="removeUserError"
          >{{removeUserError}}</div>
          <addUserToBoard class="mr-4" />
          <div class="flex flex-row-reverse">
            <div v-for="user in board.users" :key="user._id" class="relative -ml-2 h-8 w-8 z-0">
              <img
                class="rounded-full block border-white border-2"
                :src="user.profileImage"
                alt="Profile Image"
              />
              <div
                v-if="user._id !== $store.state.user._id"
                class="absolute inset-0 flex opacity-0 bg-red-400 rounded-full hover:opacity-75"
              >
                <button
                  class="flex justify-center w-full items-center focus:outline-none"
                  @click="removeUser(user._id)"
                >
                  <svg class="h-3 w-3 fill-current text-gray-800 opacity-100" viewBox="0 0 20 20">
                    <path
                      d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- BOARD AREA -->
      <div class="overflow-x-auto">
        <div v-if="board.lists" class="py-6 h-full inline-flex flex-shrink-0 items-start">
          <div v-for="list in board.lists" :key="list._id">
            <div v-if="list.cards">
              <List
                :cards="list.cards"
                :listId="list._id"
                :title="list.title"
                :listColor="list.color"
              >
                <!-- <Card></Card> -->
              </List>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
  <!-- </div> -->
</template>

<script>
import { mapState } from 'vuex';
import List from '@/components/List';
import AddList from '@/components/AddList';
import AddUserToBoard from '@/components/AddUserToBoard';
import BoardService from '@/services/BoardService';
import UserBoardService from '@/services/UserBoardService';
export default {
  name: 'Board',
  data() {
    return {
      boardId: this.$route.params.boardId,
      removeUserError: null
    };
  },
  components: {
    List,
    AddList,
    AddUserToBoard
  },
  computed: {
    ...mapState(['board'])
  },
  async mounted() {
    try {
      const board = (await BoardService.show(this.boardId)).data;

      this.$store.dispatch('setBoard', board);
    } catch (error) {
      this.$router.push({ path: '/board' });
      alert(error.response.data.error, 'Please logout and in again');
      console.log(error);
    }
  },
  methods: {
    async removeUser(userId) {
      this.removeUserError = null;
      if (userId === this.$store.state.user._id) {
        return (this.removeUserError = 'You cannot remove yourself');
      }
      try {
        await UserBoardService.delete(userId, this.boardId);
        this.$store.dispatch('removeUserFromBoard', userId);
      } catch (error) {
        console.log('error occured');

        console.log(error.response.data.error);
      }
    }
  }
};
</script>

<style>
</style>