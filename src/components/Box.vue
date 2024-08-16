<template>
    <div :class="['box', appear_state]">
        <h1>{{ box_name }}</h1>
        <hr />
        <p>{{ box_description }}</p>
    </div>
</template>

<script>
export default {
    props: ["box_name", "box_description"],
    data() {
        return {
            appear_state: "bef_appear",
        };
    },
    mounted() {
        setTimeout(() => {
            this.appear_state = "appearing";
            setTimeout(() => {
                this.appear_state = "appeared";
            }, 700);
        }, 100);
    },
    //inheritAttrs: false,
};
</script>

<style scoped>
.box {
    font-family: Consola;
    padding: 10px;
    background-color: rgb(90, 92, 94);
    color: #e2e2e2;
    border-radius: 10px;
    h1 {
        font-variant: small-caps;
    }
    hr {
        border-color: rgb(213, 219, 224);
    }
}
.box.appeared {
    transition: transform 0.35s;
}
.box.appeared:hover {
    filter: drop-shadow(-3px 3px 4px rgb(171, 181, 182));
    transform: translate(7%, -10%) scale(1.1);
}
.box.bef_appear {
    transform: translate(0, 25px);
    opacity: 0;
}
.box.appearing {
    opacity: 1;
    transition: opacity 0.7s ease, transform 0.7s;
}
</style>
