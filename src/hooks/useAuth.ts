import {ref} from "vue";
import {useRouter} from "vue-router";
import {AuthUserInterface} from "@/models/auth/authUser.ts";
import request from "@/api/axios.ts";

export const useAuth = () => {
  const router = useRouter()
  const error = ref<boolean>(false)
  const authUser = ref<AuthUserInterface>({
    phone: '',
    password: '',
  });

  const authSubmit = async () => {
    const res = await request.post('auth/sign-in', {...authUser.value})
    if (!res.statusCode) {
      error.value = true
      return
    }

    alert(res.message)
    localStorage.setItem('token', res.result.access_token)
    await router.push({path: '/'})
  }
  const resetError = () => {
    error.value = false
  }

  return {
    error,
    authUser,
    authSubmit,
    resetError
  }
}