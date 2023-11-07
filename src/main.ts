import "@/styles/styles.scss"
import { createApp } from 'vue'
import components from "@/components/UI"
import router from '@/router/router.ts'
import Vue3Toasity, {toast, type ToastContainerOptions} from 'vue3-toastify';


import App from '@/App.vue'


const app = createApp(App);
components.forEach(component => {
  const name = component?.name || component?.__name || ""
  app.component(name, component)
})

app
  .use(Vue3Toasity, {
    autoClose: 5000,
    position: toast.POSITION.TOP_RIGHT
  } as ToastContainerOptions)
  .use(router)
  .mount('#app');
