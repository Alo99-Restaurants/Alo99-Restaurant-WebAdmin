import baseAPI from './axios/api';

export async function uploadImageService(formData, customConfig) {
  try {
    const response = await baseAPI.post(
      '/api/Common/storage',
      formData,
      customConfig
    );
    return response;
  } catch (error) {
    console.error('Get Restaurant Service Error', error);
    throw error.message;
  }
}
