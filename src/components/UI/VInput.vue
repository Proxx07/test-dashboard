<script setup lang="ts">
import {vMaska} from "maska";

const props = defineProps<{
  modelValue: string,
  phone?: boolean,
  label?: string,
  placeholder?: string,
  type?: "text" | "password" | "email",
}>()

const emit = defineEmits(["update:modelValue", 'focus'])
//pattern="[0-9]+" only digits
</script>

<template>
  <label>
    <span v-if="props.label" class="label-text">
      {{props.label}}
      <span class="required-mark" v-if="$attrs.hasOwnProperty('required')"> *</span>
    </span>

    <input
      v-if="props.phone"
      v-maska
      type="text"
      :value="modelValue"
      :class="['text-field', 'phone-field']"
      :placeholder="props.placeholder || props.label"
      v-bind="$attrs"

      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      @focus="emit('focus')"
    />

    <input
      v-else
      :type="props.type || 'text'"
      :class="['text-field']"
      :value="modelValue"
      :placeholder="props.placeholder || props.label"
      :pattern="props.type === 'email' ? '[^@\\s]+@[^@\\s]+\\.[^@\\s]+' : undefined"
      :title="props.type === 'email' ? 'Например: test@email.com' : undefined"
      v-bind="$attrs"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      @focus="emit('focus')"
    />
  </label>
</template>

<style lang="scss" scoped>
label, .label-text {
  display: block;
  text-align: left;
}

label {
  font: var(--font-xm);
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.label-text {
  cursor: pointer;
  .required-mark {
    color: var(--errorSolid);
  }
}

.text-field {
  width: 100%;
  font-size: inherit;
  outline: none;
  padding: .6rem 1.6rem;
  background: var(--bg-5);
  flex-grow: 1;
  min-height: 4.4rem;
  transition: var(--transition-slow);
  &::placeholder {
    transition: var(--transition-fast);
    color: var(--secondary-color);
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
  background-color: var(--error-transparent);
}
</style>