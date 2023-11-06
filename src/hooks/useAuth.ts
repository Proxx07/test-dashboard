import {ref} from "vue";
import {useRouter} from "vue-router";
import {AxiosError} from "axios";
import {AuthorizedUser, AuthUserInterface} from "@/models/auth/authUser.ts";
import request from "@/api/axios.ts";
import {AUTH_TOKEN_NAME} from "@/models/staticContent/constants.ts";
import {IResponse} from "@/models/interfaces/tableInterfaces.ts";

export const useAuth = () => {
  const router = useRouter()
  const error = ref<boolean>(false)

  const authUser = ref<AuthUserInterface>({
    phone: '+998',
    password: '',
  });

  const authSubmit = async () => {
    authUser.value.phone = authUser.value.phone.replace(/[^+\d]/g, '').substring(1);
    const res = await request.post<IResponse<AuthorizedUser | AxiosError>>('auth/sign-in', {...authUser.value})

    if (res.statusCode !== 200) {
      switch (res.response.status) {
        case 500:
        case 401:
          alert('Некорректный номер или пароль')
        break
        case 400:
          alert(res.response.data.message.join('\n'))
        break
      }

      error.value = true
    } else {

      alert(res.message)
      localStorage.setItem(AUTH_TOKEN_NAME, res.result.access_token)
      await router.push({path: '/'})
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

  return {
    error,
    authUser,
    authSubmit,
    resetError,
    logOut
  }
}