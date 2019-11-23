<template>
  <div class="my-2 p-3 shadow border rounded">
    <div class="flex items-baseline justify-between">
      <h3 class="font-semibold text-sm">{{comment.user.name}}</h3>
      <time :datetime="this.date" class="text-xs">{{date}}</time>
    </div>
    <p>{{comment.content}}</p>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'comment',
  props: {
    comment: Object
  },
  computed: {
    date() {
      const dateObj = new Date(this.comment.created);
      return moment(this.comment.created).format('dddd HH:mm, DD MMM YY');
    }
  }
};
</script>

<style>
</style>