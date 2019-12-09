<template>
  <div>
    <button @click="isOpen = !isOpen">
      <svg class="h-3 w-3 fill-current text-red-600" viewBox="0 0 20 20">
        <path d="M6 2l2-2h4l2 2h4v2H2V2h4zM3 6h14l-1 14H4L3 6zm5 2v10h1V8H8zm3 0v10h1V8h-1z" />
      </svg>
    </button>
    <portal to="popup-container" v-if="isOpen">
      <button @click="isOpen = false" tabindex="-1" class="popup-bg"></button>
      <div class="popup">
        <h2 class="text-left text-lg font-semibold">
          Are you sure you want to delete:
          <span class="font-bold text-gray-800">{{board.title}}</span>
        </h2>
        <div class="pt-3 flex flex-row w-full justify-end">
          <button
            class="py-2 px-3 text-white bg-red-600 rounded shadow hover:bg-red-700"
            @click="deleteBoard"
          >Yes I'm sure</button>
          <button
            class="ml-3 py-2 px-3 text-white bg-green-600 rounded shadow hover:bg-green-700"
            @click="isOpen = false"
          >No, take me back</button>
        </div>
      </div>
    </portal>
  </div>
</template>

<script>
import BoardService from '@/services/BoardService';
export default {
  data() {
    return {
      isOpen: false
    };
  },
  props: { board: Object },
  methods: {
    async deleteBoard() {
      try {
        await BoardService.delete(this.board._id);
        this.$store.dispatch('deleteBoard', this.board._id);
        this.$router.push({
          name: 'boardOverview'
        });
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