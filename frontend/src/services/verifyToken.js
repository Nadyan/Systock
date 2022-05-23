import api from './api';

export default async function verifyToken() {
    const token = sessionStorage.getItem('auth-token') || "";
    const response = await api.post("verifytoken", { token });
    const isValid = response.data;
    
    return isValid;
}
