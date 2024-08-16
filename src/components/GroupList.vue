<template>
    <Container class="groups_container">
        <LoadingAni v-if="is_loading" id="loading" sidelen="75" />
        <GroupBox
            v-else
            v-for="item in glist"
            :key="item.id"
            :group_info="item"
        >
        </GroupBox>
    </Container>
</template>

<script>
import { loadgroups } from "../file_loader";
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
.groups_container {
    display: flex;
    flex-direction: column;
    padding: 10px 3%;
    gap: 15px;
    width: 45%;
}
</style>
