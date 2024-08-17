<template>
    <Hero />
    <myNav crrPage="Blogs" />
    <div class="allgroup_page">
        <GroupList />
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
.allgroup_page {
    display: flex;
    justify-content: center;
}
</style>
