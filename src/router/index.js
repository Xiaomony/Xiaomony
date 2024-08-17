import { createRouter, createWebHashHistory } from "vue-router";

import Home from "@/views/Home.vue";
import Intro from "@/views/Intro.vue";
import blogroup from "@/views/blogroup.vue";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: "/", component: Home },
        { path: "/Intro", component: Intro },
        { path: "/blogroup/:groupId", component: blogroup },
    ],
});

export default router;
