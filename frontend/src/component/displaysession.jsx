
import { Button } from "@/components/ui/button"
import { Link, useParams } from 'react-router-dom';
import { FetchAddPlayers } from '../component/getAddPlayers';
import { FetchRemovePlayers } from '../component/getRemovePlayers';
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { CollapsibleTrigger, CollapsibleContent, Collapsible } from "@/components/ui/collapsible"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function DisplaySessionComp(props) {

    const handleClick = async () => {
        window.location.href = `/${props.username}/${props.clubName}/`;
    }

    return (
        <div className="flex flex-col h-screen">
        
            <div className="flex flex-1">
                <main className="flex flex-1 flex-col gap-4 p-6 md:gap-8 md:p-10">
                <h1 className="text-4xl font-bold mb-4 underline">Session Details : {props.year}-{props.month}-{props.day} </h1>
                <div className="flex items-center gap-2">
                    <Button onClick = {props.createMatch} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Generate Match</Button>
                    <span className="text-red-500 font-bold">{props.error && <p>Error: {props.error}</p>} </span>
                    <Button onClick={handleClick} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">View All Sessions</Button>
                </div>
                <ScrollArea className="h-[600px] w-100 rounded-md border">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {props.matches.map((match) => (
                            <div key={match.matchID}>
                                <Link to={`${match.matchID}`}>
                                <Card>
                                    <CardHeader>
                                        <CardTitle > Match {match.matchID}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Team 1: {match.team1.join(' and ')}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Team 2: {match.team2.join(' and ')}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Score: {match.score}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Status: {match.completed ? "Completed" :"In Progress"}</p>
                                    </CardContent>
                                </Card>
                                </Link>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
                </main>
                <aside className="w-80 border-l bg-gray-100/40 p-6 md:p-10 dark:bg-gray-800/40">
                    <div>
                        <Collapsible>
                            <CollapsibleTrigger className="flex items-center gap-2">
                                <ChevronRightIcon className="h-4 w-4" />
                                <span className="text-lg font-semibold"> Add Players</span>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <FetchAddPlayers username={props.username} clubName={props.clubName} year={props.year} month={props.month} day={props.day} />
                            </CollapsibleContent>
                        </Collapsible>
                        <Collapsible>
                            <CollapsibleTrigger className="flex items-center gap-2 mt-4">
                                <ChevronRightIcon className="h-4 w-4" />
                                <span className="text-lg font-semibold">Remove Players</span>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <FetchRemovePlayers username={props.username} clubName={props.clubName} year={props.year} month={props.month}day={props.day} />
                            </CollapsibleContent>
                        </Collapsible>
                        
                    </div>
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
