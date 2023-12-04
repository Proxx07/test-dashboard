<script setup lang="ts">
import {useRouter} from "vue-router";
import {useUser} from "@/hooks/useUsers.ts";
import {rolesList} from "@/utils/roles.ts";

const $router = useRouter();
const {user, buttonText, deleteUser, submitForm} = useUser($router.currentRoute.value.params.id as string)
</script>

<template>
<div class="user-form">
  <form @submit.prevent="submitForm">

    <v-input  v-model="user.name" label="Имя" class="test-name" required/>
    <v-input  v-model="user.email" type="email" label="Email" required/>

    <v-input
      v-model="user.phone"
      label="Телефон"
      data-maska="+998(##)-###-##-##"
      pattern=".{18}"
      title="Номер телефона должен состоять из 12 цифр"
      phone
      required
    />

    <v-select v-model="user.role" :options="rolesList" label="Роли" placeholder="Выберите" required/>
    <v-input  v-model="user.password" label="Пароль" type="password" required/>

    <div class="user-form__buttons">
      <v-button class="primary">
        {{buttonText}}
      </v-button>

      <v-button v-if="$router.currentRoute.value.params.id" class="secondary" @click.prevent="deleteUser">
        Удалить
      </v-button>
    </div>
  </form>
</div>
</template>

<style scoped lang="scss">
.user-form {
  display: grid;
  grid-template-columns: 1fr 1fr;

  &__buttons {
    display: flex;
    gap: 2.4rem;
  }
}
form {
  padding: 2.4rem;
  background: var(--WhiteBg);
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
</style>