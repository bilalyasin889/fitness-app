import axios from 'axios';

export const getRequest = async (url, headers = {}, params = {}) => {
    try {
        const response = await axios.get(url, {
            headers,
            params
        });
        return { data: response.data, error: null };
    } catch (error) {
        return { data: null, error: error.message };
    }
};
