<template>
  <div class="my-2 p-3 border rounded w-full">
    <form class="flex flex-col" @submit.prevent="addComment">
      <textarea class="text-sm outline-none" v-model="comment" />
      <div v-if="this.error">{{this.error}}</div>
      <button
        type="submit"
        class="mt-2 bg-green-400 font-semibold text-white rounded hover:bg-green-600"
      >Save</button>
    </form>
  </div>
</template>

<script>
import CommentService from '@/services/CommentService';

export default {
  props: {
    cardId: String,
    listId: String
  },
  data() {
    return {
      comment: null,
      error: null
    };
  },
  methods: {
    async addComment() {
      this.error = null;
      if (!this.comment) {
        this.error = 'Please fill out the field.';
      }
      if (this.comment) {
        const payload = {
          content: this.comment,
          cardId: this.cardId
        };
        try {
          let response = (await CommentService.post(payload)).data;
          response = {
            ...response,
            listId: this.listId,
            boardId: this.$store.state.board._id
          };
          this.$store.dispatch('addComment', response);
          this.$socket.emit('addComment', response);
          this.comment = '';
        } catch (error) {
          console.log(error);
        }
      }
    }
  }
};
</script>

<style>
</style>