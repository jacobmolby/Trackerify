<template>
  <div class="-mx-3 pt-2 flex flex-col">
    <router-link
      :to="{name:'boardOverview'}"
      class="px-3 py-1 flex justify-between text-gray-700 text-sm font-medium hover:bg-gray-200 rounded-lg"
    >Boards</router-link>
    <router-link
      :to="{name:'teams'}"
      class="mt-1 px-3 py-1 flex justify-between text-gray-700 text-sm font-medium hover:bg-gray-200 rounded-lg"
    >Teams</router-link>
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
a.router-link-exact-active {
  background-color: #edf2f7;
}
</style>