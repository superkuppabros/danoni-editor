import Editor from "./pages/Editor.vue";
import Start from "./pages/Start.vue";
import Configure from "./pages/Configure.vue";
import { createRouter, createWebHashHistory } from "vue-router";
import { CustomKeyKind } from "./model/KeyKind";

//Vue.config.productionTip = false;

type PropsType = {
  loadScoreDataStr: string;
  loadMusicUrl: string;
  selectedKey: CustomKeyKind;
};

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "start",
      component: Start,
    },
    {
      path: "/editor",
      name: "editor",
      component: Editor,
      props(routes): PropsType {
        return {
          loadScoreDataStr: routes.params.scoreData as string,
          loadMusicUrl: routes.params.musicUrl as string,
          selectedKey: (routes.params.key || "7") as CustomKeyKind,
        };
      },
    },
    {
      path: "/configure",
      name: "configure",
      component: Configure,
    },
  ],
});
