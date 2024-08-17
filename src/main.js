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

document.body.style.setProperty(
    "--hero_bkg_url",
    `url(${config.g_hero_bkg_url})`
);
app.config.globalProperties.$config = config;
app.component("Container", Container);
app.component("Hero", Hero);
app.component("myNav", myNav);
app.use(router).mount("#app");
