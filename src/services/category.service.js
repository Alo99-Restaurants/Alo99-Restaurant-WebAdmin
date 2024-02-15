import baseAPI from './axios/api';

export async function getMenuCategory() {
  try {
    const response = await baseAPI.get('/api/MenuCategory');
    return response;
  } catch (error) {
    console.error('Get MenuCategory Service Error', error);
    throw error.message;
  }
}


export async function postMenuCategory(payload) {
  try {
    const response = await baseAPI.post('/api/MenuCategory', payload);
    return response;
  } catch (error) {
    console.error('Post MenuCategory Service Error', error);
    throw error.message;
  }
}

export async function putMenuCategory(payload) {
  try {
    const response = await baseAPI.put('/api/MenuCategory', payload);
    return response;
  } catch (error) {
    console.error('Put MenuCategory Service Error', error);
    throw error.message;
  }
}

export async function deleteMenuCategory(id) {
  try {
    const response = await baseAPI.delete(`/api/MenuCategory/${id}`);
    return response;
  } catch (error) {
    console.error('Delete MenuCategory Service Error', error);
    throw error.message;
  }
}

