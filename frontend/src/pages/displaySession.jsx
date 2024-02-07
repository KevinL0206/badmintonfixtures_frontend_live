import {useEffect, useState,} from "react";
import axios from "axios";
import { Link, useParams } from 'react-router-dom';
import { FetchAddPlayers } from '../component/getAddPlayers';
import { FetchRemovePlayers } from '../component/getRemovePlayers';
import DisplaySessionComp from "@/component/displaysession";


export const DisplaySession = () => {

    const [sessionPlayers,setSessionPlayers] = useState([]); 
    const [matches,setMatches] = useState([]);
    const { username, clubName,year,month,day } = useParams(); 
    const [error, setError] = useState(null);

    useEffect(() => {
        if(localStorage.getItem('access_token') === null){ // Check if the user is authenticated or not. if not redirect to login page.                      
            window.location.href = '/login'
        }
        const fetchSessionDetails = async () => {
            try {
                const response = await axios.get(   // Create the GET request to the backend API.
                    `http://127.0.0.1:8000/api/session-detail/${username}/${clubName}/${year}/${month}/${day}/`, 
                    {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                    }}
                );
                setSessionPlayers(response.data.session.players);
                setMatches(response.data.matches);
            } catch (error) {
                console.error('Failed to fetch Session Details:', error);
            }
        }
        fetchSessionDetails();
    }, []);

    const createMatch = async () => {
        try {
            const response = await axios.post(
                `http://127.0.0.1:8000/api/create-match/${username}/${clubName}/${year}/${month}/${day}/`, 
                {}, // data object is empty
                { // options object
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                    }
                }
            );
            if (response.status === 200) {
                window.location.reload();
            } else if (response.status === 400){
                setError(response.response.data.detail);
            }
        } catch (e) {
            console.log(e);
            setError("Invalid Request")
        }
    }

    
    return(
        <div>
            
            <DisplaySessionComp username={username} clubName={clubName} year={year} month={month} day={day} matches={[...matches].reverse()} createMatch={createMatch} error={error} />

            
        </div>
    )
}