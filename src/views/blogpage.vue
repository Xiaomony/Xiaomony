<template>
    <myNav crrPage="Blogs" />
    <Breadcrumb :breadcrumb_struct="breadcrumb_struct" />
    <div class="blogpage">
        <LoadingAni v-if="loading" />
        <PageNotFound v-else-if="page_notfound" />
        <Container v-else class="blogcontent">
            <h1 class="passage_title">{{ blog_info.blog_title }}</h1>
            <p>{{ blog_info.update_time }}</p>
            <hr />
            <p v-html="markdownContent" class="blog_mainbody" />
        </Container>
    </div>
</template>

<script>
import { findblog_byIds, getgroups } from "@/file_loader";
import { marked, Renderer } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";
import "highlight.js/styles/nord.css";

marked.use(
    markedHighlight({
        langPrefix: "hljs language-",
        highlight(code, lang) {
            const language = hljs.getLanguage(lang) ? lang : "plaintext";
            return hljs.highlight(code, { language }).value;
        },
    })
);
function removeCodeBlock_start_end(str) {
    let count = 0,
        start = 0,
        end = -1;
    for (let i = 0; i < str.length; i++) {
        if (str[i] === "`") count++;
        else if (str[i] === "\n" && count >= 3) {
            start = i;
            break;
        }
    }
    count = 0;
    for (let i = str.length - 1; i > 0; i--) {
        if (str[i] === "`") count++;
        else if (str[i] === "\n" && count >= 3) {
            end = i;
            break;
        }
    }
    return str.slice(start, end);
}
export default {
    data() {
        return {
            loading: true,
            page_notfound: false,
            breadcrumb_struct: null,

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
            if (entrance == null) {
                this.breadcrumb_struct = null;
                this.page_notfound = true;
            } else {
                this.page_notfound = false;
                const groups = await getgroups();
                const groupName =
                    groups[groups.findIndex(item => item.id == this.groupId)]
                        .group_name;
                this.breadcrumb_struct = [
                    {
                        name: "Blogs",
                        route: "/allgroups",
                    },
                    {
                        name: groupName,
                        route: "/blogroup/" + this.groupId,
                    },
                    {
                        name: blog_info.blog_title,
                        route: "/blog/" + this.$route.params.blogId,
                    },
                ];
                this.blog_info = blog_info;
                this.entrance_file = entrance;
                const resp = await fetch(
                    entrance,
                    this.$config.g_fetch_options
                );
                this.raw_markdown = await resp.text();
            }
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
            renderer.code = token => {
                const language = token.lang ? token.lang : "plain-text";
                let code = token.raw.replaceAll('"', "&quot;");
                code = removeCodeBlock_start_end(code);
                return (
                    `<div class="codeblock"><p class="language_flag">${language}</p><pre><code>${token.text}</code></pre>` +
                    `<button onclick="copy_to_clipboard(this)" data-raw-code="${code}">` +
                    `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h168q13-36 43.5-58t68.5-22q38 0 68.5 22t43.5 58h168q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm80-80h280v-80H280v80Zm0-160h400v-80H280v80Zm0-160h400v-80H280v80Zm200-190q13 0 21.5-8.5T510-820q0-13-8.5-21.5T480-850q-13 0-21.5 8.5T450-820q0 13 8.5 21.5T480-790ZM200-200v-560 560Z"/></svg>` +
                    `</button></div>`
                );
            };
            renderer.heading = token => {
                return `<br/><h${token.depth}>${token.text}</h${token.depth}>`;
            };
            marked.use({ renderer: renderer });
            return marked.parse(this.raw_markdown);
        },
    },
};
</script>

<style scoped>
.blogpage {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 10px;
    .blogcontent {
        color: rgb(233, 232, 232);
        width: 60%;
    }
}
.passage_title {
    color: azure;
}
</style>

<style>
code,
.codeblock {
    background-color: rgb(66, 66, 66);
    border-radius: 5px;
}
.codeblock {
    display: flex;
    padding: 15px 5px 5px;
    position: relative;

    .language_flag {
        position: absolute;
        top: 0;
        font-size: 11px;
        color: rgb(238, 237, 191);
    }
    button {
        opacity: 0;
        position: absolute;
        right: 0;
        top: 0;
        padding: 0;
        display: flex;
        border: 0;
    }
    /*--------------*/
    button {
        font: var(--app_font);
        color: aliceblue;
        background-color: rgb(129, 129, 129);
        border-radius: 5px;
        transition: border-color 0.25s, background-color 0.25s, opacity 0.2s;
    }
    button:hover {
        background-color: rgb(88, 88, 88);
    }
    button:active {
        background-color: rgb(36, 36, 36);
    }
    /*--------------*/
}
.codeblock:hover {
    button {
        opacity: 0.7;
    }
}
</style>
