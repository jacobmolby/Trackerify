<template>
  <div class="px-2 inline-flex rounded-lg items-baseline" :style="{'background-color': color}">
    <svg
      class="h-2 w-2 opacity-50"
      :style="{'color':dotColor}"
      viewBox="0 0 8 8"
      fill="currentColor"
    >
      <circle cx="4" cy="4" r="3" />
    </svg>
    <span class="ml-1 text-white text-xs font-medium text-shadow">
      <slot></slot>
    </span>
  </div>
</template>

<script>
export default {
  props: { color: String },
  computed: {
    dotColor() {
      let hex = this.color;
      let lum = -0.3;
      // validate hex string
      hex = String(hex).replace(/[^0-9a-f]/gi, '');
      if (hex.length < 6) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
      }
      lum = lum || 0;

      // convert to decimal and change luminosity
      var rgb = '#',
        c,
        i;
      for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i * 2, 2), 16);
        c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16);
        rgb += ('00' + c).substr(c.length);
      }

      return rgb;
    }
  }
};
</script>

<style>
</style>