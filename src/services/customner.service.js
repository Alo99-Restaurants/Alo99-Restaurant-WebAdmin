import baseAPI from './axios/api';

export async function getCustomerInfoService(id) {
  try {
    const response = await baseAPI.get(`/api/Customer/${id}`);
    return response;
  } catch (error) {
    console.error('Get Customer Info Service Error', error);
    throw error.message;
  }
}
