import { store } from "../../app/store";
import axiosInstance from "../axios";

export const getCountTickets = (filter) => {
  return axiosInstance.get(`/tickets/count/${filter}`);
}

export const getCountUserTickets = (filter, userId) => {
  return axiosInstance.get(`/tickets/count/${filter}/${userId}`);
}

export const scanTicket = (qrId) => {
  return axiosInstance.post(`/tickets/scan`, { qrId });
}

export const createTicket = (ticketData) => {
  const state = store.getState();
  const id = state.authData.userData.id;
  return axiosInstance.post(`/tickets/createTicket/${id}`, { ticketData });
}

export const getTicketsByUserId = (userId, page, filter) => {
  return axiosInstance.get(`/tickets/userTickets/${userId}/${page}/${filter}`);
};


export const getAllTickets = ({ search = '', page = 1, limit = 6, paidFilter = '', statusFilter = '' }) => {
  return axiosInstance.get(`/tickets/ticketsFilter?search=${search}&page=${page}&limit=${limit}&paid=${paidFilter}&status=${statusFilter}`);
};
export const getCountTicketsforFilter = (filter = 'all') => {
  return axiosInstance.get(`/tickets/countFilter?filter=${filter}`);
}

export const markTicketAsPaid = (qrId) => {
  return axiosInstance.patch(`/tickets/markTicketAsPaid`, { qrId });
}