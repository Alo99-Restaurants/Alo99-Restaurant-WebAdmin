import baseAPI from './axios/api';

export async function getRestaurantService() {
  try {
    const response = await baseAPI.get('/api/Restaurant');
    return response;
  } catch (error) {
    console.error('Get RestaurantService Error', error);
    throw error.message;
  }
}
