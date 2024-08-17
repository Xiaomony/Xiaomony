<template>
    <header id="hero">
        <img id="avatar" :src="this.$config.g_avatar_url" />
        <h1 id="name">Xiao-mony</h1>
    </header>
</template>

<style scoped>
#hero {
    height: auto;
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
</style>
