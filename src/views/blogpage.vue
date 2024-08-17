<template>
    <myNav crrPage="Blogs" />
    <div class="blogpage">
        <LoadingAni v-if="loading" />

        <Container v-else class="blogcontent" v-html="markdownContent">
        </Container>
    </div>
</template>

<script>
import { findblog_byIds } from "@/file_loader";
import { marked } from "marked";
export default {
    data() {
        return {
            loading: true,
            groupId: null,
            blogId: null,
            blog_info: null,
            raw_markdown: null,
        };
    },
    mounted() {
        this.refreshBlogPage(this.$route.params.blogId);
    },
    created() {
        this.$watch(
            () => this.$route.params.blogId,
            newId => this.refreshBlogPage(newId)
        );
    },
    methods: {
        refreshBlogPage(id) {
            const [groupId, blogId] = id.split("_");
            findblog_byIds(groupId, blogId).then(this.showMarkdown);
            this.groupId = groupId;
            this.blogId = blogId;
        },
        async showMarkdown([entrance, blog_info]) {
            this.blog_info = blog_info;
            const resp = await fetch(entrance);
            this.raw_markdown = await resp.text();
            this.loading = false;
        },
    },
    computed: {
        markdownContent() {
            return marked(this.raw_markdown);
        },
    },
};
</script>

<style scoped>
.blogpage {
    display: flex;
    flex-direction: column;
    align-items: center;
    .blogcontent {
        width: 60%;
    }
}
</style>
