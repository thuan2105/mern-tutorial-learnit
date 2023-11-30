import axios from 'axios';

const httpRequest = axios.create({
    baseURL: process.env.NODE_ENV !== 'production' ? process.env.REACT_APP_BASE_URL : 'somedeployedURL',
});

export const get = async (path) => {
    const response = await axios.get(process.env.REACT_APP_BASE_URL + path);
    return response;
};

export const post = async (path, options = {}, headers = {}) => {
    const response = await httpRequest.post(path, options, headers);
    return response.data;
};

export const update = async (path, updatedPost, headers = {}) => {
    const response = await httpRequest.put(path, updatedPost, headers);
    return response;
};

export const destroy = async (path, headers = {}) => {
    const response = await httpRequest.delete(path, headers);
    return response;
};
