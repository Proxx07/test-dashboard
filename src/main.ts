import "@/styles/styles.scss"
import { createApp } from 'vue'
import { createPinia } from "pinia";
import components from "@/components/UI"
import router from '@/router/router.ts'
import {ToastPlugin, ToastPluginOptions} from "@/plugins/toast.ts";

import App from '@/App.vue'


const app = createApp(App);
components.forEach(component => {
  const name = component?.name || component?.__name || ""
  app.component(name, component)
})

app
  .use(ToastPlugin, ToastPluginOptions)
  .use(createPinia())
  .use(router)
  .mount('#app');
