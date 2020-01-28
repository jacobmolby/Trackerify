<template>
  <div>
    <delete-popup @deleteFunction="deleteBoard">{{board.title}}</delete-popup>
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
        console.log('error occured');
        console.log(error);
        // console.log(error.response.data.error);
      }
    }
  }
};
</script>

<style>
</style>