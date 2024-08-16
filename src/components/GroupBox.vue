<template>
    <Box
        :id="'group_' + group_info.id"
        :box_name="group_info.group_name"
        :box_description="group_info.description"
    />
</template>

<script>
import Box from "./Box.vue";

export default {
    components: { Box },
    props: ["group_info"],
};
</script>
