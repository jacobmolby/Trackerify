<template>
  <main class="p-10 w-full text-gray-700">
    <header class="text-center font-bold">
      <div class="flex justify-center items-center w-full">
        <svg class="fill-current inline-block h-24 w-24" viewBox="0 0 20 20">
          <path
            d="M15.3 14.89l2.77 2.77a1 1 0 0 1 0 1.41 1 1 0 0 1-1.41 0l-2.59-2.58A5.99 5.99 0 0 1 11 18V9.04a1 1 0 0 0-2 0V18a5.98 5.98 0 0 1-3.07-1.51l-2.59 2.58a1 1 0 0 1-1.41 0 1 1 0 0 1 0-1.41l2.77-2.77A5.95 5.95 0 0 1 4.07 13H1a1 1 0 1 1 0-2h3V8.41L.93 5.34a1 1 0 0 1 0-1.41 1 1 0 0 1 1.41 0l2.1 2.1h11.12l2.1-2.1a1 1 0 0 1 1.41 0 1 1 0 0 1 0 1.41L16 8.41V11h3a1 1 0 1 1 0 2h-3.07c-.1.67-.32 1.31-.63 1.89zM15 5H5a5 5 0 1 1 10 0z"
          />
        </svg>
        <h1 class="ml-4 text-6xl">Trackerify</h1>
      </div>
      <h1 class="mt-5 text-2xl">
        Your
        <span class="text-red-600">Easy</span>
        Bugtracking Platform
      </h1>
    </header>

    <section class="mt-20">
      <h2 class="font-semibold text-lg">What We Do?</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis fugit, enim molestiae praesentium eveniet, recusandae et error beatae facilis ex harum consequuntur, quia pariatur non. Doloribus illo, ullam blanditiis ab.</p>
    </section>
    <section class="mt-10">
      <h2 class="font-semibold text-lg">Why You Should Use It</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis fugit, enim molestiae praesentium eveniet, recusandae et error beatae facilis ex harum consequuntur, quia pariatur non. Doloribus illo, ullam blanditiis ab.</p>
    </section>
    <section class="mt-10">
      <h2 class="font-semibold text-lg">Don't Hesitate, Start Now!</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis fugit, enim molestiae praesentium eveniet, recusandae et error beatae facilis ex harum consequuntur, quia pariatur non. Doloribus illo, ullam blanditiis ab.</p>
    </section>
    <section
      class="mt-20 p-4 w-full bg-deepblue-500 max-w-md container mx-auto rounded-lg shadow-md text-white"
    >
      <h1 class="font-bold text-md md:text-2xl text-center">Get Notified When We Launch</h1>
      <form class="flex flex-col sm:flex-row w-full mt-2 items-center justify-center">
        <div class>
          <label class="mb-6 text-lg font-semibold" for="email">Email</label>
        </div>
        <div class>
          <input
            class="mt-2 sm:mt-0 sm:ml-4 w-full bg-gray-100 rounded-lg border border-gray-300 text-gray-700 py-2 px-2 leading-tight focus:outline-none"
            type="text"
            id="email"
            placeholder="example@example.com"
            aria-label="Email"
          />
        </div>
        <div class>
          <button
            to="/"
            class="px-2 py-2 ml-0 mt-4 sm:mt-0 sm:ml-8 min-w-full border border-green-400 rounded-lg hover:text-gray-200 tracking-wide focus:outline-none focus:bg-gray-500 hover:border-gray-100"
          >Sign Up</button>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
export default {
  name: 'home',
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.query.logout) {
        vm.$store.dispatch('logout');
      }
    });
  }
};
</script>

<style>
</style>