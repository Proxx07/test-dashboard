<script setup lang="ts">
interface selectOption {
  name: string,
  value: any
}

const emit = defineEmits<{
  (e: 'change', item: any): void
  (e: 'update:modelValue', item: any): void
}>()

const props = defineProps<{
  modelValue: number | null,
  options: selectOption[],
  label: string,
  placeholder?: string
}>()

const changeHandler = (e: Event) => {
  const $val = (e.target as HTMLSelectElement).value
  const value = isNaN(Number($val)) ? $val : +$val

  emit('update:modelValue', value)
  emit('change', value)
}
</script>

<template>
 <label>
   <span class="label-text">
     {{props.label}}
     <span class="required-mark" v-if="$attrs.hasOwnProperty('required')"> *</span>
   </span>
   <select class="select-field" @change="changeHandler" v-bind="$attrs">
    <option value="" :selected="!modelValue" hidden disabled>
      {{placeholder ? placeholder : label}}
    </option>

     <option
       v-for="option in options"
       :selected="modelValue === option.value"
       :value="option.value"
       :key="option.value"
     >
       {{option.name}}
     </option>
   </select>
 </label>
</template>

<style scoped lang="scss">
label, .label-text {
  display: block;
  text-align: left;
}

label {
  --errorSolid: #ff5555;
  --errorTransparent: #f2d6d6;

  font-size: 1.4rem;
  line-height: 2.15;
  display: flex;
  flex-direction: column;
}

.label-text {
  font-weight: 600;
  cursor: pointer;
  .required-mark {
    color: var(--errorSolid);
  }
}

.select-field {
  width: 100%;
  font-size: inherit;
  outline: none;
  padding: .6rem 1.6rem;
  transition: all 0.3s;
  background: var(--WhiteBg);
  flex-grow: 1;
  min-height: 4.4rem;
}

label.error .select-field {
  border-color: var(--errorSolid);
  background-color: var(--errorTransparent);
}
</style>