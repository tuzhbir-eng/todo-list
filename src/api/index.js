import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
})

const axiosUserInstance = axios.create({
  baseURL: 'https://randomuser.me/api/'
})

export const getOption = () => axiosInstance.get('/todos?_limit=5')

export const getUser = () => axiosUserInstance.get('')
