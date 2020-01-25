<template>
  <div class="leading-normal tracking-normal text-gray-900">
    <div class="pb-14 bg-right bg-cover" style="background-image:url('img/bg.svg');">
      <!--Nav-->
      <MarketingSiteNavigation />

      <!--Main-->
      <div
        class="container pt-24 md:pt-48 px-6 mx-auto flex flex-wrap flex-col md:flex-row items-center justify-center"
      >
        <form
          @submit.prevent="checkForm"
          class="w-full max-w-lg p-4 rounded shadow slide-in-bottom"
          style="background-color:rgba(63, 81, 181, 0.05)"
        >
          <div class="-mx-3 md:flex mb-6">
            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name"
              >First Name</label>
              <input
                class="appearance-none block w-full border border-gray-200 rounded py-2 px-3 shadow focus:shadow-md mb-3"
                :class="{'border-red-500': this.firstNameError}"
                id="grid-first-name"
                type="text"
                placeholder="Jane"
                v-model="firstName"
              />
              <p class="text-red-500 mt-3 text-xs italic">{{this.firstNameError}}</p>
            </div>
            <div class="md:w-1/2 px-3">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-last-name"
              >Last Name</label>
              <input
                class="appearance-none block w-full border border-gray-200 rounded py-2 px-3 shadow focus:shadow-md"
                :class="{'border-red-500': this.lastNameError}"
                id="grid-last-name"
                type="text"
                placeholder="Doe"
                v-model="lastName"
              />
              <p class="text-red-500 mt-3 text-xs italic">{{this.lastNameError}}</p>
            </div>
          </div>
          <div class="-mx-3 md:flex mb-6">
            <div class="md:w-full px-3">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-password"
              >Email</label>
              <input
                class="appearance-none block w-full border border-gray-200 rounded py-2 px-3 shadow focus:shadow-md mb-3"
                :class="{'border-red-500': this.emailError}"
                id="email"
                type="text"
                placeholder="example@example.com"
                v-model="email"
              />
              <p class="text-red-500 mt-3 text-xs italic">{{this.emailError}}</p>
            </div>
          </div>
          <div class="-mx-3 md:flex">
            <div class="md:w-full mb-6 px-3">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-password"
              >Password</label>
              <input
                class="appearance-none block w-full border border-gray-200 rounded py-2 px-3 shadow focus:shadow-md mb-3"
                :class="{'border-red-500': this.emailError}"
                id="grid-password"
                type="password"
                placeholder="******************"
                v-model="password"
              />
              <p class="text-red-500 mt-3 text-xs italic">{{this.passwordError}}</p>
              <p class="text-red-500 mt-3 text-xs italic">{{this.error}}</p>
            </div>
          </div>
          <div class="-mx-3 flex items-center justify-end">
            <div class="px-3">
              <button
                class="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
                type="submit"
              >Register</button>
            </div>
          </div>
        </form>
        <!--Footer-->
        <TheFooter />
      </div>
    </div>
  </div>
</template>

<script>
import MarketingSiteNavigation from '../components/MarketingSiteNavigation';
import TheFooter from '../components/reusables/TheFooter';
import AuthenticationService from '@/services/AuthenticationService';
import validEmail from '@/utilities/validEmail';
import validPassword from '@/utilities/validPassword';

export default {
  name: 'register',
  components: {
    TheFooter,
    MarketingSiteNavigation
  },
  data() {
    return {
      firstName: null,
      lastName: null,
      firstNameError: null,
      lastNameError: null,
      email: null,
      emailError: null,
      password: null,
      passwordError: null,
      error: null
    };
  },
  methods: {
    checkForm() {
      // Reset error
      let fullName = null;
      this.firstNameError = null;
      this.lastNameError = null;
      this.emailError = null;
      this.passwordError = null;
      this.error = null;

      // Check valid name
      if (this.firstName && this.lastName) {
        this.fullName = `${this.firstName} ${this.lastName}`;
      }
      if (!this.firstName) {
        this.firstNameError = 'Please choose a first name.';
      }
      if (!this.lastName) {
        this.lastNameError = 'Please choose a last name.';
      }
      // Check valid email
      let emailIsValid = validEmail(this.email);

      if (!this.email) {
        this.emailError = 'Please choose an email.';
      } else if (this.email && !emailIsValid) {
        this.emailError = 'Email is not valid';
      }
      // Check valid password
      let passwordIsValid = validPassword(this.password);
      if (!this.password) {
        this.passwordError = 'Please choose a password.';
      } else if (this.password && !passwordIsValid) {
        this.passwordError =
          'A password must contain at least a letter, a capital letter, a number and must be between 8 and 32 characters long';
      }
      if (emailIsValid && passwordIsValid && this.fullName) {
        this.register();
      }
    },
    async register() {
      try {
        const response = await AuthenticationService.register({
          name: this.fullName,
          email: this.email.toLowerCase(),
          password: this.password
        });

        this.$store.dispatch('setToken', response.data.token);
        this.$store.dispatch('setUser', response.data.user);
        this.$router.push({
          name: 'boardOverview'
        });
      } catch (error) {
        if (error.response.data.error) {
          this.error = error.response.data.error;
        }
        this.error = 'Server is down';
      }
    }
  }
};
</script>

<style scoped>
.slide-in-bottom {
  -webkit-animation: slide-in-bottom 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)
    both;
  animation: slide-in-bottom 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

@-webkit-keyframes slide-in-bottom {
  0% {
    -webkit-transform: translateY(1000px);
    transform: translateY(1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }
}
@keyframes slide-in-bottom {
  0% {
    -webkit-transform: translateY(1000px);
    transform: translateY(1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }
}
</style>