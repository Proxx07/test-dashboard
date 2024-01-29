import {IFormRule} from "@/hooks/UI/types.ts";
export const useFormRules = () => {
  const password: IFormRule = {
    pattern: '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,}',
    title: 'Пароль должен состоять минимум из 6 символов и содержать заглавную, строчную буквы и цифру',
    required: true
  }

  const phone: IFormRule = {
    pattern: '.{18}',
    title: 'Номер телефона должен состоять из 12 цифр',
    required: true
  }

  const email: IFormRule = {
    pattern: '[^@\\s]+@[^@\\s]+\\.[^@\\s]+',
    title: 'Например: test@email.com',
    required: true
  }

  return {
    password,
    phone,
    email
  }
}