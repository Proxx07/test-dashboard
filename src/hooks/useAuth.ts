import {ref} from "vue";
import {AuthUserInterface} from "@/models/auth/authUser.ts";

export const useAuth = () => {
  const error = ref<boolean>(false)

  const authUser = ref<AuthUserInterface>({
    phone: '',
    password: '',
  });
  const authSubmit = () => {
    console.log({...authUser.value})
  }

  return {
    error,
    authUser,
    authSubmit
  }
}