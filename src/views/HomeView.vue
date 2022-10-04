<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import {login} from "@/services/auth";
import AdCampaign from "@/services/adCampaigns";
import AdCampaigns from '@/services/adCampaigns';
export default {
  name: "HomeView",
  components: {
    HelloWorld,
  },
  
};
</script>
