<script setup lang="ts">
import {onBeforeUnmount, onMounted, Transition} from "vue";
import closeIcon from "@/assets/icons/close.svg?raw"

const props = defineProps<{
  title: string,
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'close'): void
}>()

const close = () => {
  emit('update:modelValue', false)
  emit('close')
}

onMounted(() => {
  document.addEventListener("keydown", e => e.keyCode === 27 && close())
});
onBeforeUnmount(() => {
  document.removeEventListener('keydown', close)
})
</script>

<template>
  <Transition name="fade">
    <div v-if="modelValue" class="popup-modal" :class="{'open': modelValue}" id="popup-form">
      <div class="backdrop" @click="close"></div>

      <div class="inner">
        <div class="body">
          <div class="title">
            {{ props.title }}
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
  transition: var(--transition-slow);
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transition: var(--transition-slow);
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
    padding: 1.5rem 2rem;
    border-radius: var(--radius-m);
    background: var(--bg-10);
    display: flex;
    align-items: center;
    gap: 2rem;
    font: var(--font-m-m);
    margin-bottom: .6rem;
  }

  .close {
    cursor: pointer;
    width: 2rem;
    height: 2rem;
    margin-left: auto;
    color: var(--primary-color)
  }
}
</style>