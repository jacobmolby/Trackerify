<template>
  <form class="flex flex-col justify-between items-start" @submit.prevent="changePassword">
    <label class="py-2" for="oldEmail">Old Password</label>
    <input class="form-input w-full bg-gray-200" type="password" />
    <label class="py-2" for="oldEmail">New Password</label>
    <input class="form-input w-full bg-gray-200" type="password" />
    <label class="py-2" for="oldEmail">New Password Again</label>
    <input class="form-input w-full bg-gray-200" type="password" />
    <div class="mt-4 flex w-full justify-end">
      <button type="submit" class="btn btn-purple">Change</button>
    </div>
  </form>
</template>

<script>
export default {};
</script>

<style>
</style>