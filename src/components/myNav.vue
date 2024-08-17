<template>
    <nav>
        <RouterLink to="/" id="nav_avatar">
            <img :src="this.$config.g_avatar_url" title="Xiao-mony" />
        </RouterLink>
        <ul id="navbar">
            <li
                v-for="(item, index) in navItemList"
                :class="['navitem', crrTabIndex === index ? 'active' : '']"
                :key="index"
                ref="navItems"
            >
                <RouterLink
                    :to="item.url"
                    @mouseover="this.hoverTabIndex = index"
                    @mouseleave="this.hoverTabIndex = this.crrTabIndex"
                >
                    {{ item.name }}
                </RouterLink>
            </li>
            <div
                v-if="underline_width > 0"
                class="underline"
                :style="underlineStyle"
            ></div>
        </ul>
        <div id="links">
            <a href="https://github.com/Xiaomony" target="_blank">
                <img
                    :src="this.$config.g_github_icon_url"
                    width="25px"
                    height="25px"
                    alt="Github"
                    title="my Github page"
                />
            </a>
        </div>
    </nav>
</template>

<script>
export default {
    props: {
        crrPage: {
            type: String,
            default: "Home",
        },
    },
    data() {
        const navItems = this.$config.g_nav_items;
        const crrTabIndex = navItems.findIndex(
            item => item.name === this.crrPage
        );
        return {
            navItemList: navItems,
            crrTabIndex: crrTabIndex,
            hoverTabIndex: crrTabIndex,
            underline_width: 0,
            underline_left: 0,
            underline_bottom: 0,
        };
    },
    mounted() {
        const tabElement = this.$refs.navItems[this.hoverTabIndex];
        this.underline_left = tabElement.offsetLeft;
        this.underline_top = tabElement.offsetTop + tabElement.offsetHeight;
        this.underline_width = tabElement.clientWidth;
    },
    computed: {
        underlineStyle() {
            return {
                left: `${this.underline_left}px`,
                top: `${this.underline_top}px`,
                width: `${this.underline_width}px`,
            };
        },
    },
    watch: {
        hoverTabIndex(newValue) {
            const tabElement = this.$refs.navItems[newValue];
            this.underline_left = tabElement.offsetLeft;
            this.underline_top = tabElement.offsetTop + tabElement.offsetHeight;
            this.underline_width = tabElement.clientWidth;
        },
    },
};
</script>

<style scoped src="@/assets/navStyle.css"></style>
