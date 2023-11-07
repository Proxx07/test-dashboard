import {ref} from "vue";
import {useRouter} from "vue-router";
import {AxiosError} from "axios";
import {AuthorizedUser, AuthUserInterface} from "@/models/auth/authUser.ts";
import request from "@/api/axios.ts";
import {AUTH_TOKEN_NAME} from "@/models/staticContent/constants.ts";
import {IResponse} from "@/models/interfaces/tableInterfaces.ts";
import {useToast} from "@/hooks/useToast.ts";

export const useAuth = () => {
  const router = useRouter()
  const error = ref<boolean>(false)
  const authUser = ref<AuthUserInterface>({
    phone: '+998',
    password: '',
  });

  const $toast = useToast()

  const authSubmit = async () => {
    authUser.value.phone = authUser.value.phone.replace(/[^+\d]/g, '').substring(1);
    const res = await request.post<IResponse<AuthorizedUser | AxiosError>>('auth/sign-in', {...authUser.value})

    if (res.statusCode !== 200) {
      switch (res.response.status) {
        case 500:
        case 401:
          $toast.error('Некорректный номер или пароль')
        break
        case 400:
          $toast.error(res.response.data.message.join('\n'))
        break
      }

      error.value = true
    } else {
      localStorage.setItem(AUTH_TOKEN_NAME, res.result.access_token)
      await router.push({path: '/'})
      $toast.success(`Вы ${res.message.toLowerCase()} авторизоавлись`)
    }
  }
  const resetError = () => {
    error.value = false
  }
  const logOut = () => {
    if (!confirm('Вы уверены, что хотите выйти?')) return
    localStorage.removeItem(AUTH_TOKEN_NAME)
    router.push('/auth')
  }

  const checkUser = () => {
    // ToDo user checking
    if (router.currentRoute.value.name !== 'auth') return
    console.log('User checking ...')
  }

  return {
    error,
    authUser,
    authSubmit,
    resetError,
    checkUser,
    logOut
  }
}