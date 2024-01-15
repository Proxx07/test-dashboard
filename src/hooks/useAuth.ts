import $axios from "@/api/axios.ts";

import {AxiosError} from "axios";
import {AuthorizedUser, AuthUserInterface} from "@/models/auth/authUser.ts";
import {IResponse} from "@/models/interfaces/tableInterfaces.ts";
import {AUTH_TOKEN_NAME, USER_ROLE} from "@/models/staticContent/constants.ts";

import {ref} from "vue";

import {useRouter} from "vue-router";
import {useToast} from "@/hooks/useToast.ts";

const $toast = useToast()
export const useAuth = () => {
  const $router = useRouter();

  const error = ref<boolean>(false)
  const authUser = ref<AuthUserInterface>({
    phone: '+998',
    password: '',
  });

  const authSubmit = async () => {
    authUser.value.phone = authUser.value.phone.replace(/[^+\d]/g, '').substring(1);
    try {
      const { data: {result} } = await $axios.post<IResponse<AuthorizedUser>>('auth/sign-in', authUser.value)

      localStorage.setItem(AUTH_TOKEN_NAME, result.access_token)
      localStorage.setItem(USER_ROLE, `${result.role}`)

      await $router.push({path: '/'})
      $toast.success(`Вы успешно авторизоавлись`)
    }
    catch (e) {
      const err = e as AxiosError<{message: string[]}>
      if (err.response?.status !== 400) {
        $toast.error('Некорректный номер или пароль')
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

    if (!confirm('Вы уверены, что хотите выйти?')) return
    localStorage.removeItem(AUTH_TOKEN_NAME)
    localStorage.removeItem(USER_ROLE)
    await $router.push('/auth')
  }

  return {
    error,
    authUser,
    authSubmit,
    resetError,
    logOut
  }
}