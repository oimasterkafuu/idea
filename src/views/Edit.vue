<template>Edit {{ id }}.</template>

<script>
export default {
    name: 'Edit',
    data() {
        return {
            id: this.$route.params.id
        };
    }
};
</script>
