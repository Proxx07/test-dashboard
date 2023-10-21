<script setup lang="ts">
import {ref} from "vue";
import {AuthUserInterface} from "@/models/auth/authUser.ts";
import Button from "@/components/UI/Button.vue";

const authUser = ref<AuthUserInterface>({
  email: '',
  password: ''
})
const authSubmit = () => {
  console.log('submit')
}

const clickHandle = () => {
  console.log(authUser.value)
}
</script>

<template>
  <form class="auth-form" @submit.prevent="authSubmit">
    <h1> Авторизация </h1>

    <label>
      <input type="text" class="auth-form__email" v-model="authUser.email">
    </label>

    <label>
      <input type="password" class="auth-form__password" v-model="authUser.password">
    </label>

    <Button class="auth-form__button" @click="clickHandle">
      Кнопка
    </Button>

  </form>
</template>

<style scoped>
.auth-form {
  width: 100%;
  max-width: 400px;
  text-align: center;
  background: var(--WhiteBg);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}
</style>