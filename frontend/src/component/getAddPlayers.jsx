import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button"

export const FetchAddPlayers = (props) => {
    const [sessionAddPlayer, setSessionAddPlayer] = useState([]); 
    const [checkedPlayers, setCheckedPlayers] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const {data} = await axios.get(
                    `https://badmintonfixtures-71b4cbceb35a.herokuapp.com/api/add-player-to-session/${props.username}/${props.clubName}/${props.year}/${props.month}/${props.day}/`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                    }}
                );
                setSessionAddPlayer(data);
            } catch (error) {
                console.error('Failed to fetch Session Details:', error);
            }
        };

        fetchData();
    }, []);

    const handleCheckboxChange = (playerName) => {
        setCheckedPlayers(prevState => ({ //prevstate is the current state of checkedPlayers
            ...prevState, // keep all other key-value pairs
            [playerName]: !prevState[playerName]  // add or update the value of specific key
        }));
    };

    const handleSubmit = async () => {
        const selectedPlayers = Object.keys(checkedPlayers).filter(playerName => checkedPlayers[playerName]); // returns an array of selected players

        try {
            const response = await axios.post(
                `https://badmintonfixtures-71b4cbceb35a.herokuapp.com/api/add-player-to-session/${props.username}/${props.clubName}/${props.year}/${props.month}/${props.day}/`, {
                "players": selectedPlayers,
                },
                {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                }}
            );
            window.location.reload();
        } catch (error) {
            console.error('Failed to Add Players:', error);
        }

        
    };
    
    return (
        <div>
            
            {sessionAddPlayer.map((player, index) => (
                    <div className="grid grid-cols-1 gap-4">
                    <div key={index}>

                        <div className="flex items-center gap-4">
                            <input 
                                type="checkbox" 
                                id={`playerCheckbox-${index}`} 
                                checked={checkedPlayers[player.playerName] || false}
                                onChange={() => handleCheckboxChange(player.playerName)}
                            />
                            <label htmlFor={`playerCheckbox-${index}`}>{player.playerName}</label>
                        </div>

                    </div>
                    </div>

            ))}
            
            <Button onClick={handleSubmit} className="bg-green-500 hover:bg-green-700 text-white font-bold py-0.5 px-4 mt-2 rounded ">Add</Button>
            
            
        </div>
    );
}