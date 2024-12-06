import axios from 'axios'

const authBotAxios = axios.create({
	baseURL: 'http://172.20.10.4:8000/',
})

authBotAxios.interceptors.request.use(
	config => {
		const token = localStorage.getItem('access_token')
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	},
	error => Promise.reject(error)
)

export default authBotAxios
