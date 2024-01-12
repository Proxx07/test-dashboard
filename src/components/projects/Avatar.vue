<script setup lang="ts">
import {IAvatar} from "@/models/interfaces/projectsIntefaces.ts";
const props = defineProps<IAvatar>();

</script>

<template>
  <div class="avatar">
    <div class="logo">
      <img v-if="props.logo" :src="logo" :alt="name">
      <span v-else> Logo </span>
    </div>

    <div class="details">
      <div class="name"> {{name}} </div>
      <div class="status" :class="{'active': status}">
        {{status ? "Активный" : "Отключен"}}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.avatar {
  display: flex;
  gap: 1.6rem;
  .logo {
    min-width: 5.8rem;
    min-height: 5.8rem;
    border: 1px solid var(--secondary-color);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0;
    span {
      font: var(--font-s);
      text-transform: uppercase;
      line-height: 1;
      font-size: .8rem;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .details {
    flex-grow: 1;
  }

  .name {
    font: var(--font-xm);
    padding-bottom: .6rem;
  }

  .status {
    --status-color: var(--negative);
    display: inline-block;
    padding: .4rem .8rem;
    border-radius: 10rem;
    position: relative;
    overflow: hidden;
    font: var(--font-xs-m);
    color: var(--status-color);
    &.active {
      --status-color: var(--positive);
    }

    &:before {
      content: '';
      position: absolute;
      inset: 0;
      opacity: 0.1;
      pointer-events: none;
      background: var(--status-color);
    }
  }
}
</style>