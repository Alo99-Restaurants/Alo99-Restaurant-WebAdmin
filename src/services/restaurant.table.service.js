import baseAPI from './axios/api';

// Floor tables
export async function getFloorTablesService(id_floor) {
  try {
    const response = await baseAPI.get(`/api/Table?RestaurantFloorId=${id_floor}`);
    return response;
  } catch (error) {
    console.error('Get Floor Tables Service Error', error);
    throw error.message;
  }
}

export async function postFloorTablesService(payload) {
  try {
    const response = await baseAPI.post('/api/Table', payload);
    return response;
  } catch (error) {
    console.error('Post Floor Tables Service Error', error);
    throw error.message;
  }
}

export async function updateFloorTablesService(payload) {
  try {
    const response = await baseAPI.put('/api/Table/updates', payload);
    return response;
  } catch (error) {
    console.error('Update Floor Tables Service Error', error);
    throw error.message;
  }
}


// Floor table detail
export async function getFloorTableDetailService(id_floor) {
  try {
    const response = await baseAPI.get(`/api/Table/${id_floor}`);
    return response;
  } catch (error) {
    console.error('Get Floor Table Detail Service Error', error);
    throw error.message;
  }
}

export async function updateFloorTableDetailService(id_floor, payload) {
  try {
    const response = await baseAPI.get(`/api/Table/${id_floor}`, payload);
    return response;
  } catch (error) {
    console.error('Update Floor Table Detail Service Error', error);
    throw error.message;
  }
}