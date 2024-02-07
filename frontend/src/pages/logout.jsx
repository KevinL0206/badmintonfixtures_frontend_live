import {useEffect, useState} from "react"
import axios from "axios";

export const Logout = () => {
    useEffect(() => {
        (async () => {
            try {
                const {data} = await axios.post(
                    'https://badmintonfixtures-71b4cbceb35a.herokuapp.com/logout/',
                    { refresh_token: localStorage.getItem('refresh_token') },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('access_token')}` // Add this line
                        },
                        withCredentials: true
                    }
                );
                localStorage.clear();
                axios.defaults.headers.common['Authorization'] = null;
                window.location.href = '/login'
            } catch (e) {
                console.log('logout not working', e)
            }
        })();
    }, []);


    return (
        <div></div>
    )
}