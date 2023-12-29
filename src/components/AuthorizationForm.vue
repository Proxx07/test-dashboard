<script setup lang="ts">
import {useAuth} from "@/hooks/useAuth.ts";

const {error, authUser, authSubmit, resetError} = useAuth()
</script>

<template>
  <form class="auth-form" @submit.prevent="authSubmit">
    <h1> Face ID </h1>

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

      <div class="copyright">
        OOO "THE ABLE TECHNOLOGIES" <br>
        ABLE ID ver 1.0 <br>
        Республика Узбекистан
      </div>

      <v-button type="submit" class="auth-form__button transparent"> Вход </v-button>
    </div>
  </form>
</template>

<style lang="scss" scoped>
h1 {
  font-size: 2.8rem;
  color: var(--VioletText);
  margin-bottom: 2.4rem;
}

.auth-form {
  width: 100%;
  max-width: 40rem;
  text-align: center;

  &__fields {
    display: flex;
    flex-direction: column;
    background: var(--WhiteBg);
    padding: 2.4rem;
    border-radius: .4rem;
    gap: 2.4rem
  }

  &__button {
    padding: 1rem;
    font-size: 1.5rem;
    //margin-top: 2.6rem;
  }
}

.copyright {
  padding: 1rem;
  text-align: left;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 1.2rem;
}
</style>