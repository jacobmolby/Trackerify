<template>
  <div class="py-3 flex justify-between items-center border-b border-gray-200">
    <div class="flex-1 flex">
      <!-- Hamburger button -->
      <button class="lg:hidden" @click="$emit('openSidebar')">
        <svg class="h-6 w-6 text-gray-800" viewBox="0 0 20 20" fill="currentColor">
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </button>
      <!-- Search bar -->
      <div class="flex-shrink ml-3 lg:ml-0 relative">
        <span class="absolute pl-2 inset-y-0 left-0 flex items-center">
          <svg class="h-4 w-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
            <path
              d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"
            />
          </svg>
        </span>
        <input
          class="block w-full py-2 pl-10 text-sm rounded-lg border border-gray-400 text-gray-900 placeholder-gray-600"
          placeholder="Search"
        />
      </div>
    </div>
    <!-- Notification Bell -->
    <div class="ml-6 flex justify-between py-2 items-center">
      <button class="text-gray-500">
        <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path
            d="M4 8a6 6 0 0 1 4.03-5.67 2 2 0 1 1 3.95 0A6 6 0 0 1 16 8v6l3 2v1H1v-1l3-2V8zm8 10a2 2 0 1 1-4 0h4z"
          />
        </svg>
      </button>
      <!-- Profile picture -->
      <button class="ml-6">
        <img
          class="h-7 w-7 rounded-full object-cover"
          :src="'https://i.pravatar.cc/30?img=' + (Math.floor(Math.random() * 50))"
          alt
        />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheTopbar'
};
</script>

<style>
</style>