<template>
  <portal to="popup-container">
    <div v-if="showMessage">
      <button @click="close" tabindex="-1" class="popup-bg"></button>
      <div class="popup">
        <div class="flex justify-between items-center border-b pb-2">
          <h2 class="text-left text-lg font-semibold">Welcome to Trackerify!</h2>
          <button class="ml-4" @click="close">
            <svg class="h-4 w-4 fill-current" viewBox="0 0 20 20">
              <path
                d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"
              />
            </svg>
          </button>
        </div>
        <div class="mt-2">
          <p>Create a new board to track a project from start to finish. Add the board to your team and collaborate with others in real time.</p>
          <p
            class="mt-4"
          >To edit the title of a board, list or a team, simply click on the title and start typing</p>
          <h3 class="mt-4 pt-2 font-semibold border-t">Keyboard Shortcuts (when viewing a board):</h3>
          <ul class="ml-8 text-sm list-disc">
            <li class="mt-2">
              <span class="font-semibold">Alt+u:</span>
              Add a user to the board.
            </li>
            <li>
              <span class="font-semibold">Alt+l:</span>
              Add a new list to the board.
            </li>
          </ul>
        </div>
        <div class="flex justify-end items-center">
          <label class="flex items-center">
            <span>Don't show again</span>
            <input v-model="checkbox" class="ml-2 form-checkbox" type="checkbox" />
          </label>
          <button @click="close" class="ml-4 btn bg-purple-500 text-white">Okay</button>
        </div>
      </div>
    </div>
  </portal>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data: () => ({ checkbox: false }),
  computed: {
    ...mapState({
      showMessage: state => state.welcomeMessage
    })
  },
  methods: {
    close() {
      try {
        this.$store.dispatch('closeWelcomeMessage', this.checkbox);
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