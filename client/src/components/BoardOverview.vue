<template>
  <div class="mt-5 mx-auto w-1/3">
    <div v-if="user.boards">
      <router-link
        v-for="board in user.boards"
        :key="board._id"
        :to="{ name: 'Board', params: { boardId: board._id }}"
      >
        <div
          class="bg-teal-500 font-bold p-5 rounded-lg shadow text-2xl text-center text-gray-200"
        >{{board.title}}</div>
      </router-link>
    </div>
    <div v-else>There are no boards</div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'boardOverview',

  computed: {
    ...mapState(['user'])
  }
};
</script>

<style>
</style>