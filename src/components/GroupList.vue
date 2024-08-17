<template>
    <Container class="groups_container">
        <LoadingAni v-if="is_loading" id="loading" sidelen="75" />
        <RouterLink
            style="text-decoration: none"
            v-else
            v-for="item in glist.slice(
                0,
                max_index == -1
                    ? glist.length
                    : Math.min(max_index, glist.length)
            )"
            :key="item.id"
            :to="'/blogroup/' + item.id"
        >
            <GroupBox :group_info="item"> </GroupBox>
        </RouterLink>
        <slot></slot>
    </Container>
</template>

<script>
import { getgroups } from "../file_loader";
import GroupBox from "./GroupBox.vue";
import LoadingAni from "./LoadingAni.vue";

export default {
    components: {
        GroupBox,
        LoadingAni,
    },
    props: { max_index: { type: String, default: "-1" } },
    data() {
        return {
            is_loading: true,
            glist: {},
        };
    },
    async mounted() {
        getgroups().then(group_list => {
            this.glist = group_list;
            this.is_loading = false;
        });
    },
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
