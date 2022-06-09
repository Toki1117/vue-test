import http from "./http-common";

http.interceptors.request.use(
  (config) => {
    console.log(config);
    // let token = localStorage.getItem('authtoken');

    //   if (token) {
    //     config.headers['Authorization'] = `Bearer ${ token }`;
    //   }
    config.headers.test = `Bearer TESTING`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
