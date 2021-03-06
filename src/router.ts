import Vue from "vue";
import Editor from "./pages/Editor.vue";
import Start from "./pages/Start.vue";
import Configure from "./pages/Configure.vue";
import Router from "vue-router";
import { CustomKeyKind } from "./model/KeyKind";

Vue.config.productionTip = false;

Vue.use(Router);

type PropsType = {
  loadScoreDataStr: string;
  loadMusicUrl: string;
  selectedKey: CustomKeyKind;
};

export default new Router({
  routes: [
    {
      path: "/",
      name: "start",
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
          selectedKey: (routes.params.key || "7") as CustomKeyKind
        };
      }
    },
    {
      path: "/configure",
      name: "configure",
      component: Configure
    }
  ]
});
