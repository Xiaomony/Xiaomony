import "@/assets/main.css";
import { config } from "@/config";
window.fav_icon.href = config.g_favicon_url;

import { createApp } from "vue";

import App from "@/App.vue";
import Container from "@/components/Container.vue";
import Hero from "@/components/Hero.vue";
import myNav from "@/components/myNav.vue";
import router from "@/router";

const app = createApp(App);

app.config.globalProperties.$config = config;
app.component("Container", Container);
app.component("Hero", Hero);
app.component("myNav", myNav);
app.use(router).mount("#app");
