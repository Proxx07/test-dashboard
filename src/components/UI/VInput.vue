<script setup lang="ts">
import {vMaska} from "maska";

const props = defineProps<{
  phone?: boolean,
  label?: string,
  placeholder?: string,
  type?: "text" | "password",
  class?: string
  modelValue: string,
}>()

const emit = defineEmits(["update:modelValue", 'focus'])
</script>

<template>
  <label :class="`${props.class}`">
    <span v-if="props.label" class="label-text">{{props.label}}</span>
    <input
      v-if="props.phone"
      v-maska
      data-maska="+998(##)-###-##-##"
      type="text"
      :class="'text-field'"
      :value="modelValue"
      :placeholder="props.placeholder || props.label"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      @focus="emit('focus')"
    />

    <input
      v-else
      :type="props.type || 'text'"
      :class="'text-field'"
      :value="modelValue"
      :placeholder="props.placeholder || props.label"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      @focus="emit('focus')"
    />
  </label>
</template>

<style lang="scss" scoped>
label {
  font-size: 1.4rem;
  line-height: 2.15;
}
label, .label-text {
  display: block;
  text-align: left;
}

.label-text {
  font-weight: 600;
  cursor: pointer;
}

.text-field {
  width: 100%;
  font-size: inherit;
  outline: none;
  padding: .6rem 1.6rem;
  transition: all 0.3s;
  background: var(--WhiteBg);
  height: 100%;
  &::placeholder {
    font-weight: 400;
    transition: all 0.3s;
    color: var(--TextColorGray);
  }
  &:focus {
    &::placeholder {
      opacity: 0;
    }
  }
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &[type=number] {
    -moz-appearance: textfield;
  }
}


label.error .text-field {
  border-color: #ff5555;
  background-color: #f2d6d6;
}
</style>