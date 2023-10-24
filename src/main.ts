import { createApp } from 'vue'
import App from '@/App.vue'

import router from '@/router/router.ts'
import components from "@/components/UI"

import "@/styles/styles.scss"

const app = createApp(App);
components.forEach(component => {
  const name = component?.name || component?.__name || ""
  app.component(name, component)
})

app
  .use(router)
  .mount('#app');