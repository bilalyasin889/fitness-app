import axios from 'axios';

const AxiosService = (baseURL, accessToken, storeToken, removeToken) => {
    const axiosInstance = axios.create({
        baseURL,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    axiosInstance.interceptors.request.use(config => {
        if (accessToken && typeof accessToken === 'string') {
            config.headers.Authorization = `Bearer ${accessToken}`;
            config.withCredentials = true;
        }
        return config;
    });

    axiosInstance.interceptors.response.use(
        response => {
            const newToken = response.headers['authorization'];
            if (newToken) {
                storeToken(newToken);
            }
            return response;
        },
        error => {
            if (error.response && error.response.status === 401) {
                removeToken();
            }
            return Promise.reject(error);
        }
    );

    return axiosInstance;
};

export default AxiosService;