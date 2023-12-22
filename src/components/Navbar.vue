<template>
    <div class="ui top fixed borderless menu">
        <div class="ui container">
            <RouterLink to="/" class="header item">
                <div class="logo">
                    <i class="lightbulb icon"></i>
                    Idea
                </div>
            </RouterLink>

            <RouterLink to="/" class="item" :class="{ active: $route.path === '/' }" v-if="user">
                <i class="dashboard icon"></i>
                仪表盘
            </RouterLink>
            <RouterLink to="/" class="item" :class="{ active: $route.path === '/' }" v-else>
                <i class="home icon"></i>
                首页
            </RouterLink>

            <RouterLink to="/help" class="item" :class="{ active: $route.path === '/help' }" v-if="user">
                <i class="question circle icon"></i>
                帮助
            </RouterLink>

            <a
                href="https://github.com/oimasterkafuu/idea"
                class="item mobile-hide"
                target="_blank"
                rel="noopener noreferrer"
            >
                <i class="heart icon"></i>
                开源
            </a>

            <div class="right menu" v-if="user">
                <div class="ui simple dropdown item">
                    {{ user.attributes.username }}
                    <i class="dropdown icon"></i>
                    <div class="menu">
                        <a class="item" @click="logout" id="logout-button">
                            <i class="sign out icon"></i>
                            注销
                        </a>
                    </div>
                </div>
            </div>
            <div class="right item" v-else>
                <div class="ui buttons">
                    <RouterLink to="/login" class="ui button">登录</RouterLink>
                    <div class="or" data-text="或"></div>
                    <RouterLink to="/register" class="ui primary button">注册</RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
body {
    padding-top: 60px;
}

@media (max-width: 723px) {
    .mobile-hide {
        display: none !important;
    }
}
</style>

<style scoped>
div.ui.top.fixed.borderless.menu {
    position: fixed;
    height: 49px;
}

div.logo {
    color: black;
    font-size: 1.5em;
}
</style>

<style>
:root {
    --body-full-height: calc(100vh - 60px);
}
</style>

<script>
export default {
    name: 'Navbar',
    data() {
        return {
            user: AV.User.current()
        };
    },
    methods: {
        logout() {
            AV.User.logOut();
            location.reload();
            this.user = AV.User.current();
        }
    }
};
</script>
