<template>
  <div class="my-2 p-3 shadow border rounded">
    <div class="flex items-baseline justify-between">
      <h3 class="font-semibold text-sm">{{comment.user.name}}</h3>
      <time :datetime="this.date" class="text-xs">{{date}}</time>
    </div>
    <div class="flex justify-between">
      <p>{{comment.content}}</p>
      <DeletePopup @deleteFunction="deleteComment">{{comment.user.name}}'s comment</DeletePopup>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import { mapActions } from 'vuex';
import DeletePopup from '@/components/reusables/DeletePopup';
import CommentService from '@/services/CommentService';

export default {
  name: 'comment',
  components: {
    DeletePopup
  },
  props: {
    comment: Object,
    listId: String
  },
  methods: {
    async deleteComment() {
      try {
        await this.$store.dispatch('removeCommentFromCard', {
          cardId: this.comment.cardId,
          listId: this.listId,
          commentId: this.comment._id
        });
      } catch (error) {
        this.$store.dispatch('notify', {
          message: error.response.data.error,
          type: 'error'
        });
      }
    }
  },
  computed: {
    date() {
      return moment(this.comment.createdAt).format('dddd HH:mm, DD MMM YY');
    }
  }
};
</script>

<style>
</style>