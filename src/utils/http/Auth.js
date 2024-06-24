import {APPLICATION_URIS, HOSTS} from '../../config/applicationUris';
import ApiClient from "./ApiClient";

const HOST = HOSTS.auth;
const API_URIS = APPLICATION_URIS.auth;
const HEADERS = {
    withCredentials: true
}

const apiClient = new ApiClient(HOST, HEADERS);

export const login = async (email, password) => {
    return apiClient.post(
        API_URIS.login,
        JSON.stringify({email, password})
    )
        .then((response) => {
            console.debug("login: User successfully authenticated.");
            const {accessToken, refreshToken} = response.data;
            apiClient.addToken(accessToken);

            return {
                success: true,
                accessToken: accessToken,
                refreshToken: refreshToken
            };
        })
        .catch((error) => {
            console.error("login: Error authenticating user: ", error.message);
            return {success: false, error: getErrorMessage(error, 401)};
        });
};

export const register = async (email, password) => {
    return apiClient.post(
        API_URIS.register,
        JSON.stringify({email, password})
    )
        .then((response) => {
            console.debug("register: User successfully created.");
            return { success: true };
        })
        .catch((error) => {
            console.error("register: Error creating user: ", error.message);
            return {success: false, error: getErrorMessage(error, 409)};
        });
};

const getErrorMessage = (error, code)=> {
    return error.response?.status === code
        ? error.response.data
        : 'Unexpected error, please try again. If error persists, please contact support.';
}