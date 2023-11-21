export const AUTH_TOKEN_NAME = "token";
export const USER_ID_KEY = "user_id";

const roles = {
  main: 0,
  admin: 1,
  moderator: 2,
  operator: 3,
};
console.log(roles)

export const facilities = {
  CAN_READ_USER: "can-read-user",
  CAN_CREATE_USER: "can-create-user",
  CAN_UPDATE_USER: "can-update-user",
  CAN_DELETE_USER: "can-delete-user",
}