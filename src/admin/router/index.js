import Vue from "vue";
import VueRouter from "vue-router";
import axios from "axios";

import login from "../pages/login.vue";
import about from "../pages/about.vue";
import work from "../pages/work.vue";
import reviews from "../pages/reviews.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: about,
    meta: {
      title: "Блок «Обо мне»"
    }
  },
  {
    path: "/work",
    component: work,
    meta: {
      title: "Блок «Работы»"
    }
  },
  {
    path: "/reviews",
    component: reviews,
    meta: {
      title: "Блок «Отзывы»"
    }
  },
  {
    path: "/login",
    component: login,
    meta: {
      public: true
    }
  }
];

const router = new VueRouter({ routes });

export default router;
