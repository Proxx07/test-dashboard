<script setup lang="ts">
/*
  *** Only for plugin!
  *** @/plugins/ConfirmationPlugin.ts
*/

import {onMounted, ref, Transition} from "vue";

const props = defineProps<{
  title: string,
  description?: string,
}>();

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'accept'): void
}>();

const isOpened = ref(false)

const close = () => {
  isOpened.value = false
  emit('close')
}
const accept = () => {
  isOpened.value = false
  emit('accept')
}

onMounted(() => {
  isOpened.value = true
})

</script>

<template>
  <Transition name="fade">
    <div v-if="isOpened" class="popup-modal" :class="{'open': isOpened}" id="popup-form">
      <div class="backdrop"></div>
      <div class="inner">
        <div class="body">
          <div class="confirmation">
            <div class="confirmation__title">
              {{ props.title }}
            </div>

            <div class="confirmation__body" v-if="description">
              {{ description }}
            </div>

            <div class="confirmation__buttons">
              <button class="primary" @click="accept"> Да </button>
              <button class="secondary" @click="close"> Нет </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
@import "@/styles/mixins";
@include popup-modal;

.confirmation {
  font: var(--font-xm);
  display: grid;
  grid-template-columns: 1fr;
  text-align: center;
  gap: 1.6rem;
  max-width: 50rem;
  &__title {
    font-size: 2.4rem;
  }

  &__buttons {
    padding-top: 1.8rem;
    display: flex;
    flex-wrap: wrap;
    gap: 1.4rem;
    button {
      flex-grow: 1;
      background: var(--bg);
      color: var(--cl);
      border: 1px solid var(--bd);
      border-radius: var(--radius-s);
      cursor: pointer;
      padding: .8rem 2rem .7rem;
      font: var(--font-m-m);
      &.primary {
        --bg: var(--accent);
        --cl: var(--primary-color);
        --bd: transparent;
      }

      &.secondary {
        --bg: var(--primary-color);
        --cl: var(--dark-color);
        --bd: transparent;
      }
    }
  }
}
</style>