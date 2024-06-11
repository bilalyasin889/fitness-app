import axios from 'axios';

export async function getRequest(url, headers = {}, params = {}) {
    return axios.get(url, {
        headers,
        params
    });
}