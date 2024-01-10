import axios from 'axios';

function baseAPI(options) {
  const getTokenAPI = () => {
    if (typeof window !== 'undefined') {
      const value = window.localStorage.getItem('accessToken');
      if (value) {
        return { Authorization: 'Bearer ' + value };
      }
      return null;
    }
  };

  const axiosInstance = axios.create({
    ...options?.config,
    baseURL: options?.baseURL || 'https://booking-api.vietmap.io',
    timeout: options?.timeout || 10000,
  });

  // Request interceptor for API calls
  axiosInstance.interceptors.request.use(
    config => {
      // Kiểm tra và lấy Authorization từ local storage
      const tokenHeader = getTokenAPI();
      // Nếu có Authorization, thêm vào headers của request
      if (tokenHeader) {
        config.headers = {
          ...config.headers,
          ...tokenHeader,
        };
      }

      return config;
    }
    ,
    error => {
      // Handle errors
      return Promise.reject(error);
    }
  );

  // Response interceptor for API calls
  axiosInstance.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      // Handle errors
      if (error.response.status === 401) {
        // Request failed with status code 401 (unauthorized)
        if (typeof window !== 'undefined') {
          // Handle logout and redirect to sign in page
          window.location.replace('/sign-in');
          window.localStorage.removeItem('accessToken');
          window.localStorage.removeItem('userInfo');
        }
      }

      return Promise.reject(error);
    }
  );

  function handleResponseData(data) {
    if (!!data || data.status === 200) {
      return Promise.resolve(data);
    }
    return Promise.reject(data);
  }

  async function getFunc(url, config) {
    try {
      const response = await axiosInstance.get(url, config);
      return handleResponseData(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async function postFunc(url, data, config) {
    try {
      const response = await axiosInstance.post(url, data, config);
      return handleResponseData(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async function putFunc(url, data, config) {
    try {
      const response = await axiosInstance.put(url, data, config);
      return handleResponseData(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async function deleteFunc(url, config) {
    try {
      const response = await axiosInstance.delete(url, config);
      return handleResponseData(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  return {
    get: getFunc,
    post: postFunc,
    put: putFunc,
    delete: deleteFunc,
  };
}

export default baseAPI();
