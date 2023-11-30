import * as httpRequest from '~/utils/httpRequest';
import { LOCAL_STORAGE_TOKEN_NAME } from './constants';

export const registerUser = async (userForm) => {
    try {
        const response = await httpRequest.post('auth/register', userForm);
        if (response.success) localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.accessToken);

        return response;
    } catch (error) {
        if (error.response.data) return error.response.data;
        else return { success: false, message: error.message };
    }
};
