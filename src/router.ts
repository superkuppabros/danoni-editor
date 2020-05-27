import Vue from "vue";
import Editor from "./pages/Editor.vue";
import Start from "./pages/Start.vue";
import Router from "vue-router";
import { KeyKind } from "./model/KeyKind";
import { ScoreData } from "./model/ScoreData";

Vue.config.productionTip = false;

Vue.use(Router);

type QueryType = {
  loadScoreData: ScoreData;
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
      props(routes): QueryType {
        return {
          loadScoreData: (routes.params.scoreData as unknown) as ScoreData,
          selectedKey: (routes.query.key || "7") as KeyKind
        };
      }
    }
  ]
});
