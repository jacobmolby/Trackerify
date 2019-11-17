<template>
  <div class="relative">
    <div class="flex justify-center">
      <button
        @click="isOpen = !isOpen"
        class="flex items-center text-sm font-semibold tracking-wide text-gray-600 hover:text-gray-800 focus:text-gray-800 focus:outline-none"
      >
        Add Card
        <svg class="h-6 w-6 fill-current" viewBox="0 0 30 30">
          <path d="M20.64 15.64H15.64V20.64H14V15.64H9V14H14V9H15.64V14H20.64V15.64Z" />
        </svg>
      </button>
      <button
        v-if="isOpen"
        @click="isOpen = false"
        tabindex="-1"
        class="fixed inset-0 h-full w-full bg-black opacity-25 cursor-default"
      ></button>
      <div v-if="isOpen" class="popup bg-white shadow-xl rounded p-6 text-gray-700">
        <h2 class="text-left text-lg font-semibold">Add Card</h2>
        <form class="pt-3 flex flex-col" @submit.prevent>
          <input class="p-2 rounded border border-gray-400" type="text" placeholder="Card Name" />
          <button
            class="mt-2 py-2 text-white bg-indigo-400 rounded shadow hover:bg-indigo-500"
          >Add New Card</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddCard',
  data() {
    return {
      isOpen: false
    };
  },
  created() {
    const handleEscape = e => {
      if (e.key === 'Esc' || e.key === 'Escape') {
        this.isOpen = false;
      }
    };
    document.addEventListener('keydown', handleEscape);
    this.$once('hook:beforeDestroy', () => {
      document.removeEventListener('keydown', handleEscape);
    });
  }
};
</script>

<style>
</style>