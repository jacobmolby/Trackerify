<template>
  <div class="flex justify-between items-center">
    <div class="flex items-center">
      <div class="w-8 h-8">
        <img
          class="object-cover border border-gray-500 rounded-full"
          :src="user.profileImage"
          :alt="user.name"
        />
      </div>
      <span class="ml-4">{{user.name}}</span>
    </div>
    <DeletePopup
      @deleteFunction="removeTeamMember"
      v-if="canRemove"
      :id="user._id"
      :deleteText="'remove'"
      :color="'gray'"
    >{{user.name}}</DeletePopup>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import DeletePopup from '../reusables/DeletePopup';
export default {
  components: { DeletePopup },
  props: {
    isOwner: {
      type: Boolean,
      requried: true
    },
    teamId: {
      type: String,
      requried: true
    },
    user: {
      type: Object,
      requried: true
    }
  },
  methods: {
    async removeTeamMember() {
      try {
        this.$store.dispatch('removeTeamMember', {
          teamId: this.teamId,
          userId: this.user._id
        });
      } catch (error) {
        console.log(error);
      }
    }
  },
  computed: {
    ...mapState({
      userId: state => state.user._id
    }),
    canRemove() {
      return this.userId === this.user._id ? false : this.isOwner;
    }
  }
};
</script>

<style>
</style>