import {IMockProject} from "@/models/interfaces/projectsIntefaces.ts";
interface IProjectDetails {
  name: string,
  value: keyof IMockProject
}
export const projectDetails: IProjectDetails[] = [
  {
    name: "Сайт",
    value: "site"
  },
  {
    name: "Почта",
    value: "mail"
  },
  {
    name: "Номер телефона",
    value: "phone"
  },
]