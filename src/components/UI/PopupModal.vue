<script setup lang="ts">
import {Transition, watch} from "vue";
import closeIcon from "@/assets/icons/close.svg?raw"

const props = defineProps<{
  title?: string,
  modelValue: boolean,
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'close'): void
}>();

const close = () => {
  emit('update:modelValue', false)
  emit('close')
}

const closeHandler = (e: KeyboardEvent) => e.keyCode === 27 && close()

watch(() => props.modelValue, (newValue) => {
  if (newValue) {
    document.addEventListener("keydown", closeHandler)
    document.body.classList.add('overflow')
  }
  else {
    document.removeEventListener('keydown', closeHandler)
    document.body.classList.remove('overflow')
  }
});
</script>

<template>
  <Transition name="fade">
    <div v-if="modelValue" class="popup-modal" :class="{'open': modelValue}" id="popup-form">
      <div class="backdrop" @click="close"></div>

      <div class="inner">
        <div class="body">
          <div class="title" v-if="title">
            {{ title }}
            <v-icon :icon="closeIcon" class="close" @click="close"/>
          </div>

          <div class="form-content">
            <slot/>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.fade-enter-active {
  transition: var(--transition-fast);
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transition: var(--transition-fast);
}

.popup-modal {
  --backdrop-bg: rgba(0, 0, 0, 0.8);
  --content-bg: var(--form-bg);

  position: fixed;
  inset: 0;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;
  z-index: 1000;

  .backdrop {
    position: fixed;
    inset: 0;
    background: var(--backdrop-bg);
  }

  .inner {
    max-height: 100%;
    max-width: 110rem;
    min-width: 40rem;
  }

  .body {
    background: var(--content-bg);
    position: relative;
    padding: 2.4rem;
    border-radius: var(--radius-m);
  }

  .title {
    padding: 1.5rem 4rem 1.5rem 2rem;
    border-radius: var(--radius-m);
    background: var(--bg-10);
    gap: 2rem;
    font: var(--font-m-m);
    margin-bottom: .6rem;
    position: relative;
  }

  .close {
    cursor: pointer;
    width: 4rem;
    height: 4rem;
    right: 0;
    top: 50%;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: translateY(-50%);
    color: var(--primary-color)
  }
}
</style>