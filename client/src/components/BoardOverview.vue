<template>
  <div class="overflow-x-hidden w-full">
    <top-bar></top-bar>
    <router-link :to="{ name: 'Board', params: { boardId: this.board._id }}">{{this.board.title}}</router-link>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import TopBar from '@/components/TopBar';
export default {
  name: 'boardOverview',
  components: {
    TopBar
  },
  computed: {
    ...mapState(['board'])
  }
};
</script>

<style>
</style>