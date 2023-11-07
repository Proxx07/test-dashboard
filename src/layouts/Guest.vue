<script setup lang="ts">
import {onBeforeMount} from "vue";
import {useAuth} from "@/hooks/useAuth.ts";
const {checkUser} = useAuth()

onBeforeMount(() => {
  checkUser()
})

</script>

<template>
  <div class="empty-layout">
    <slot/>
  </div>
</template>

<style scoped></style>