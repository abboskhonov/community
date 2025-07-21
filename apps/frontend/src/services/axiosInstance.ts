import axios from 'axios'

const instance = axios.create({
baseURL: import.meta.env['VITE_API_BASE_URL'],

  withCredentials: true, 
})

// Optional: request/response interceptors
instance.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      // handle unauthorized (e.g., redirect to login)
    }
    return Promise.reject(err)
  }
)

export default instance
