import {useEffect, useState,} from "react";
import axios from "axios";
import { Link, useParams } from 'react-router-dom';
import MatchDetails from "../component/matchdetails";


export const DisplayMatch = () => {
    const [match,setMatch] = useState([]);
    const { username, clubName,year,month,day,matchid } = useParams();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(localStorage.getItem('access_token') === null){ // Check if the user is authenticated or not. if not redirect to login page.                      
            window.location.href = '/login'
        }
        if(localStorage.getItem('username') !== username){ 
            window.location.href = '/login'
        }
        const fetchMatchData = async () => {
            try {
                const {data} = await axios.get(   // Create the GET request to the backend API.
                    `https://badmintonfixtures-71b4cbceb35a.herokuapp.com/api/fetch-match/${username}/${clubName}/${year}/${month}/${day}/${matchid}/`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                    }}
                );
                setMatch(data);
                setLoading(false);
                console.log("data",data);

            } catch (error) {
                console.error('Failed to fetch session data:', error);
            }
        }
        fetchMatchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Display a loading message or a spinner
    }

    if (!match) {
        return <div>No match data available</div>; // Display a message if no match data is available
    }

    return(
        match && <MatchDetails 
        matchID={match.matchID} 
        score={match.score} 
        team1={match.team1} 
        team2={match.team2} 
        status={match.completed ? "Completed" : "Ongoing"} 
        username={username} 
        clubName={clubName} 
        year={year} 
        month={month} 
        day={day} 
        matchid={matchid} />
    )

}