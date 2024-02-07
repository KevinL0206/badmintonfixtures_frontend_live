import {useEffect, useState,} from "react";
import axios from "axios";
import { Link, useParams } from 'react-router-dom';
import DisplayPlayersComp from "@/component/displayplayers";


export const DisplayPlayers = () => {

    const{username,clubName} = useParams();
    const [players,setPlayers] = useState([]);

    useEffect(() => {
        if(localStorage.getItem('access_token') === null){              
            window.location.href = '/login'
        }
        const fetchClubPlayers = async () => {
            try {
                const response = await axios.get( 
                    `http://127.0.0.1:8000/api/fetch-club-players/${username}/${clubName}/`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                        }}
                );
                console.log("response",response.data);
                setPlayers(response.data); 
                } catch (error) {
                    console.error('Failed to fetch Club Players:', error);
                }
            }
            fetchClubPlayers();
    }, []);

    let sortedPlayers = players && [...players].sort((a, b) => a.playerName.localeCompare(b.playerName));

    return(
        <DisplayPlayersComp players={sortedPlayers} username={username} clubname={clubName}/>
    )
}
