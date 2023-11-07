import {ref} from "vue";

export const useBurger = () => {
  const burgerClosed = ref<boolean>(true)

  const toggleBurger = () => {
    burgerClosed.value = !burgerClosed.value
  }

  return {
    burgerClosed,
    toggleBurger
  }
}