import axios from 'axios';

const createAxiosInstance = ({baseURL, headers = {}}) => {
    return axios.create({
        baseURL: baseURL,
        headers: headers
    });
}

class ApiClient {
    constructor(baseURL, additionalHeaders) {
        this.axiosInstance = createAxiosInstance({
            baseURL,
            headers: {
                'Content-Type': 'application/json',
                ...additionalHeaders
            }
        });
    }

    get(endpoint, params = {}) {
        return this.axiosInstance.get(endpoint, {params});
    }
}

export default ApiClient;