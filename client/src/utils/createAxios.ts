import {jwtDecode} from "jwt-decode";
import axios from "axios";

const SERVER_URL = import.meta.env.VITE_API_SERVER_URL;
const refreshToken = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const res = await axios.post(`${SERVER_URL}/api/auth/refresh-token`, {}, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    });
    return res.data;
};
export const instanceAxios = () => {
    console.log("instanceAxios");
    const newInstance = axios.create({
        baseURL: `${SERVER_URL}`,
    });
    newInstance.interceptors.request.use(
        async (config) => {
            try {
                const date = new Date();
                const accessToken = localStorage.getItem('accessToken');
                const decodedToken = jwtDecode(accessToken);
                if (decodedToken.exp < date.getTime() / 1000) {
                    const dataRefresh = await refreshToken();
                    localStorage.setItem("accessToken", dataRefresh?.data)
                    config.headers.Authorization = `Bearer ${dataRefresh?.data}`;
                }
                return config;
            } catch (e) {
                console.log(e);
            }
        },
        (err) => {
            return Promise.reject(err);
        }
    );
    return newInstance;
};