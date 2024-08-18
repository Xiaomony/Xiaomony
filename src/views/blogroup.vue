<template>
    <myNav crrPage="Blogs" />
    <Breadcrumb :breadcrumb_struct="breadcrumb_struct" />
    <div class="page">
        <Container id="bloglist">
            <LoadingAni v-if="isloading" />
            <PageNotFound v-else-if="page_notfound" />
            <RouterLink
                v-else
                style="text-decoration: none"
                v-for="item in blist"
                :key="item.id"
                :to="`/blog/${group_info.id}_${item.id}`"
            >
                <Box
                    :id="'blog_' + item.id"
                    :box_name="item.blog_title"
                    :box_description="item.description"
                />
            </RouterLink>
        </Container>
    </div>
</template>

<script>
import Box from "@/components/Box.vue";
import { getblogs_byGroupID } from "@/file_loader";

export default {
    components: {
        Box,
    },
    data() {
        return {
            isloading: true,
            blist: {},
            group_info: null,
            page_notfound: false,
            breadcrumb_struct: null,
        };
    },
    mounted() {
        this.refreshBlogList(this.$route.params.groupId);
    },
    created() {
        this.$watch(
            () => this.$route.params.groupId,
            newId => this.refreshBlogList(newId)
        );
    },
    methods: {
        refreshBlogList(groupId) {
            getblogs_byGroupID(groupId).then(([group_info, blog_list]) => {
                if (blog_list != null) {
                    this.group_info = group_info;
                    this.blist = blog_list;
                    this.breadcrumb_struct = [
                        {
                            name: "Blogs",
                            route: "/allgroups",
                        },
                        {
                            name: group_info.group_name,
                            route: "/blogroup/" + groupId,
                        },
                    ];
                } else {
                    this.page_notfound = true;
                }
                this.isloading = false;
            });
        },
    },
};
</script>

<style scoped>
.page {
    display: flex;
    justify-content: center;
}
#bloglist {
    display: flex;
    flex-direction: column;
    padding: 10px 3%;
    gap: 15px;
    width: 50%;
}
</style>
