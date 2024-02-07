import { LineChart, Line, CartesianGrid, XAxis,YAxis,Tooltip,Legend,ResponsiveContainer } from 'recharts';
import { Progress } from "@/components/ui/progress"
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"

export default function DisplaySinglePlayerComp(props) {
    console.log("props",props);
    const playerName = props.playerDetails.playerName;
    const elo = props.playerDetails.elo;
    const win = props.playerDetails.win;
    const loss = props.playerDetails.loss;
    const elohistory = props.playerDetails.eloHistory;
    const playhistory = props.playerDetails.playhistory;
    
    let totalgames = win + loss;
    let progress = ((win / totalgames) * 100).toFixed(2);
    let lossprogress = ((loss / totalgames) * 100).toFixed(2);
    let data = [];

    for(let i = 0; i < elohistory.length; i++) {
        data.push({ELO: elohistory[i], date: playhistory[i]});
    }
    console.log("data",data);
    return (
        <div >
            <h1 className="text-4xl font-bold underline mt-6 ml-4">Player Details:</h1>
            <div className='flex items-center justify-center mt-20'>
            <div className="w-[70%] h-[50vh] rounded-lg grid grid-rows-8 grid-cols-3 gap-4 mx-auto mt-10 border border-gray-500 p-2 bg-gray-100">
                <div className="col-start-1 col-end-1 row-start-1 row-end-2">
                    <div className="h-full bg-white p-4 flex items-center justify-start font-semibold">
                        <h2>Player Statistics:</h2>
                    </div>
                </div>
                <div className="col-start-2 col-end-4 row-start-1 row-end-2 ">
                    <div className="h-full bg-white p-4 flex items-center justify-start font-semibold">
                        <h2>ELO Graph:</h2>
                    </div>
                </div>
                <div className="col-start-1 col-end-2 row-start-2 row-end-8">
                    <div className="h-full bg-white p-4 ">
                        <h2 className='font-semibold text-lg mb-4'>
                            Player: {playerName}
                        </h2>
                        <div>
                            <div className='mb-4 '>
                                <div className='flex justify-between w-[50%]'>
                                    <span >Wins: </span>
                                    <span className='text-green-500'>{win}</span>
                                </div>

                                <div className=" flex w-[50%] h-[0.5em]">
                                    <div style={{display: 'flex', flexGrow: progress, flexShrink: 1, flexBasis: 0, backgroundColor: '#10B981'}}>
                                    </div>

                                    <div style={{display: 'flex', flexGrow: lossprogress, flexShrink: 1, flexBasis: 0, backgroundColor: '#CFD1D7'}}>
                                    </div>
                                    
                                </div>

                                <p className="text-sm text-gray-500">Win Rate: {progress}%</p>

                            </div>
                            
                            <div className='mb-4'>
                                <div className='flex justify-between w-[50%]'>
                                    <span >Losses: </span>
                                    <span className='text-red-500'>{loss}</span>
                                </div>
                                
                                <div className=" flex w-[50%] h-[0.5em] ">
                                    <div style={{display: 'flex', flexGrow: lossprogress, flexShrink: 1, flexBasis: 0, backgroundColor: '#EF4444'}}>
                                    </div>

                                    <div style={{display: 'flex', flexGrow: progress, flexShrink: 1, flexBasis: 0, backgroundColor: '#CFD1D7'}}>
                                    </div>
                                    
                                </div>

                                <p className="text-sm text-gray-500">Loss Rate: {lossprogress}%</p>
                            </div>
                            
                            <div className='mb-4'>
                                <span>Games Played: {totalgames}</span>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div className="col-start-2 col-end-4 row-start-2 row-end-10 h-full flex items-center justify-center bg-white">
                    <ResponsiveContainer width="95%" height="95%">
                        <LineChart width={730} height={300} data={data}
                            margin={{ top: 5, right: 30, left: 20, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" domain={['auto', 'auto']} label={{ value: 'Date', position: 'bottom', offset: 0 }} />
                            <YAxis dataKey="ELO" domain={['auto', 'auto']} label={{ value: 'ELO', angle: -90, position: 'insideLeft' }} />
                            <Tooltip />
                            <Line type="linear" dataKey="ELO" stroke="#8884d8" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
            </div>
        </div>
    )
}