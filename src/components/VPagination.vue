<script setup lang="ts">
import {useRouter} from "vue-router";
const router = useRouter()
const props = defineProps<{
  totalPages: string | number
  currentPage: string | number
}>()

</script>

<template>
  <div class="pagination">
    <button v-for="page in +totalPages" @click="router.push({query: {page}})">
      {{page}}
    </button>
  </div>
</template>

<style scoped>

</style>