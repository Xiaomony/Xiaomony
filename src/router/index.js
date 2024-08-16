import { createRouter, createWebHashHistory } from "vue-router";

import Home from "@/views/Home.vue";
import Intro from "@/views/Intro.vue";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: "/", component: Home },
        { path: "/Intro", component: Intro },
    ],
});

export default router;
