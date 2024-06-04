import { request } from "../utils/request";
import { ACTION_TYPE } from "./action-type";

export const logoutAction = () => {
  request("/logout", "POST");

  return {
    type: ACTION_TYPE.LOGOUT,
  };
};
