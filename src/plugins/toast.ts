import Vue3Toasity, {toast, type ToastContainerOptions} from 'vue3-toastify';

export const ToastPlugin = Vue3Toasity;
export const ToastPluginOptions = {
  theme: "dark",
  autoClose: 3000,
  position: toast.POSITION.TOP_RIGHT
} as ToastContainerOptions
