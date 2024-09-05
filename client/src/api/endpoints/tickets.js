import axiosInstance from "../axios";

export const getCountTickets = () => {
  return axiosInstance.get(`/tickets/count`);
}