<template>
  <div class="-mx-3 mt-4 pt-2 border-t border-gray-400 flex flex-col">
    <router-link
      :to="{name:'boardOverview'}"
      class="px-3 py-1 flex justify-between text-gray-700 text-sm font-medium hover:bg-gray-200 rounded-lg"
    >Boards</router-link>
    <router-link
      :to="{name:'team'}"
      class="mt-1 px-3 py-1 flex justify-between text-gray-700 text-sm font-medium hover:bg-gray-200 rounded-lg"
    >Team</router-link>
    <router-link
      :to="{name:'settings'}"
      class="mt-1 px-3 py-1 flex justify-between text-gray-700 text-sm font-medium hover:bg-gray-200 rounded-lg"
    >Settings</router-link>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
a.router-link-active {
  background-color: #edf2f7;
}
</style>