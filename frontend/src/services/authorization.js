import api from './api';

async function verifyToken() {
    const token = sessionStorage.getItem('auth-token') || "";
    const response = await api.post("verifytoken", { token });
    const isValid = response.data;

    sessionStorage.setItem('token-verified', isValid);

    return isValid;
}

export async function requireLogin (to, from, next) {
    if (to.meta.authenticate) {
        const verificado = await verifyToken();

        if (!verificado) {
            next.redirect('/');
        }
    }
    next();
}
