import axios from 'axios'

const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 5000,
})

service.interceptors.response.use(
  (response) => response,
  (error) => {
    console.warn('err', error)
    return Promise.reject(error)
  },
)

export default service
