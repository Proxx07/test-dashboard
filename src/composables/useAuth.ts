import $axios from "@/api/axios.ts";

import {AxiosError} from "axios";
import {AuthorizedUser, AuthUserInterface} from "@/models/auth/authUser.ts";
import {IResponse} from "@/models/interfaces/tableInterfaces.ts";
import {AUTH_TOKEN_NAME, USER_ROLE} from "@/models/staticContent/constants.ts";
import {Cookies} from "@/plugins/cookies.ts";

import {ref} from "vue";
import {$confirm} from "@/plugins/ConfirmationPlugin.ts";

import {useRouter} from "vue-router";
import {useToast} from "@/composables/useToast.ts";

export const useAuth = () => {
  const $router = useRouter();
  const $toast = useToast();

  const error = ref<boolean>(false);
  const authUser = ref<AuthUserInterface>({
    email: '',
    password: '',
  });

  const authSubmit = async () => {
    try {
      const { data: {result} } = await $axios.post<IResponse<AuthorizedUser>>('auth/sign-in', authUser.value)

      Cookies.set(AUTH_TOKEN_NAME, `${result.access_token}`, 24)
      localStorage.setItem(USER_ROLE, `${result.role}`)

      await $router.push({path: '/'})
      $toast.success(`Вы успешно авторизоавлись`)
    }
    catch (e) {
      const err = e as AxiosError<{message: string[]}>
      if (err.response?.status !== 400) {
        $toast.error('Некорректный логин или пароль')
      } else {
        $toast.error(err.response.data.message.join('\n'))
      }
      error.value = true
    }
  }

  const resetError = () => {
    error.value = false
  }

  const logOut = async () => {
    const ok = await $confirm('Выйти', 'Вы точно хотите выйти?');
    if (!ok) return
    Cookies.remove(AUTH_TOKEN_NAME)
    localStorage.removeItem(USER_ROLE)
    await $router.push('/auth')
    window.location.reload()
  }

  return {
    error,
    authUser,

    authSubmit,
    resetError,
    logOut,
  }
}