<template>
  <div class="max-w-lg" v-if="adCampaign">
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
          {{ adCampaign.name }}
        </h5>
      </a>
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
        {{ adCampaign.from }} - {{ adCampaign.to }}
      </p>

      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
        {{ adCampaign.total }} - {{ adCampaign.daily_budget }}
      </p>

      <div class="grid grid-cols-4 gap-2">
        <div
          v-for="image in adCampaign.images"
          :key="image.id"
          class="
            max-w-sm
            bg-white
            rounded-lg
            border border-gray-200
            shadow-md
            dark:bg-gray-800 dark:border-gray-700
          "
        >
          <img :key="image.id" :src="image.original_url" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdCampaigns from "@/services/adCampaigns";
export default {
  name: "AdCampiagnDetails",
  data() {
    return {
      adCampaign: {},
    };
  },
  async beforeMount() {
    const id = this.$route.params["id"];
    AdCampaigns.get(id).then((response) => {
      console.log(response)
      this.adCampaign = response;
    });
  },
};
</script>

<style lang="scss" scoped>
</style>