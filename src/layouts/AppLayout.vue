<script setup lang="ts">

</script>

<template>
  <component :is="$route.meta.layoutComponent">
    <slot/>
  </component>
</template>