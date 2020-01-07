<template>
  <div>
    <portal v-if="!isConnected" to="connection-lost">
      <button tabindex="-1" class="popup-bg"></button>
      <div class="popup">
        <h2 class="text-left text-lg font-semibold">Connection Lost</h2>
      </div>
    </portal>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  computed: {
    ...mapState({ isConnected: state => state.socketio.isConnected })
  }
};
</script>

<style>
</style>