import axios from 'axios'

const instance = axios.create({
  baseURL: import.meta.env['VITE_API_BASE_URL'],
  withCredentials: true, // you can remove this if you use Bearer instead of cookies
})

// Request interceptor to add Bearer token
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

instance.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      // handle unauthorized
    }
    return Promise.reject(err)
  }
)

export default instance
