import { buildQueryString } from '../helper';
import baseAPI from './axios/api';

export async function getBookingService(payload) {
  try {
    const queryString = buildQueryString(payload);
    const response = await baseAPI.get(`/api/Booking/${queryString}`);
    return response;
  } catch (error) {
    console.error('Get Booking Service Error', error);
    throw error.message;
  }
}

export async function getBookingByIdService(id) {
  try {
    const response = await baseAPI.get(`/api/Booking/${id}`);
    return response;
  } catch (error) {
    console.error('Get Booking By Id Service Error', error);
    throw error.message;
  }
}

export async function updateStatusBookingService(payload) {
  try {
    const response = await baseAPI.post(`/api/Booking/update-status`, payload);
    return response;
  } catch (error) {
    console.error('Update Booking Status Service Error', error);
    throw error.message;
  }
}

export async function getBookingMenuService(payload) {
  try {
    const queryString = buildQueryString(payload);
    const response = await baseAPI.get(`/api/BookingMenu/${queryString}`);
    return response;
  } catch (error) {
    console.error('Get Booking Menu Service Error', error);
    throw error.message;
  }
}
