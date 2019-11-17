<template>
  <div>
    <!-- List Title -->
    <h2 class="py-4 font-normal text-gray-700 text-xl">{{title}}</h2>
    <!-- Scrollable area -->
    <!-- List CONTENT -->
    <ul>
      <li v-for="i in numberofposts" :key="i" class="my-2 px-3 py-3 bg-white rounded">
        <slot></slot>
      </li>
    </ul>

    <!-- ADD LIST BUTTON -->
    <add-card></add-card>
  </div>
</template>

<script>
import AddCard from '@/components/AddCard.vue';
export default {
  components: {
    AddCard
  },
  props: ['title', 'numberofposts']
};
</script>

<style>
</style>