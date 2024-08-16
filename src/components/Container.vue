<template>
    <div class="container">
        <slot></slot>
    </div>
</template>

<script></script>

<style scoped>
.container {
    background-color: rgb(48, 50, 54);
    padding: 10px 3%;

    border: solid rgba(221, 221, 221, 0.5);
    border-top: 2px;
    border-bottom: 2px;
    border-radius: 5px;
    filter: drop-shadow(5px 0 2px rgb(126, 126, 126))
        drop-shadow(-5px 0 2px rgb(126, 126, 126));
}
</style>
