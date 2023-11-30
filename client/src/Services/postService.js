import * as httpRequest from '~/utils/httpRequest';
import { LOCAL_STORAGE_TOKEN_NAME } from './constants';

const getToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME);

const headers = {
    headers: { Authorization: `Bearer ${getToken}` },
};

export const getPosts = async () => {
    try {
        const response = await httpRequest.get('posts');
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const sendPost = async (newPost) => {
    try {
        const response = await httpRequest.post('posts/create', newPost, headers);
        return response;
    } catch (error) {
        console.log(error.response.message);
    }
};

export const updatePost = async (id, updatedPost) => {
    try {
        const response = await httpRequest.update(`posts/${id}`, updatedPost, headers);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const deletePost = async (postId) => {
    try {
        const response = await httpRequest.destroy(`posts/${postId}`, headers);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
