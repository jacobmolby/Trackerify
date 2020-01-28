<template>
  <div>
    <button class="focus:outline-none" @click="isOpen = !isOpen">
      <svg
        class="h-3 w-3 fill-current"
        :class="color === 'white' ? 'text-white hover:text-gray-400' : `text-${color}-600 hover:text-${color}-800`"
        viewBox="0 0 20 20"
      >
        <path d="M6 2l2-2h4l2 2h4v2H2V2h4zM3 6h14l-1 14H4L3 6zm5 2v10h1V8H8zm3 0v10h1V8h-1z" />
      </svg>
    </button>
    <portal to="delete-popup" v-if="isOpen">
      <button @click="isOpen = false" tabindex="-1" class="popup-bg"></button>
      <div class="popup">
        <h2 class="text-left text-lg font-semibold">
          Are you sure you want to {{deleteText}}:
          <span class="font-bold text-gray-800">
            <slot></slot>
          </span>
        </h2>
        <div class="pt-3 flex flex-row w-full justify-end">
          <button
            class="py-2 px-3 text-white bg-red-600 rounded shadow hover:bg-red-700"
            @click="deleteFunction"
          >Yes I'm sure</button>
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
    color: { type: String, default: 'red' },
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