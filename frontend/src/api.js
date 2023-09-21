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

export const apiPost = (path, body) => {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:8000' + path, {
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-type': 'application/json',
      },
    body: JSON.stringify(body),
    authUserId : `${localStorage.getItem('userId')}`
  })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          reject(data);
        } else {
          resolve(data);
        }
      });
  });
};

// export default apiPost;

export const apiGet = (path, queryString) => {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:8000' + path + '?' + queryString, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
  })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          reject(data);
        } else {
          resolve(data);
        }
      });
  })
};

export const apiPut = (path, body) => {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:8000' + path, {
    method: 'PUT',
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-type': 'application/json',

      },
    body: JSON.stringify(body),
    authUserId : `${localStorage.getItem('userId')}`
  })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          reject(data);
        } else {
          resolve(data);
        }
      });
  });
};

export const apiDelete = (path, body) => {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:8000' + path, {
    method: 'DELETE',
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-type': 'application/json',
      },
    body: JSON.stringify(body),
    authUserId : `${localStorage.getItem('userId')}`
  })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          reject(data);
        } else {
          resolve(data);
        }
      });
  });
};

