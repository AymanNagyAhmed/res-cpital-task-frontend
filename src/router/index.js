import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import AddAdCampaign from "@/views/AddAdCampaign.vue";
import AdCampaignDetails from '@/views/AdCampaignDetails.vue';

import RegisterView from "@/views/RegisterView.vue";
import store from "@/store";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  { path: "/register", name: "register", component: RegisterView },
  {
    path: "/logout",
    name: "logout",
  },

  { path: "/addAdCampaign", name: "addAdCampaign", component: AddAdCampaign },
  {path:"/adCampaign/:id", name:"AdCampaignDetails", component: AdCampaignDetails}
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if ((to.name == "logout")) {
    store.commit("token/updateLocalAccessToken", null);
    store.commit("token/removeUser");
    next("/");
  }
  if (to.name=="addAdCampaign" && !store.getters["token/getLocalAccessToken"]) {
    
    next("/login");
  }
  if (
    store.getters["token/getLocalAccessToken"] &&
    (to.name == "login" || to.name == "register")
  ) {
    next("/");
  }
  next();
});
export default router;
