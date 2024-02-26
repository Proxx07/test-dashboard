<script setup lang="ts">
import UserForm from "@/components/forms/UserForm.vue";
import PageTopPart from "@/components/PageTopPart.vue";
import {useRouter} from "vue-router";

const $router = useRouter()
const pageHeading = $router.currentRoute.value.params.id ? 'Редактирование пользователя' : 'Создание пользователя'
</script>

<template>
  <page-top-part
    :heading="pageHeading"
  />
  <main>
    <user-form/>
  </main>
</template>

<style scoped lang="scss">

</style>