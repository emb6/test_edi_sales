import axios from 'axios';

const axiosClient = axios.create();

axiosClient.defaults.baseURL = `${process.env.API_URL}`;

axiosClient.defaults.headers = {
    'Content-Type': 'application/json',
    'Authorization':`Bearer ${process.env.API_KEY}`,
    Accept: 'application/json'
};

//All request will wait 2 seconds before timeout
axiosClient.defaults.timeout = 10000;

axiosClient.defaults.withCredentials = true;



export function getRequest(URL) {
    return axiosClient.get(`${URL}`).then(response => response);
}

export function postRequest(URL, payload) {
    return axiosClient.post(`${URL}`, payload).then(response => response);
}

export function putRequest(URL, payload) {
    return axiosClient.put(`${URL}`, payload).then(response => response);
}

export function deleteRequest(URL) {
    return axiosClient.delete(`${URL}`).then(response => response);
}
