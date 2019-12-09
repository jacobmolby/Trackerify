<template>
  <div class="m-6">
    <!-- <button
      class="px-2 py-2 font-semibold bg-green-400 rounded-lg text-white focus:outline-none shadow hover:bg-green-600"
    >-->
    <!-- <button
      class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
    >Create New Board</button>-->
    <create-board></create-board>
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
  </div>
</template>

<script>
import { mapState } from 'vuex';
import CreateBoard from '@/components/CreateBoard';

export default {
  name: 'boardOverview',
  components: {
    CreateBoard
  },
  computed: {
    ...mapState(['user'])
  }
};
</script>

<style>
</style>