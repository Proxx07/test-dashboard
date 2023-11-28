<script setup lang="ts">
import Header from "@/components/Header.vue";
import UserForm from "@/components/forms/UserForm.vue";
import {useRouter} from "vue-router";
const routeID = useRouter().currentRoute.value.params.id;

const pageTitle = !routeID ? "Создание пользователя" : "Редактирование пользователя";

</script>

<template>
  <Header :title="pageTitle"/>

  <main>
    <user-form/>
  </main>
</template>

<style scoped lang="scss">

</style>