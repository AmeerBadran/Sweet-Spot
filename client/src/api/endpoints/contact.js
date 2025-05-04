import axiosInstance from "../axios";
import { store } from "../../app/store";

export const sendContactForm = (contactData) => {
  const state = store.getState();
  const id = state.authData.userData._id;
  return axiosInstance.post(`/contact/${id}`, contactData);
}