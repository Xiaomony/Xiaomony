<template>
    <Hero />
    <myNav crrPage="Home" />
    <div id="main_body">
        <GroupList max_index="5">
            <RouterLink to="/allgroups">
                <button id="all_blogs_button" class="push_button">
                    All Blogs
                </button>
            </RouterLink>
        </GroupList>
    </div>
</template>

<script>
import GroupList from "@/components/GroupList.vue";

export default {
    components: {
        GroupList,
    },
};
</script>

<style>
#main_body {
    display: flex;
    justify-content: center;
    /* background-color: rgb(160, 179, 179); */
}
#all_blogs_button {
    width: 30%;
    height: 40px;
}
</style>
