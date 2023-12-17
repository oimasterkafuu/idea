localStorage.setItem('debug', 'leancloud*');

AV.init({
    appId: 'orAFg3hqp3hz0MOjhfHtQs9M-gzGzoHsz',
    appKey: '9KzEco68uRkj2uz3XYS7OwfO',
    serverURL: 'https://orafg3hq.lc-cn-n1-shared.com'
});

import { createApp } from 'vue';

import App from './app.vue';
import router from './router';

const app = createApp(App);

app.use(router);

app.mount('#app');
