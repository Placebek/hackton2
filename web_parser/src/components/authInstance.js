import axios from 'axios'

const authAxios = axios.create({
	baseURL: 'http://172.20.10.4:8000/',
})

authAxios.interceptors.response.use(
	response => {
		if (response.data) {
			localStorage.setItem('access_token', response.data.access)
			localStorage.setItem('refresh_token', response.data.refresh)
		}
		return response
	},
	error => Promise.reject(error)
)

export default authAxios
