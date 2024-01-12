import {DirectiveBinding} from "@vue/runtime-core";

export const VIntersection = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const callback = (entries: IntersectionObserverEntry[]) => {
      if (!entries[0].isIntersecting) return
      binding.value()
    }

    new IntersectionObserver(callback, {}).observe(el)
  }
}