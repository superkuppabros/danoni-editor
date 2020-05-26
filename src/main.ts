import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import UIkit from "uikit";
import Icons from "uikit/dist/js/uikit-icons";

import "uikit/dist/css/uikit.min.css";
import "uikit/dist/css/uikit-core.min.css";

UIkit.use(Icons);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
