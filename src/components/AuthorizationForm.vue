<script setup lang="ts">
import {useAuth} from "@/hooks/useAuth.ts";
import CopyrightForDev from "@/components/CopyrightForDev.vue";
import VInput from "@/components/UI/VInput.vue";

const {error, authUser, authSubmit, resetError} = useAuth()
</script>

<template>
  <form class="auth-form" @submit.prevent="authSubmit">
    <div class="auth-form__fields">
      <!--
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
        -->

      <v-input
        v-model="authUser.email"
        type="email"
        label="Почта"
        placeholder="test@example.com"
        :class="['auth-form__email', error && 'error']"
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
</template>

<style lang="scss" scoped>
.auth-form {
  width: 100%;
  text-align: center;
  padding: 2.4rem;
  border-radius: var(--radius-m);
  background: var(--form-bg);

  &__fields {
    display: flex;
    flex-direction: column;
    gap: 2.4rem
  }
}
</style>