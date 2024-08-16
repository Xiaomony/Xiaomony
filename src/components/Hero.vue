<template>
    <header id="hero">
        <img id="avatar" :src="avatar_url" />
        <h1 id="name">Xiao-mony</h1>
    </header>
    <nav>
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
            <div class="underline" :style="underlineStyle"></div>
        </ul>
    </nav>
</template>

<script>
const navItems = [
    {
        name: "Home",
        url: "/",
    },
    {
        name: "Intro",
        url: "/Intro",
    },
];
export default {
    props: {
        crrPage: {
            type: String,
            default: "Home",
        },
    },
    data() {
        const crrTabIndex = navItems.findIndex(
            item => item.name === this.crrPage
        );
        return {
            avatar_url: this.$config.g_avatar_url,
            navItemList: navItems,
            crrTabIndex: crrTabIndex,
            hoverTabIndex: crrTabIndex,
            underline_width: 0,
            underline_left: 0,
        };
    },
    mounted() {
        const tabElement = this.$refs.navItems[this.hoverTabIndex];
        this.underline_left = tabElement.offsetLeft;
        this.underline_width = tabElement.clientWidth;
        this.$forceUpdate();
    },
    computed: {
        underlineStyle() {
            return {
                left: `${this.underline_left}px`,
                width: `${this.underline_width}px`,
            };
        },
    },
    watch: {
        hoverTabIndex(newValue) {
            const tabElement = this.$refs.navItems[newValue];
            this.underline_left = tabElement.offsetLeft;
            this.underline_width = tabElement.clientWidth;
        },
    },
};
</script>

<style scoped>
#hero {
    height: 300px;
    background-image: url("../hero_bkg.png");
    background-size: cover;
    background-position: center -70px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;

    #avatar {
        max-width: 10%;
        border-radius: 50%;
        border: 3px solid rgba(105, 105, 105, 0.5);
        filter: drop-shadow(3px 3px 10px #000000);
    }
    #name {
        padding: 5px;
        color: rgb(224, 224, 224);
        border-radius: 10px;
        background-color: rgba(71, 71, 71, 0.6);
        filter: drop-shadow(3px 3px 4px #000000);
    }
}
nav {
    display: flex;
    background-color: #242424;
    border-bottom: 3px solid #505050;

    #navbar {
        position: relative;

        list-style: none;
        justify-content: space-between;
        align-items: center;
        display: flex;
        padding: 7px;
        gap: 25px;
        .navitem {
            cursor: pointer;
        }
        a {
            color: rgb(209, 209, 209);
            text-decoration: none;
        }
        .navitem.active a {
            color: azure;
            font-weight: bolder;
        }
        .underline {
            position: absolute;
            bottom: 5px;
            height: 4px;
            border-radius: 2px;
            background-color: rgb(46, 154, 255);
            transition: left 0.3s ease, width 0.3s ease;
            width: 10px;
            left: 0;
        }
    }
}
</style>
