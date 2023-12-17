import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => {
            if (!AV.User.current()) {
                return import('../views/HelloWorld.vue');
            } else {
                return import('../views/Dashboard.vue');
            }
        }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login.vue')
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('../views/Register.vue')
    },
    {
        path: '/help',
        name: 'help',
        component: () => import('../views/Help.vue')
    },
    {
        path: '/create',
        name: 'create',
        component: () => import('../views/Create.vue')
    },
    {
        path: '/edit/:id',
        name: 'edit',
        component: () => import('../views/Edit.vue')
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;
