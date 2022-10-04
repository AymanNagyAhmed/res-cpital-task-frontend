<template>
  <div class="grid grid-cols-4 gap-2">
    <div
      v-for="item in adCampaigns"
      :key="item.id"
      class="
        max-w-sm
        bg-white
        rounded-lg
        border border-gray-200
        shadow-md
        dark:bg-gray-800 dark:border-gray-700
      "
    >
      <img v-for="image in item.images" :key="image.id" :src="image.original_url"/>
      
      
  
      <div class="p-5">
        <a href="#">
          <h5
            class="
              mb-2
              text-2xl
              font-bold
              tracking-tight
              text-gray-900
              dark:text-white
            "
          >
            {{ item.name }}
          </h5>
        </a>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {{ item.from }} - {{ item.to }}
        </p>
       
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {{ item.total }} - {{ item.daily_budget }}
        </p>
        <router-link
          :to="`adCampaign/${item.id}`"
          class="
            inline-flex
            items-center
            py-2
            px-3
            text-sm
            font-medium
            text-center text-white
            bg-blue-700
            rounded-lg
            hover:bg-blue-800
            focus:ring-4 focus:outline-none focus:ring-blue-300
            dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
          "
        >
          Show
          <svg
            aria-hidden="true"
            class="ml-2 -mr-1 w-4 h-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import AdCampaigns from "@/services/adCampaigns";
export default {
  name: "HomeView",
  data() {
    return {
      adCampaigns: [],
    };
  },

  async beforeMount() {
    this.adCampaigns = await AdCampaigns.getAll();
  },
};
</script>
