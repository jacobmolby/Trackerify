<template>
  <div>
    <DeletePopup @deleteFunction="deleteBoard">{{board.title}}</DeletePopup>
  </div>
</template>

<script>
import BoardService from '@/services/BoardService';
import DeletePopup from '@/components/reusables/DeletePopup';
export default {
  components: {
    DeletePopup
  },
  data() {
    return {
      isOpen: false
    };
  },
  props: { board: Object },
  methods: {
    async deleteBoard() {
      try {
        await this.$store.dispatch('deleteBoard', { boardId: this.board._id });
      } catch (error) {
        this.$store.dispatch('notify', {
          message: error.response.data.error,
          type: 'error'
        });
      }
    }
  }
};
</script>

<style>
</style>