
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { CollapsibleTrigger, CollapsibleContent, Collapsible } from "@/components/ui/collapsible"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Link } from 'react-router-dom';
import {useEffect, useState,} from "react";
import axios from "axios";

export default function Component(props) {
    const [error, setError] = useState(null);
    const [playerName,setPlayerName] = useState('');
    const [nameerror, setNameError] = useState('');

    const createSession = async () => {
        
        try {
            console.log(props.clubName);
            const response = await axios.post(
                `http://127.0.0.1:8000/api/display-create-session/${props.username}/${props.clubName}/`, 
                {
                    'clubName': props.clubName,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                    }
                }
            );

            if (response.status === 201) {
                window.location.reload();
            } else if (response.response.status === 400){
                setError(response.response.data.detail);
            }
        } catch (e) {
            console.log(e);
            setError("Invalid Request")
        }
    }
    const handleChange = (event) => setPlayerName(event.target.value);
    const handleSubmit = async () => {
        console.log(playerName);
        try {
            const response = await axios.post(
                `http://127.0.0.1:8000/api/display-create-club-players/${props.username}/${props.clubName}/`,{
                    "playerName": playerName,
                },
                {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                }}
            );
            if (response.status === 201) {
                window.location.reload();
            } else if (response.response.status === 400){
                console.log(response.response.data.playerName[0])
                if (response.response.data.playerName[0] === "player with this playerName already exists.") {
                    setNameError("Player already exists");
                }
                console.log(nameerror)
            }
        } catch (error) {
            console.log('Failed to add player:',error);
        } 
    }

    const handleClick = () => {
        window.location.href = `/${props.username}/${props.clubName}/players`;
    }

    return (
        <div className="flex flex-col h-screen">
        
        <div className="flex flex-1">
            <main className="flex flex-1 flex-col gap-4 p-6 md:gap-8 md:p-10">
            <h1 className="text-4xl font-bold mb-2 underline">All Sessions: </h1>
            <div className="flex items-center gap-2">
            <Button onClick = {createSession} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Create Session</Button>
            <span className="text-red-500 font-bold">{error && <p>Error: {error}</p>} {/* Display the error message if there is one */}</span>
            <Button onClick = {handleClick} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">View Player Details</Button>
            </div>
            <div >
            <ScrollArea className="h-[600px] w-100 rounded-md border">
            {props.sessions?.map((session, index) => {
                const date = new Date(session.date);
                const year = date.getFullYear();
                const month = date.getMonth() + 1; // 0 indicates the first month of the year)
                const day = date.getDate();
                
                return (
                    
                        <Card key={index}>
                            <CardHeader>
                                <CardTitle>
                                    <Link to={`${year}/${month}/${day}`}>{session.date}</Link>
                                </CardTitle>
                            </CardHeader>
                        </Card>
                    
                );
            })}
            </ScrollArea>
            </div>

            </main>
            <aside className="w-[21rem] border-l bg-gray-100/40 p-6 md:p-10 dark:bg-gray-800/40">
                <Collapsible>
                    <CollapsibleTrigger className="flex items-center gap-2">
                    <ChevronRightIcon className="h-4 w-4" />
                    <span className="text-lg font-semibold">Club Members</span>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                    
                    <div className="flex items-center gap-2 mb-4 mt-4">
                        <Input onChange={handleChange} className="w-full md:w-1/2 lg:w-2/3" placeholder="Player Name..." type="text" />
                        <Button onClick={handleSubmit} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Add Player</Button>
                    </div>
                    <div className="text-red-500 font-bold mb-4">
                        {nameerror && <p>Error: {nameerror}</p>}
                    </div>
                    <ScrollArea className="h-[600px] w-60 rounded-md border">
                    <div className="grid grid-cols-1 gap-4">
                        {props.clubPlayers.map((player, index) => (
                            <Card key={index}>
                                <CardHeader>
                                    <CardTitle>
                                        {player.playerName}
                                    </CardTitle>
                                </CardHeader>
                            </Card>
                        ))}
                    </div>
                    </ScrollArea>
                    </CollapsibleContent>
                </Collapsible>
            </aside>
        </div>
        </div>
    )
    }

    function ChevronRightIcon(props) {
    return (
        <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        >
        <path d="m9 18 6-6-6-6" />
        </svg>
    )
    }

