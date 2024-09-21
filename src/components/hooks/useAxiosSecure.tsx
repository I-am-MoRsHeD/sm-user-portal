// import axios from "axios";


// const axiosIntance = axios.create({
//     baseURL: 'https://diasporex-api.vercel.app/api/v1',
//     withCredentials: true,
// })

// const useAxiosSecure = () => {
//     // return axiosIntance;
// };

// export default useAxiosSecure;

import axios from 'axios';
import Cookies from 'js-cookie';

const AUTH_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';
let authToken: string | null = localStorage.getItem(AUTH_TOKEN_KEY);
let refreshToken: string | null = localStorage.getItem(REFRESH_TOKEN_KEY);

export const setAuthTokens = (newAuthToken: string | null, newRefreshToken: string | null) => {
    authToken = newAuthToken;
    refreshToken = newRefreshToken;
    if (newAuthToken) {
        localStorage.setItem(AUTH_TOKEN_KEY, newAuthToken);
    } else {
        localStorage.removeItem(AUTH_TOKEN_KEY);
    }
    if (newRefreshToken) {
        localStorage.setItem(REFRESH_TOKEN_KEY, newRefreshToken);
    } else {
        localStorage.removeItem(REFRESH_TOKEN_KEY);
    }
};

const axiosInstance = axios.create({
    baseURL: 'https://diasporex-api.vercel.app/api/v1',
});

const useAxiosSecure = () => {
    axiosInstance.interceptors.request.use(
        (config) => {
            // console.log(config.headers['Authorization']);
            if (authToken) {
                config.headers['Authorization'] = `${authToken}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );
    axiosInstance.interceptors.response.use(
        (response) => {

            Cookies.set('accessToken', response?.data?.data.accessToken , { expires: 1 });
            Cookies.set('refreshToken', response?.data?.data.refreshToken);

            localStorage.setItem(AUTH_TOKEN_KEY, response?.data?.data.accessToken);
            return response
        },
        async (error) => {
            const originalRequest = error.config;
            if (error.response?.status === 401 && !originalRequest._retry && refreshToken) {
                originalRequest._retry = true;
                try {
                    const response = await axiosInstance.post('/auth/refresh-token', { token: refreshToken });

                    const newAuthToken = response.data.accessToken;
                    setAuthTokens(newAuthToken, refreshToken); // Save new token to localStorage

                    axiosInstance.defaults.headers.common['Authorization'] = `${newAuthToken}`;
                    return axiosInstance(originalRequest);

                } catch (err) {
                    setAuthTokens(null, null); // Clear tokens on failure
                    return Promise.reject(err);
                }
            }
            return Promise.reject(error);
        }
    );
    return axiosInstance;
};

export default useAxiosSecure;
