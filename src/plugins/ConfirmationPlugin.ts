import {h, render, VNode} from 'vue';
import ConfirmationModal from "@/components/ConfirmationModal.vue";
export const $confirm = (title: string, description?: string): Promise<boolean> | boolean => {
  let ConfirmComponent: VNode | null = null
  const keyboardHandler = (e: KeyboardEvent) => e.preventDefault();
  const wrapper = document.querySelector('#confirmations-wrapper');
  if (!wrapper) return false;

  const confirmPromise =  new Promise<boolean>((resolve) => {
    ConfirmComponent = h(
      ConfirmationModal,
      {
        title,
        description,
        onClose: () => resolve(false),
        onAccept: () => resolve(true),
      }
    )

    document.body.addEventListener('keydown', keyboardHandler);
    document.body.classList.add('overflow');
    render(ConfirmComponent, wrapper);
  });

  confirmPromise.finally(() => {
    document.body.removeEventListener('keydown', keyboardHandler);
    document.body.classList.remove('overflow');

    setTimeout(() => {
      ConfirmComponent?.el?.remove();
      ConfirmComponent = null;
      render(ConfirmComponent, wrapper);
    }, 400)
  });

  return confirmPromise;
}