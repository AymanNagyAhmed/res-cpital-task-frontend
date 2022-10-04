<template>
  <form @submit.prevent="handelSubmit" class="mx-auto max-w-lg mt-44 text-left">
    <div class="mb-6">
      <label
        for="name"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >Your name</label
      >
      <input
        type="text"
        v-model="name"
        id="name"
        class="
          bg-gray-50
          border border-gray-300
          text-gray-900 text-sm
          rounded-lg
          focus:ring-blue-500 focus:border-blue-500
          block
          w-full
          p-2.5
          dark:bg-gray-700
          dark:border-gray-600
          dark:placeholder-gray-400
          dark:text-white
          dark:focus:ring-blue-500
          dark:focus:border-blue-500
        "
        placeholder="name"
        required
      />
    </div>
    <div class="mb-6">
      <label
        for="email"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >Your email</label
      >
      <input
        type="email"
        id="email"
        v-model="email"
        class="
          bg-gray-50
          border border-gray-300
          text-gray-900 text-sm
          rounded-lg
          focus:ring-blue-500 focus:border-blue-500
          block
          w-full
          p-2.5
          dark:bg-gray-700
          dark:border-gray-600
          dark:placeholder-gray-400
          dark:text-white
          dark:focus:ring-blue-500
          dark:focus:border-blue-500
        "
        placeholder="name@flowbite.com"
        required
      />
    </div>
    <div class="mb-6">
      <label
        for="password"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >Your password</label
      >
      <input
        type="password"
        id="password"
        v-model="password"
        class="
          bg-gray-50
          border border-gray-300
          text-gray-900 text-sm
          rounded-lg
          focus:ring-blue-500 focus:border-blue-500
          block
          w-full
          p-2.5
          dark:bg-gray-700
          dark:border-gray-600
          dark:placeholder-gray-400
          dark:text-white
          dark:focus:ring-blue-500
          dark:focus:border-blue-500
        "
        required
      />
    </div>
    <button
      type="submit"
      :class="
        !(email && password && name)
          ? 'text-white bg-blue-400 dark:bg-blue-500 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center'
          : 'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
      "
    >
      Submit
    </button>
  </form>
</template>

<script>
import {register} from "@/services/auth"
export default {
  name: "RegisterView",
  data() {
    return {
      name: "",
      email: "",
      password: "",
    };
  },
  methods:{
    handelSubmit: function (e) {
      if (this.name && this.email && this.password) {
        register({name:this.name, email:this.email, password:this.password}).then(()=>{
          this.$router.push("/")
        })
      }

      this.errors = [];

      if (!this.name) {
        this.errors.push('Name required.');
      }
      if (!this.age) {
        this.errors.push('Age required.');
      }

      e.preventDefault();
    }
  },
};
</script>

<style lang="scss" scoped>
</style>