<template>
  <div
    class="text-xs text-white font-bold px-2 inline-block bg-teal-400 rounded-lg text-shadow"
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