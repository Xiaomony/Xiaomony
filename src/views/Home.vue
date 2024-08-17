<template>
    <Hero />
    <myNav crrPage="Home" />
    <div id="main_body">
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
#main_body {
    display: flex;
    justify-content: center;
    background-color: rgb(160, 179, 179);
}
</style>
