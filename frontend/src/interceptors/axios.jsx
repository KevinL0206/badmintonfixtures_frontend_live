import axios from "axios";

let refresh = false;

axios.interceptors.response.use(resp => resp, async error => {
    if (error.response.status === 401 && !refresh) {
        refresh = true;
        const refreshToken = localStorage.getItem('refresh_token');
        try {
            const response = await axios.post(
                'https://badmintonfixtures-71b4cbceb35a.herokuapp.com/token/refresh/',
                { refresh: refreshToken },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            ); 

            if (response.status === 200) {
            const { access, refresh } = response.data;
            axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;
            localStorage.setItem('access_token', access);
            localStorage.setItem('refresh_token', refresh);
            return axios(error.config);
            }
    } catch (err) {
        console.error(err);
        window.location.href = '/login';
    } finally {
        refresh = false;
    }
    }
    return Promise.reject(error);
}
);