import axios from 'axios';

const createAxiosInstance = ({baseURL, headers = {}}) => {
    return axios.create({
        baseURL: baseURL,
        headers: headers
    });
}

class ApiClient {
    constructor(baseURL, additionalHeaders = {}) {
        this.axiosInstance = createAxiosInstance({
            baseURL,
            headers: {
                'Content-Type': 'application/json',
                ...additionalHeaders
            }
        });
    }

    addToken(token) {
        this.axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + token;
    }

    removeToken() {
        delete this.axiosInstance.defaults.headers.common["Authorization"];
    }

    get(endpoint) {
        return this.axiosInstance.get(endpoint);
    }

    post(endpoint, data) {
        return this.axiosInstance.post(endpoint, data);
    }
}

export default ApiClient;