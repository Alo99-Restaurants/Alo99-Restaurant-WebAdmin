import baseAPI from './axios/api';

export async function loginService(data) {
  const response = await baseAPI.post('/api/User/login', data);
  return response;
}
