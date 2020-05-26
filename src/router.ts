import Vue from "vue";
import Editor from "./pages/Editor.vue";
import Start from "./pages/Start.vue";
import Router from "vue-router";
import { KeyKind } from "./model/KeyKind";

Vue.config.productionTip = false;

Vue.use(Router);

type QueryType = {
  selectedKey: KeyKind;
};

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
      component: Editor,
      props(routes): QueryType {
        return {
          selectedKey: (routes.query.key || "7") as KeyKind
        };
      }
    }
  ]
});
