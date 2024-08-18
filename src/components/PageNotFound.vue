<template>
    <div class="notFoundBox">
        <div class="notFoundText">
            <h1>404</h1>
            <h2>Page Not Found</h2>
        </div>
        <img :src="this.$config.g_404icon_url" />
        <slot></slot>
    </div>
</template>

<style>
.notFoundBox {
    display: flex;
    gap: 20px;
    align-items: center;
    justify-content: center;
    .notFoundText {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
}
</style>
