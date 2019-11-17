<template>
  <div class="flex flex-col flex-shrink-0 justify-between">
    <div>
      <div class="text-xs text-gray-700 px-2 inline-block bg-teal-400 rounded-lg">Low Priority</div>
    </div>
    <span class="text-sm leading-snug text-gray-600">
      <button @click="isOpen = !isOpen" class="text-left">Company website redesign website redesign</button>
    </span>
    <div class="pt-4 flex justify-between items-end">
      <div class="w-1/2 flex justify-start items-center">
        <div class="flex items-center">
          <svg class="h-4 w-4 fill-current text-gray-500" viewBox="0 0 20 20">
            <path
              d="M10 15l-4 4v-4H2a2 2 0 0 1-2-2V3c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-8zM5 7v2h2V7H5zm4 0v2h2V7H9zm4 0v2h2V7h-2z"
            />
          </svg>
          <span class="text-xs pl-1">1</span>
        </div>
        <div class="pl-2 flex items-center">
          <svg class="h-4 w-4 fill-current text-gray-500" viewBox="0 0 20 20">
            <path
              d="M15 3H7a7 7 0 1 0 0 14h8v-2H7A5 5 0 0 1 7 5h8a3 3 0 0 1 0 6H7a1 1 0 0 1 0-2h8V7H7a3 3 0 1 0 0 6h8a5 5 0 0 0 0-10z"
            />
          </svg>
          <span class="text-xs pl-1">2</span>
        </div>
      </div>
      <div class="w-1/2 flex justify-end">
        <svg
          class="mx-1 h-8 w-8 rounded-full border border-dashed border-gray-500 fill-current text-gray-500"
          viewBox="0 0 30 30"
        >
          <path d="M20.64 15.64H15.64V20.64H14V15.64H9V14H14V9H15.64V14H20.64V15.64Z" />
        </svg>
        <img
          class="mx-1 h-8 w-8 rounded-full object-cover"
          src="../../public/img/profile-img.jpg"
          alt="Profile Image"
        />
      </div>
    </div>
    <button
      v-if="isOpen"
      @click="isOpen = false"
      tabindex="-1"
      class="fixed inset-0 h-full w-full bg-black opacity-25 cursor-default"
    ></button>
    <div v-if="isOpen" class="popup bg-white shadow-xl rounded p-6 text-gray-700">
      <h2 class="text-lg font-bold">Company website redesign website redesign</h2>
      <p
        class="py-2 text-sm border-b-2 border-gray-200"
      >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis malesuada eros, non efficitur magna. Fusce mollis lacus ut congue gravida.</p>
      <div class="py-2 flex items-center justify-between border-b-2 border-gray-200">
        <h3 class="text-md font-medium">Assigned to:</h3>
        <div class="flex justify-end">
          <svg
            class="mx-1 h-8 w-8 rounded-full border border-dashed border-gray-500 fill-current text-gray-500"
            viewBox="0 0 30 30"
          >
            <path d="M20.64 15.64H15.64V20.64H14V15.64H9V14H14V9H15.64V14H20.64V15.64Z" />
          </svg>
          <img
            class="mx-1 h-8 w-8 rounded-full object-cover"
            src="../../public/img/profile-img.jpg"
            alt="Profile Image"
          />
        </div>
      </div>
      <div class="my-1 h-72 overflow-y-auto">
        <comment v-for="i in 3" :key="i"></comment>
      </div>
      <div class="py-2 border-t-2 border-gray-200">Attachments:</div>
      <div class="flex items-center justify-between">
        <button
          class="px-2 py-1 font-semibold text-white bg-red-500 rounded shadow hover:bg-red-800"
        >Delete Card</button>
        <button
          @click="isOpen = false"
          class="px-2 py-1 font-semibold text-white bg-indigo-400 rounded shadow hover:bg-indigo-800"
        >Close Card</button>
      </div>
    </div>
  </div>
</template>

<script>
import Comment from '@/components/Comment';
export default {
  name: 'Card',
  components: {
    Comment
  },
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