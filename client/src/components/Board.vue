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
          <addUserToBoard class="mr-4" />
          <div class="flex flex-row-reverse">
            <img
              v-for="user in board.users"
              :key="user._id"
              class="-ml-2 h-8 w-8 rounded-full border-white border-2"
              :src="user.profileImage"
              alt="Profile Image"
            />
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
export default {
  name: 'Board',
  data() {
    return {
      boardId: this.$route.params.boardId
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
      console.log(board);
      this.$store.dispatch('setBoard', board);
    } catch (error) {
      this.$router.push({ path: '/board' });
      alert(error.response.data.error);
      console.log(error);
    }
  }
};
</script>

<style>
</style>