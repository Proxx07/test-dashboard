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
            <v-icon v-if="title" :icon="closeIcon" class="close" @click="close"/>
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
@import "@/styles/mixins";
@include popup-modal;
.title {
  padding: 1.5rem 4rem 1.5rem 2rem;
  border-radius: var(--radius-m);
  background: var(--bg-10);
  gap: 2rem;
  font: var(--font-m-m);
  margin-bottom: .6rem;
  position: relative;
}
</style>