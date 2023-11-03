import {ref} from "vue";
import {useRouter} from "vue-router";
import {AuthUserInterface} from "@/models/auth/authUser.ts";
import request from "@/api/axios.ts";

export const useAuth = () => {
  const router = useRouter()
  const error = ref<boolean>(false)

  const authUser = ref<AuthUserInterface>({
    phone: '+998',
    password: '',
  });

  const authSubmit = async () => {
    authUser.value.phone = authUser.value.phone.replace(/[^+\d]/g, '').substring(1);
    const res = await request.post('auth/sign-in', {...authUser.value})

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
      localStorage.setItem('token', res.result.access_token)
      await router.push({path: '/'})
    }
  }
  const resetError = () => {
    error.value = false
  }

  const logOut = async () => {
    if (!confirm('Вы уверены, что хотите выйти?')) return
    localStorage.removeItem('token')
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