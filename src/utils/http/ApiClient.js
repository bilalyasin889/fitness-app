import axios from 'axios';

const createAxiosInstance = ({baseURL, headers = {}}) => {
    return axios.create({
        baseURL: baseURL,
        headers: headers
    });
}

class ApiClient {
    constructor(baseURL) {
        this.axiosInstance = createAxiosInstance({
            baseURL,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    get(endpoint) {
        return this.axiosInstance.get(endpoint);
    }
}

export default ApiClient;