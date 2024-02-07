
import { Button } from "@/components/ui/button"
import { Link, useParams } from 'react-router-dom';
import { FetchAddPlayers } from '../component/getAddPlayers';
import { FetchRemovePlayers } from '../component/getRemovePlayers';
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { CollapsibleTrigger, CollapsibleContent, Collapsible } from "@/components/ui/collapsible"

export default function DisplayPlayersComp(props) {

    const handleClick = async () => {
        window.location.href = `/${props.username}/${props.clubname}/`;
    }

    return (
        <div className="flex flex-col h-screen">
        
            <div className="flex flex-1">
                <main className="flex flex-1 flex-col gap-4 p-6 md:gap-8 md:p-10">
                <h1 className="text-4xl font-bold mb-2 underline">Player Details: </h1>
                <div className="flex items-center gap-2">
                    <Button onClick={handleClick} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">View All Sessions</Button>
                </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                        {props.players.map((player) => (
                            <div key={player.playerName}>
                                <Link to={`${player.playerName}`}>
                                <Card>
                                    <CardHeader>
                                        <CardTitle > {player.playerName} </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">ELO: {player.elo}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Wins: {player.win}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Losses: {player.loss}</p>

                                    </CardContent>
                                </Card>
                                </Link>

                            </div>
                        ))}
                    </div>
                </main>

            </div>
        </div>
    )
}
