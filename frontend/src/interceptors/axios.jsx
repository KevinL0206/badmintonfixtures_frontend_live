import axios from 'axios';

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
failedQueue.forEach(prom => {
    if (error) {
    prom.reject(error);
    } else {
    prom.resolve(token);
    }
});

failedQueue = [];
};

axios.interceptors.response.use(response => response, error => {
const originalRequest = error.config;
if (error.response.status === 401 && !originalRequest._retry) {
    if (isRefreshing) {
    return new Promise((resolve, reject) => {
        failedQueue.push({resolve, reject});
    }).then(token => {
        originalRequest.headers['Authorization'] = 'Bearer ' + token;
        return axios(originalRequest);
    }).catch(err => {
        return Promise.reject(err);
    });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    return new Promise((resolve, reject) => {
    axios.post('https://badmintonfixtures-71b4cbceb35a.herokuapp.com/token/refresh/', {
        refresh: localStorage.getItem('refresh_token')
    }, {
        headers: {
        'Content-Type': 'application/json'
        }
    }, {withCredentials: true})
    .then(({data}) => {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.access;
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
        originalRequest.headers['Authorization'] = 'Bearer ' + data.access;
        processQueue(null, data.access);
        resolve(axios(originalRequest));
    })
    .catch((err) => {
        processQueue(err, null);
        reject(err);
    })
    .then(() => {
        isRefreshing = false;
    });
    });
}

return Promise.reject(error);
});