// users.js
import {instanceAxios} from '../utils/createAxios.ts';

const instance = instanceAxios();

export const profile = async () => {
    const res = await instance.get('/api/users/profile', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    });
    return res.data;
}
export const getAllUsers = async (page: number = 1) => {
    const res = await instance.get(`/api/users/get-all?page=${page}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    })
    return res.data;
}
export const deleteUser = async (id: string) => {
    const res = await instance.delete(`/api/users/delete/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    })
    return res.data;
}
