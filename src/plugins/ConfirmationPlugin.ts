import {h, VNode, render, ref, defineComponent} from 'vue'
import PopupModal from "@/components/UI/PopupModal.vue";
import Confirmation from "@/components/forms/Confirmation.vue";
import VButton from "@/components/UI/VButton.vue";
export const $confirmation = (title: string, description?: string): boolean => {
  const isOpened = ref<boolean>(true)

  const ConfirmationComponent = h(
    PopupModal,
    {
      modelValue: isOpened
    },
    () => [
      h(Confirmation, {title, description}, () => [
        h(VButton, {class: 'primary', onClick: () => {isOpened.value = false}}, () => "Да1 " + isOpened.value),
        h(VButton, {class: 'secondary', onClick: () => {isOpened.value = false}}, () => "Нет2")
      ])
    ]
  )

  render(ConfirmationComponent, document.body)

  //const isOpened = ref(false)
  //const gProps = { title, description };
  // const GlobalConfirmation: VNode =  h(
  //   PopupModal,
  //   {
  //     modelValue: true,
  //     /*
  //     onVnodeMounted: () => {
  //       isOpened.value = true
  //     }
  //     */
  //   },
  //   [
  //     h(Confirmation, {...gProps}, [
  //
  //     ])
  //   ],
  // )

  // console.log(GlobalConfirmation)
  // render(GlobalConfirmation, document.body)
  return false
}