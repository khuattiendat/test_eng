import axios from "axios";

const SERVER_URL = import.meta.env.VITE_API_SERVER_URL;

export const login = async (data: { email: string, password: string }) => {
    const res = await axios.post(`${SERVER_URL}/api/auth/login`, data);
    return res.data;
}
export const register = async (data: any) => {
    const res = await axios.post(`${SERVER_URL}/api/auth/register`, data);
    return res.data;
}