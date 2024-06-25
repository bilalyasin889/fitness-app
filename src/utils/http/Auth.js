import AxiosService from './AxiosService';
import {APPLICATION_URIS, HOSTS} from '../../config/applicationUris';

const HOST = HOSTS.auth;
const API_URIS = APPLICATION_URIS.auth;

export const authApi = (accessToken, storeToken, removeToken) => {
    return AxiosService(HOST, accessToken, storeToken, removeToken);
}

export const login = async (api, email, password) => {
    return api.post(
        API_URIS.login,
        JSON.stringify({email, password})
    )
        .then((response) => {
            console.debug("login: User successfully authenticated.");
            return {success: true};
        })
        .catch((error) => {
            console.error("login: Error authenticating user: ", error.message);
            return {success: false, error: getErrorMessage(error, 401)};
        });
};

export const register = async (api, data) => {
    return api.post(
        API_URIS.register,
        JSON.stringify({
            email: data.email,
            password: data.password,
            name: data.name,
            weight: data.weight,
            height: data.height
        })
    )
        .then(() => {
            console.debug("register: User successfully created.");
            return {success: true};
        })
        .catch((error) => {
            console.error("register: Error creating user: ", error.message);
            return {success: false, error: getErrorMessage(error, 409)};
        });
};


export const getUserInfo = async (api) => {
    return api.get(API_URIS.userInfo)
        .then((response) => {
            console.debug("userInfo: User Info successfully retrieved.");
            return response.data;
        })
        .catch((error) => {
            console.error("userInfo: Error retrieving user info: ", getErrorMessage(error, 404));
            return null
        });
};

const getErrorMessage = (error, code) => {
    return error.response?.status === code
        ? error.response.data
        : 'Unexpected error, please try again. If error persists, please contact support.';
};
