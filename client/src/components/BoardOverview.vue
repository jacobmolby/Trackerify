<template>
  <div class="mt-5 mx-auto w-1/3">
    <router-link class :to="{ name: 'Board', params: { boardId: this.board._id }}">
      <div
        class="bg-teal-500 font-bold p-5 rounded-lg shadow text-2xl text-center text-gray-200"
      >{{this.board.title}}</div>
    </router-link>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'boardOverview',

  computed: {
    ...mapState(['board'])
  }
};
</script>

<style>
</style>