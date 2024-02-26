import { toast } from 'vue3-toastify';

export const useToast = () => {
  const success = (title: string = "") => toast.success(title)

  const error = (title: string = "") => toast.error(title)

  const warning = (title: string = "") => toast.warning(title)

  return {
    warning,
    success,
    error,
  }
}