<template>
  <div>
    <button @click="isOpen = true" class="w-full btn btn-gray">Delete Image</button>
    <portal to="delete-popup" v-if="isOpen">
      <div v-if="isOpen">
        <button @click="isOpen = false" tabindex="-1" class="popup-bg"></button>
        <div class="popup">
          <div class="flex justify-between items-center mb-4 border-b pb-2">
            <h2 class="text-left text-lg font-semibold">Are you sure you want to delete:</h2>
            <button class="ml-4" @click="isOpen = false">
              <svg class="h-4 w-4 fill-current" viewBox="0 0 20 20">
                <path
                  d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"
                />
              </svg>
            </button>
          </div>
          <span class="mb-4 font-bold text-gray-800">Your profile image</span>
          <div class="pt-3 flex flex-row w-full justify-end">
            <button
              class="btn text-white bg-red-600 hover:bg-red-700"
              @click="deleteImage"
            >Yes, I'm sure</button>
            <button
              class="ml-3 btn text-white bg-green-600 hover:bg-green-700"
              @click="isOpen = false"
            >No, take me back</button>
          </div>
        </div>
      </div>
    </portal>
  </div>
</template>

<script>
export default {
  data: () => ({
    isOpen: false
  }),
  methods: {
    async deleteImage() {
      try {
        await this.$store.dispatch('deleteProfileImage');
      } catch (error) {
        this.$store.dispatch('notify', {
          message: error.response.data.error,
          type: 'error'
        });
      }
      this.isOpen = false;
    }
  }
};
</script>

<style>
</style>