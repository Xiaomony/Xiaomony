<template>
    <Hero />
    <div id="main_body">
        <GroupList />
    </div>
</template>

<script>
import Hero from "@/components/Hero.vue";
import GroupList from "@/components/GroupList.vue";

export default {
    components: {
        Hero,
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
