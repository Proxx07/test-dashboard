<script setup lang="ts">
import logo from "@/assets/icons/logo-with-text.svg?raw";

import {useAuth} from "@/hooks/useAuth.ts";
import CopyrightForDev from "@/components/CopyrightForDev.vue";
import VIcon from "@/components/UI/VIcon.vue";
const {error, authUser, authSubmit, resetError} = useAuth()
</script>

<template>
  <div class="form-wrapper">

    <v-icon :icon="logo"/>

    <form class="auth-form" @submit.prevent="authSubmit">
      <div class="auth-form__fields">
        <v-input
          v-model="authUser.phone"
          phone
          label="Номер телефона"
          data-maska="+998(##)-###-##-##"
          pattern=".{18}"
          title="Номер телефона должен состоять из 12 цифр"
          :class="['auth-form__name', error && 'error']"
          @focus="resetError"
        />

        <v-input
          v-model="authUser.password"
          type="password"
          label="Пароль"
          :class="['auth-form__password', error && 'error']"
          @focus="resetError"
        />

        <copyright-for-dev/>

        <v-button type="submit" class="primary large"> Вход </v-button>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.form-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3.2rem;
}
.auth-form {
  width: 100%;
  max-width: 43rem;
  text-align: center;
  &__fields {
    display: flex;
    flex-direction: column;
    background: var(--form-bg);
    padding: 2.4rem;
    border-radius: var(--radius-s);
    gap: 2.4rem
  }
}
</style>