import {ref} from "vue";

export const useBurger = () => {
  const burger = ref<boolean>(false)

  const toggleBurger = () => {
    burger.value = !burger.value
  }

  return {
    burger,
    toggleBurger
  }
}