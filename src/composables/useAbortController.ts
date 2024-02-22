import {onBeforeUnmount} from "vue";

export const useAbortController = () => {
  const controller: AbortController = new AbortController();
  const signal: AbortSignal = controller.signal;

  onBeforeUnmount(() => {
    controller.abort()
  });

  return {
    signal
  }
}