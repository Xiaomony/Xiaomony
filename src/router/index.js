import {
    createRouter,
    createWebHashHistory,
    createWebHistory,
} from "vue-router";

import Home from "@/views/Home.vue";
import Intro from "@/views/Intro.vue";
import blogroup from "@/views/blogroup.vue";
import blogpage from "@/views/blogpage.vue";
import allgroups from "@/views/allgroups.vue";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: "/", component: Home },
        { path: "/Intro", component: Intro },
        { path: "/allgroups", component: allgroups },
        { path: "/blogroup/:groupId", component: blogroup },
        { path: "/blog/:blogId", component: blogpage },
    ],
});

export default router;
