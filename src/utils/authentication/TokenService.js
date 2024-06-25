class TokenService {
    getToken() {
        return localStorage.getItem('accessToken');
    }

    setToken(token) {
        localStorage.setItem('accessToken', token);
    }

    removeToken() {
        localStorage.removeItem('accessToken');
    }

    decodeToken = (token) => {
        try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch (error) {
            console.error('Error decoding token:', error);
            return null;
        }
    }

    isTokenValid(token) {
        if (!token) return false;

        const decodedToken = this.decodeToken(token);
        if (!decodedToken) return false;

        return decodedToken.exp * 1000 > Date.now();
    }
}

const tokenServiceInstance = new TokenService();
export { tokenServiceInstance as TokenService };
