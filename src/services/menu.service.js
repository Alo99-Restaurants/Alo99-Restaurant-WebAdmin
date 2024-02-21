import baseAPI from './axios/api';

export async function getRestaurantMenu() {
  try {
    const response = await baseAPI.get('/api/RestaurantMenu');
    return response;
  } catch (error) {
    console.error('Get RestaurantMenu Service Error', error);
    throw error.message;
  }
}

export async function postRestaurantMenu(payload) {
  try {
    const response = await baseAPI.post('/api/RestaurantMenu', payload);
    return response;
  } catch (error) {
    console.error('Post RestaurantMenu Service Error', error);
    throw error.message;
  }
}

export async function putRestaurantMenu(id, payload) {
  try {
    const response = await baseAPI.put(`/api/RestaurantMenu/${id}`, payload);
    return response;
  } catch (error) {
    console.error('Put RestaurantMenu Service Error', error);
    throw error.message;
  }
}

export async function deleteRestaurantMenu(id) {
  try {
    const response = await baseAPI.delete(`/api/RestaurantMenu/${id}`);
    return response;
  } catch (error) {
    console.error('Delete RestaurantMenu Service Error', error);
    throw error.message;
  }
}
