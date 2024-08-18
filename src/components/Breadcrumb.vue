<template>
    <nav v-if="breadcrumb_struct != null" class="breadcrumb_nav">
        <ul>
            <li v-for="(item, index) in breadcrumb_struct">
                <RouterLink :to="item.route">
                    <div class="each_bread_block">
                        {{ item.name }}
                    </div>
                </RouterLink>
                <p v-if="index < breadcrumb_struct.length - 1">→</p>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    props: ["breadcrumb_struct"],
    /*
    breadcrumb_struct
    [
        {
            name: "...",
            route: "/.../..."
        },
        {
            name: ""
        }
    ]
    */
};
</script>

<style scoped>
.breadcrumb_nav {
    background-color: #242424;
    ul {
        padding: 5px 20px;
        list-style: none;
        display: flex;
        gap: 5px;
        li {
            display: flex;
            gap: 5px;
            align-items: center;
        }
        .each_bread_block {
            padding: 2px 5px;
            border: 2px solid transparent;
            border-radius: 5px;
            color: rgb(230, 230, 230);
            background-color: rgb(67, 81, 112);
            text-decoration: none;
            transition: background-color 0.4s;
        }
        .each_bread_block:hover {
            border: 2px solid rgb(57, 108, 216);
        }
        .each_bread_block:active {
            background-color: rgb(128, 128, 128);
        }
        a {
            text-decoration: none;
        }
    }
}
</style>
