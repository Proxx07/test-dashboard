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
  modelValue?: any,
  options: selectOption[],
  label?: string,
  placeholder?: string,

  loading?: boolean
}>()

const changeHandler = (e: Event) => {
  const $val = (e.target as HTMLSelectElement).value
  const value = isNaN(Number($val)) ? $val : +$val
  if (props.modelValue !== undefined) {
    emit('update:modelValue', value)
  }
  emit('change', value)
}
</script>

<template>
 <label>
   <span class="label-text" v-if="props.label">
     {{label}}
     <span class="required-mark" v-if="$attrs.hasOwnProperty('required')"> *</span>
   </span>
   <select v-bind="$attrs" class="select-field" @change="changeHandler" :disabled="loading">
    <option v-if="placeholder || label" :selected="!modelValue" hidden disabled value="">
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
   <span v-if="loading" class="loader">
     <v-preloader size="small"/>
   </span>
 </label>
</template>

<style scoped lang="scss">
label, .label-text {
  display: block;
  text-align: left;
}
label {
  display: flex;
  flex-direction: column;
  position: relative;
  font: var(--font-xm);
}

.label-text {
  cursor: pointer;
  .required-mark {
    color: var(--error-solid);
  }
}

.select-field {
  width: 100%;
  outline: none;
  padding: 1.3rem 1.8rem;
  flex-grow: 1;
  background-color: var(--bg-5);
  background-image: url('@/assets/icons/select-arrow.svg');
  background-position: right .5rem center;
  background-repeat: no-repeat;
  -webkit-appearance: none;
  option {
    background: #282931;
  }
  &[disabled] {
    background-image: none;
  }
}

.loader {
  position: absolute;
  background: rgb(40 41 49);
  width: 2rem;
  height: 2rem;
  padding: 1rem;
  right: .5rem;
  top: calc(50% - 1rem);
}
</style>