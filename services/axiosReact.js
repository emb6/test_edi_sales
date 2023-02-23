import axios from 'axios';

const axiosClient = axios.create();

axiosClient.defaults.baseURL = '/api';

axiosClient.defaults.headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
};

//All request will wait 2 seconds before timeout
axiosClient.defaults.timeout = 10000;

axiosClient.defaults.withCredentials = true;



export function getReactRequest(URL) {
    return axiosClient.get(`${URL}`).then(response => response);
}

export function postReactRequest(URL, payload) {
    return axiosClient.post(`${URL}`, payload).then(response => response);
}

export function putReactRequest(URL, payload) {
    return axiosClient.put(`${URL}`, payload).then(response => response);
}

export function deleteReactRequest(URL) {
    return axiosClient.delete(`${URL}`).then(response => response);
}
export function postMultipartReactRequest(URL, payload) {
    return axios.post(`${process.env.NEXT_PUBLIC_API_UPLOAD_URL}`, payload, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}
