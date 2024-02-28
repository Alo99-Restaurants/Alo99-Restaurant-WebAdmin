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
