<template>
  <form @submit.prevent="handelSubmit" class="mx-auto max-w-lg mt-44 text-left">
    <div class="mb-6">
      <label
        for="name"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >Campaign name</label
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
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >From</label
      >
      <date-picker v-model="from" type="date"></date-picker>
    </div>
    <div class="mb-6">
      <label
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >To</label
      >
      <date-picker v-model="to" type="date"></date-picker>
    </div>
    <div class="mb-6">
      <label
        for="daily_budget"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >daily budget
      </label>
      <input
        type="text"
        v-model.number="daily_budget"
        id="daily_budget"
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
        placeholder="daily budget"
        required
      />
    </div>
    <div class="mb-6">
      <label
        for="total"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >daily budget
      </label>
      <input
        type="text"
        v-model.number="total"
        id="total"
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
        placeholder="total"
        required
      />
    </div>
    <UploadImages @changed="handleImages" />
    <button
      type="submit"
      :class="
        !(name && from && to && files && daily_budget && total)
          ? 'text-white bg-blue-400 dark:bg-blue-500 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center'
          : 'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
      "
    >
      Submit
    </button>
  </form>
</template>

<script>
import { register } from "@/services/auth";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import UploadImages from "vue-upload-drop-images";
import AdCampaigns from '@/services/adCampaigns';

export default {
  name: "RegisterView",
  components: { DatePicker, UploadImages },
  data() {
    return {
      name: "",
      from: "",
      to: "",
      total: 0,
      daily_budget: 0,
      files:[],
    };
  },
  methods: {
    handelSubmit: function (e) {
      const formData = new FormData();
      formData.append("name", this.name);
      
      formData.append("from", this.from.toISOString().slice(0,15));
      formData.append("to", this.to.toISOString().slice(0,15));
      formData.append("total", this.total);
      formData.append("daily_budget", this.daily_budget);
      this.files.forEach((file,index) => {
        formData.append(`images[${index}]`, file, file.name);
      });
      console.log(formData);
      AdCampaigns.create(formData);
      
    },
    handleImages(files) {
      console.log(files);
      this.files= files;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>