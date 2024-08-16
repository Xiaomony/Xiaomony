<template>
    <div class="blogs_container">
        <!-- <p v-if="is_loading">Loading</p> -->
        <LoadingAni v-if="is_loading" id="loading" sidelen="100" />
        <GroupBox
            v-else
            v-for="item in glist"
            :key="item.id"
            :group_info="item"
        >
        </GroupBox>
    </div>
</template>

<script>
import { loadgroups } from "../blogs_loader";
import GroupBox from "./GroupBox.vue";
import LoadingAni from "./LoadingAni.vue";

export default {
    components: {
        GroupBox,
        LoadingAni,
    },
    data() {
        return {
            is_loading: true,
            glist: {},
        };
    },
    async mounted() {
        const group_list = await loadgroups();
        this.glist = group_list;
        setTimeout(() => {
            this.is_loading = false;
        }, 100);
    },
    methods: {},
};
</script>

<style>
#loading {
    margin-left: auto;
    margin-right: auto;
}
.blogs_container {
    display: flex;
    flex-direction: column;
    background-color: rgb(48, 50, 54);
    padding: 10px 3%;
    gap: 15px;
    width: 45%;

    border: solid rgba(221, 221, 221, 0.5);
    border-top: 2px;
    border-bottom: 2px;
    border-radius: 5px;
    filter: drop-shadow(5px 0 2px rgb(126, 126, 126))
        drop-shadow(-5px 0 2px rgb(126, 126, 126));
}
</style>
