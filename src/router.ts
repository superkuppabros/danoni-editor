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
      props(): PropsType {
        return {
          loadScoreDataStr: history.state.scoreData as string,
          loadMusicUrl: history.state.musicUrl as string,
          selectedKey: (history.state.key || "7") as CustomKeyKind,
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
