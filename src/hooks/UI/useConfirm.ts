import {ref} from "vue";

export const useConfirm = () => {
  const confirmOpened = ref<boolean>(false);

  const openConfirm = () => {
    confirmOpened.value = true
  }
  const closeConfirm = () => {
    confirmOpened.value = false
  }
  return {
    confirmOpened,
    openConfirm,
    closeConfirm,
  }
}