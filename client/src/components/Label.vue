<template>
  <div
    class="text-xs text-gray-700 px-2 inline-block bg-teal-400 rounded-lg"
    :style="{'background-color': color}"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: { color: String }
};
</script>

<style>
</style>