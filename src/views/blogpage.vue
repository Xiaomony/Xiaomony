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
import { marked, Renderer } from "marked";
export default {
    data() {
        return {
            loading: true,
            groupId: null,
            blogId: null,
            blog_info: null,
            raw_markdown: null,
            entrance_file: null,
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
            this.entrance_file = entrance;
            const resp = await fetch(entrance);
            this.raw_markdown = await resp.text();
            this.loading = false;
        },
    },
    computed: {
        markdownContent() {
            const localFilePrefix =
                this.entrance_file.substring(
                    0,
                    this.entrance_file.lastIndexOf("/")
                ) + "/";
            const renderer = new Renderer();

            renderer.image = token => {
                const isLocalFile = !/^(https?:)?\/\//i.test(token.href);
                if (isLocalFile) {
                    token.href = localFilePrefix + token.href;
                }
                const titlePart = token.title ? ` title="${token.title}"` : "";
                return `<img src="${token.href}" alt="${token.text}"${titlePart}/>`;
            };
            renderer.link = token => {
                const isLocalFile = !/^(https?:)?\/\//i.test(token.href);
                if (isLocalFile) {
                    token.href = localFilePrefix + token.href;
                }
                const titlePart = token.title ? ` title="${token.title}"` : "";
                return `<a href="${token.href}" ${titlePart} target="_blank">${token.text}</a>`;
            };
            return marked.parse(this.raw_markdown, { renderer });
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
