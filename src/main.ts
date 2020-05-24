import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import "uikit/dist/css/uikit.css";
import "uikit/dist/css/uikit.min.css";

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
