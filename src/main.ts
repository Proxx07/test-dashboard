import { createApp } from 'vue'
import router from '@/router/router.ts'
import App from '@/App.vue'
import "@/styles/styles.scss"

const app = createApp(App);

app
  .use(router)
  .mount('#app');