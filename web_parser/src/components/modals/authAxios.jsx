import axios from 'axios';

const BASE_URL = 'http://172.20.10.4:8000';

const authAxios = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    try {
        const response = await axios.post(`${BASE_URL}/auths_bots/api/v1/token/refresh/`, {
            refresh: refreshToken,
        });
        const newAccessToken = response.data.access;

        localStorage.setItem('accessToken', newAccessToken);

        return newAccessToken;
    } catch (error) {
        console.error('Ошибка обновления токена:', error);
        throw error;
    }
};

authAxios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response &&
            error.response.status === 401 &&
            error.response.data.code === 'token_not_valid' &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

            try {
                const newAccessToken = await refreshAccessToken();

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                return authAxios(originalRequest);
            } catch (refreshError) {
                console.error('Ошибка при повторной авторизации:', refreshError);
                window.location.href = '/';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default authAxios;
