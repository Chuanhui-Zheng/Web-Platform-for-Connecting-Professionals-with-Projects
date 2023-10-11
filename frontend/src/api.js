// import axios from "axios";
// import { ACCESS_TOKEN } from "./constants";

// const apiUrl = "/choreo-apis/awbo/backend/rest-api-be2/v1.0";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : apiUrl,
// });

// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem(ACCESS_TOKEN);
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export default api;

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const request = async (path, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      ...options.headers,
    },
  });
  const data = await response.json();
  if (!response.ok || data.error) throw data;
  return data;
};

export const apiHealth = () => request('/health');

export const apiPost = (path, body) => {
  return new Promise((resolve, reject) => {
    request(path, {
    method: 'POST',
    body: JSON.stringify(body),
  })
      .then(resolve)
      .catch(reject);
  });
};

// export default apiPost;

export const apiGet = (path, queryString) => {
  return new Promise((resolve, reject) => {
    request(`${path}${queryString ? `?${queryString}` : ''}`)
      .then(resolve)
      .catch(reject);
  })
};

export const apiPut = (path, body) => {
  return new Promise((resolve, reject) => {
    request(path, {
    method: 'PUT',
    body: JSON.stringify(body),
  })
      .then(resolve)
      .catch(reject);
  });
};

export const apiDelete = (path, body) => {
  return new Promise((resolve, reject) => {
    request(path, {
    method: 'DELETE',
    body: JSON.stringify(body),
  })
      .then(resolve)
      .catch(reject);
  });
};

