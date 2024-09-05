import axiosInstance from "../axios";

export const createEvent = (formData) => {
  return axiosInstance.post(`/events`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getAllEvents = (page) => {
  return axiosInstance.get(`/events/all/${page}`);
}

export const getCountEvents = () => {
  return axiosInstance.get('/events/count');
}

export const getEventById = (eventId) => {
  return axiosInstance.get(`/events/${eventId}`);
}

export const updateEvent = (eventId, newData) => {
  return axiosInstance.put(`/events/update/${eventId}`, newData);
}

export const deleteEvent = (eventId) => {
  return axiosInstance.delete(`/events/delete/${eventId}`);
}