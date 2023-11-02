<script setup lang="ts">
const props = defineProps<{
  label?: string,
  placeholder?: string,
  type?: "text" | "password",
  class?: string
  modelValue: string,
}>()

const emit = defineEmits(["update:modelValue", 'focus'])
</script>

<template>
  <label>
    <span v-if="props.label" class="label-text">{{props.label}}</span>
    <input
      :type="props.type || 'text'"
      :class="'text-field ' + props.class"
      :value="modelValue"
      :placeholder="props.placeholder || props.label"
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

.label-text {
  font-size: 1.4rem;
  font-weight: 600;
  line-height: 2.15;
  cursor: pointer;
}

.text-field {
  width: 100%;
  font-size: 1.4rem;
  outline: none;
  padding: .6rem 1.6rem;
  line-height: 2.15;
  transition: all 0.3s;
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

  &.error {
    border-color: #ff5555;
    background-color: #f2d6d6;
  }
}
</style>