<template>
  <div class="p-1 px-2 bg-white rounded shadow">
    <div class="w-full">
      <div class="border-b flex justify-between">
        <button @click="$router.push(`/board/${board._id}`)">
          <h4 class="font-semibold text-sm hover:text-purple-600">{{board.title}}</h4>
        </button>
        <DeletePopup
          v-if="isOwner"
          @deleteFunction="removeBoardFromTeam"
          :deleteText="'remove'"
          :color="'text-gray-700'"
          :hoverColor="'text-gray-900'"
        >{{board.title}}</DeletePopup>
      </div>
      <div class="flex flex-col text-left">
        <span class="text-xs">{{board.lists.length}} {{board.lists.length > 1 ? 'Lists': 'List'}}</span>
        <span class="text-xs font-light">Last Updated: {{updatedDate}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import DeletePopup from '../reusables/DeletePopup';
import moment from 'moment';

export default {
  props: {
    board: {
      type: Object,
      required: true
    },
    isOwner: {
      type: Boolean,
      default: false
    },
    teamId: {
      type: String,
      required: true
    }
  },
  methods: {
    removeBoardFromTeam() {
      this.$store.dispatch('removeBoardFromTeam', {
        teamId: this.teamId,
        boardId: this.board._id
      });
    }
  },
  computed: {
    updatedDate() {
      return moment(this.board.updatedAt).format('HH:mm, DD MMM YY');
    }
  },
  components: {
    DeletePopup
  }
};
</script>

<style>
</style>