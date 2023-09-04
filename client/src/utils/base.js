import axios from 'axios';

// Create an instance of axios
const base =  axios.create({
  baseURL: 'http://localhost:5000/',
  headers: {
    'Content-Type': 'application/json'
  }
});

base.interceptors.request.use((req) => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token')

  if(token) {
      req.headers.authorization = `Bearer ${token}`
  }
  return req
})

base.interceptors.response.use(
  (res) => res,
  (err) => {
    // if (err.response.status === 401) {
    //   // store.dispatch({ type: LOGOUT });
    //   console.log("logout");
    // }
    return Promise.reject(err);
  }
);

export default base;