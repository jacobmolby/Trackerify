<template>
  <div class="my-2 p-3 shadow border rounded">
    <div class="flex items-baseline justify-between">
      <h3 class="font-semibold text-sm">{{comment.user.name}}</h3>
      <time :datetime="this.date" class="text-xs">{{date}}</time>
    </div>
    <div class="flex justify-between">
      <p>{{comment.content}}</p>
      <delete-popup @deleteFunction="deleteComment">{{comment.user.name}}'s comment</delete-popup>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import { mapActions } from 'vuex';
import DeletePopup from '@/components/reusables/DeletePopup';
import CommentService from '@/services/CommentService';
import { fireAction } from '@/services/ActionService';

export default {
  name: 'comment',
  components: {
    DeletePopup
  },
  props: {
    comment: Object
  },
  methods: {
    async deleteComment() {
      try {
        await this.$store.dispatch('removeCommentFromCard', {
          cardId: this.comment.cardId,
          listId: this.comment.listId,
          commentId: this.comment._id
        });
      } catch (error) {
        console.log('error occured');
        console.log(error);
        // console.log(error.response.data.error);
      }
    }
  },
  computed: {
    date() {
      const dateObj = new Date(this.comment.created);
      return moment(this.comment.created).format('dddd HH:mm, DD MMM YY');
    }
  }
};
</script>

<style>
</style>