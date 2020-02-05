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
          :color="'gray'"
        >{{board.title}}</DeletePopup>
      </div>
      <div class="flex flex-col text-left">
        <span class="text-xs">{{board.lists.length}} {{board.lists.length > 1 ? 'Lists': 'List'}}</span>
        <span class="text-xs font-light">Last Updated: 4-1-2020</span>
      </div>
    </div>
  </div>
</template>

<script>
import DeletePopup from '../reusables/DeletePopup';
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
  components: {
    DeletePopup
  }
};
</script>

<style>
</style>