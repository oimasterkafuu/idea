<template>
    <Navbar />
    <div class="ui container">
        <RouterView />
    </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
export default {
    name: 'App',
    components: {
        Navbar
    }
};
</script>
