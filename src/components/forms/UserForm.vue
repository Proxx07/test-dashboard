<script setup lang="ts">
import {useRouter} from "vue-router";
import {useUser} from "@/hooks/useUsers.ts";
const $router = useRouter();

const {user} = useUser($router.currentRoute.value.params.id)
</script>

<template>
<div>
  {{$router.currentRoute.value.params.id}} <br>
  Форма пользователя

  {{user}}

</div>
</template>

<style scoped lang="scss">

</style>