import Vue from "vue";
import Editor from "./pages/Editor.vue";
import Start from "./pages/Start.vue";
import Router from "vue-router";

Vue.config.productionTip = false;

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/start",
      name: "Start",
      component: Start
    },
    {
      path: "/editor",
      name: "Editor",
      component: Editor
    }
  ]
});
