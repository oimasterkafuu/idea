<template>
    <h2 class="ui header">
        {{ title }}
        <div class="sub header">{{ subtitle }}</div>
    </h2>
</template>

<script>
export default {
    name: 'UserActionHeader',
    props: {
        title: String,
        subtitle: String
    }
};
</script>
