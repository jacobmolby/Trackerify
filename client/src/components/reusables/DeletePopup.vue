<template>
  <div>
    <button class="focus:outline-none" @click="isOpen = !isOpen">
      <svg
        class="h-3 w-3 fill-current"
        :class="color === 'white' ? 'text-white hover:text-gray-400' : `${color} hover:${hoverColor}`"
        viewBox="0 0 20 20"
      >
        <path d="M6 2l2-2h4l2 2h4v2H2V2h4zM3 6h14l-1 14H4L3 6zm5 2v10h1V8H8zm3 0v10h1V8h-1z" />
      </svg>
    </button>
    <portal to="delete-popup" v-if="isOpen">
      <button @click="isOpen = false" tabindex="-1" class="popup-bg"></button>
      <div class="popup">
        <div class="flex justify-between items-center mb-4 border-b pb-2">
          <h2 class="text-left text-lg font-semibold">Are you sure you want to {{deleteText}}:</h2>
          <button class="ml-4" @click="isOpen = false">
            <svg class="h-4 w-4 fill-current" viewBox="0 0 20 20">
              <path
                d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"
              />
            </svg>
          </button>
        </div>
        <span class="mb-4 font-bold text-gray-800">
          <slot></slot>
        </span>
        <div class="pt-3 flex flex-row w-full justify-end">
          <button
            class="py-2 px-3 text-white bg-red-600 rounded shadow hover:bg-red-700"
            @click="deleteFunction"
          >Yes, I'm sure</button>
          <button
            class="ml-3 py-2 px-3 text-white bg-green-600 rounded shadow hover:bg-green-700"
            @click="isOpen = false"
          >No, take me back</button>
        </div>
      </div>
    </portal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false
    };
  },
  props: {
    //Maybe needs to be an object later
    deleteText: { type: String, default: 'delete' },
    color: { type: String, default: 'text-red-600' },
    hoverColor: { type: String, default: 'text-red-700' },
    id: String
  },
  methods: {
    deleteFunction() {
      this.isOpen = false;
      if (this.id) {
        this.$emit('deleteFunction', this.id);
      } else {
        this.$emit('deleteFunction');
      }
    }
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