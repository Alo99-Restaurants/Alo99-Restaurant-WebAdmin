import baseAPI from './axios/api';

export async function getUsers() {
  try {
    const response = await baseAPI.get(`/api/User?TotalRows=500`);
    return response;
  } catch (error) {
    console.error('Get Users Service Error', error);
    throw error.message;
  }
}