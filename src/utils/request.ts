import axios  from 'axios'

const service = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
  timeout: 5000,
})


service.interceptors.request.use(
  (config) => {
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

service.interceptors.response.use(
  (res) => {
    const data = res.data
    if (!data || data.code !== 200 ) {
      // 
    }

    return data
  },
  (err) => {
    return Promise.reject(err)
  }
)

export default service