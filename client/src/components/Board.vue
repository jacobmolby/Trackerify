<template>
  <div>
    <!-- Header for Board -->
    <h2 class="py-4 font-normal text-gray-700 text-xl">{{title}}</h2>
    <!-- Scrollable area -->
    <!-- BOARD CONTENT -->
    <ul>
      <li v-for="i in numberofposts" :key="i" class="my-2 px-3 py-3 bg-white rounded">
        <slot></slot>
      </li>
    </ul>

    <!-- ADD TASK BUTTON -->
    <add-task></add-task>
  </div>
</template>

<script>
import AddTask from "@/components/AddTask.vue";
export default {
  components: {
    AddTask
  },
  props: ["title", "numberofposts"]
};
</script>

<style>
</style>