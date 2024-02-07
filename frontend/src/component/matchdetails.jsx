import {useEffect, useState,} from "react";
import axios from "axios";

export default function MatchDetails(props) {

    const [team1Score, team2Score] = props.score.split('-').map(Number);
    const playerOne = props.team1[0];
    const playerTwo = props.team1[1];
    const playerThree = props.team2[0];
    const playerFour = props.team2[1];
    const [score, setScore] = useState('');
    const [error, setError] = useState(null);
    const handleChange = (event) => setScore(event.target.value);

    const handleSubmit = async () => {
        console.log(props);
        try {
            const response = await axios.post(
                `http://127.0.0.1:8000/api/update-match/${props.username}/${props.clubName}/${props.year}/${props.month}/${props.day}/${props.matchid}/ `, 
                {
                "score": score,
                }, 
                {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                }}
            );

            if (response.status === 200) {
                window.location.reload();
            } else if (response.response.status === 400){
                console.log(response.response.data.detail);
                setError(response.response.data.detail);
            }
        } catch (e) {
            console.log(e);
        }
    }

    const handleClick = async () => {
        window.location.href = `/${props.username}/${props.clubName}/${props.year}/${props.month}/${props.day}`;
    }

    return (
        <main className="flex flex-col items-center justify-center bg-white p-10">
            <div className="text-center mb-8">
                <h1 className="text-5xl font-bold mb-4 underline">Match {props.matchID} Details: {props.status}</h1>
                <div className="text-2xl font-semibold">
                    <span className="mr-8">Team 1: {team1Score}</span>
                    <span>Team 2: {team2Score}</span>
                </div>
            </div>

            <div className="relative w-[650px] h-[450px] bg-green-700 rounded-lg flex flex-wrap justify-center items-center ">
                <div className="relative w-[600px] h-[400px] bg-green-700 flex flex-wrap border-3 border-white ">
                    <div className="w-1/2 h-1/2 flex items-center justify-center text-white text-xl font-bold border-b-2 border-r-2 border-white relative  pl-5 pr-16">
                        {playerOne}
                        <div className="absolute inset-x-3/4 top-0 bottom-0 w-0.5 bg-white"></div> {/* service line */}
                        <div className="absolute inset-y-0 left-5 w-0.5 bg-white"></div>
                        {/* back tram line */}
                        <div className="absolute inset-x-0 top-4 w-full h-0.5 bg-white"></div>{/* side tram line */}
                    </div>
                    <div className="w-1/2 h-1/2 flex items-center justify-center text-white text-xl font-bold border-b-2 border-white relative  pr-5 pl-16">
                        {playerThree}
                        <div className="absolute inset-x-1/4 top-0 bottom-0 w-0.5 bg-white"></div>
                        <div className="absolute inset-y-0 right-5 w-0.5 bg-white"></div>
                        <div className="absolute inset-x-0 top-4 w-full h-0.5 bg-white"></div>
                    </div>
                    <div className="w-1/2 h-1/2 flex items-center justify-center text-white text-xl font-bold border-r-2 border-white relative  pl-5 pr-16">
                        {playerTwo}
                        <div className="absolute inset-x-3/4 top-0 bottom-0 w-0.5 bg-white"></div>
                        <div className="absolute inset-y-0 left-5 w-0.5 bg-white"></div>
                        <div className="absolute inset-x-0 bottom-4 w-full h-0.5 bg-white"></div>
                    </div>
                    <div className="w-1/2 h-1/2 flex items-center justify-center text-white text-xl font-bold border-white relative  pr-5 pl-16">
                        {playerFour}
                        <div className="absolute inset-x-0 bottom-4 w-full h-0.5 bg-white"></div>
                        <div className="absolute inset-y-0 right-5 w-0.5 bg-white"></div>
                        <div className="absolute inset-x-1/4 top-0 bottom-0 w-0.5 bg-white"></div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col w-full max-w-md mt-8">
            <input
                onChange={handleChange}
                className="border-2 border-gray-300 p-2 mb-4 rounded-md"
                placeholder="Enter Score Here (00-00)"
                type="text"
            />
            <button onClick={handleSubmit} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Submit</button>

            <button onClick={handleClick} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2">View All Matches</button>

            <div className="font-bold text-red-700">
                {error && <p>Error: {error}</p>} {/* Display the error message if there is one */}
            </div>
            
            </div>
        </main>
        )
    }