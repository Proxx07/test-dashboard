import { toast } from 'vue3-toastify';

export const useToast = () => {
  const success = (title: string = "") => toast.success(title)
  const error = (title: string = "") => toast.error(title)

  return {
    success,
    error
  }
}