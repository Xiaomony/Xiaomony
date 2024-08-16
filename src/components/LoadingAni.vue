<template>
    <div
        class="spinner"
        :style="{ width: sidelen + 'px', height: sidelen + 'px' }"
    ></div>
</template>

<script>
export default {
    props: {
        sidelen: {
            type: String,
            default: "50",
        },
    },
};
</script>

<style scoped>
.spinner {
    border: 4px solid transparent;
    border-top: 4px solid aliceblue;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
}
@keyframes spin {
    from {
        transform: rotate(0deg); /* 初始位置 */
    }
    to {
        transform: rotate(360deg); /* 旋转一圈 */
    }
}
</style>
