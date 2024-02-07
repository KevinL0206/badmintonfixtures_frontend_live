import {useEffect, useState,} from "react";
import axios from "axios";
import { Link, useParams } from 'react-router-dom';
import DisplaySinglePlayerComp from "@/component/displaysingleplayer";


export const DisplaySinglePlayer = () => {

    const{username,clubName,playername} = useParams();
    const [playerDetails,setPlayerDetails] = useState(null);
    console.log("clubName",clubName);
    useEffect(() => {
        
        const fetchPlayer = async () => {
            try {
                const response = await axios.get( 
                    `https://badmintonfixtures-71b4cbceb35a.herokuapp.com/api/fetch-player-details/${username}/${clubName}/${playername}/`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        
                    }}
                );
                
                setPlayerDetails(response.data); 
                } catch (error) {
                    console.error('Failed to fetch Players Details:', error);
                }
            }
            fetchPlayer();
    }, []);

    return(

        
        playerDetails && <DisplaySinglePlayerComp playerDetails={playerDetails}/>
    )
}