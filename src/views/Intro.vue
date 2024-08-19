<template>
    <Hero />
    <myNav crrPage="Intro" />
    <div class="intro_page">
        <Container class="intro_content"> Some Introduce </Container>
    </div>
</template>

<script>
export default {};
</script>

<style scoped>
.intro_page {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.intro_content {
    width: 50%;
}
</style>
