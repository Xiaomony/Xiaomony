import "./assets/main.css";
import { config } from "./config";

window.fav_icon.href = config.g_favicon_url;

import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);

app.config.globalProperties.$config = config;

app.mount("#app");
