import axios from "axios";

axios.interceptors.request.use(
  (config) => {
    console.log(config);
    // let token = localStorage.getItem('authtoken');

    //   if (token) {
    //     config.headers['Authorization'] = `Bearer ${ token }`;
    //   }
    config.headers["Authorization"] = `Bearer ${23123123123}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
