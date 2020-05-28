import Vue from "vue";
import Editor from "./pages/Editor.vue";
import Start from "./pages/Start.vue";
import Router from "vue-router";
import { KeyKind } from "./model/KeyKind";

Vue.config.productionTip = false;

Vue.use(Router);

type PropsType = {
  loadScoreDataStr: string;
  loadMusicUrl: string;
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
      name: "editor",
      component: Editor,
      props(routes): PropsType {
        return {
          loadScoreDataStr: routes.params.scoreData,
          loadMusicUrl: routes.params.musicUrl,
          selectedKey: (routes.query.key || "7") as KeyKind
        };
      }
    }
  ]
});
