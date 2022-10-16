import React, { useEffect, useState, useCallback } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { GameType, PlayerType } from './types';
import useCustomWebSocket from '../hooks/useCustomWebsocket';
import Player from './Player';
import { ConnectionStatus } from '../utils';
import Board from './Board';
import Bank from './Bank';
import { CardModal } from './CardModal';

interface propsType {
}

const Game: React.FC<propsType> = (props) => {

    // router param
    const { game_url, player_id } = useParams();
    // console.log(state)

    // websocket connection and handling
    const { sendMessage, readyState, response } = useCustomWebSocket(`ws://127.0.0.1:8000/games/${game_url}`);

    // manage websocket response with state
    const [gameData, setGameData] = useState<GameType>();

    useEffect(() => {
        if (response) {
            const message = JSON.stringify(response?.message)
            setGameData(JSON.parse(message))
        }
    }, [response])

    // request new game details from websocket ser er
    const requestGameDetails = useCallback((game_url: string) => {
        const request = {
            type: "request_game_details",
            message: game_url,
        }
        sendMessage(JSON.stringify(request))
    }, [sendMessage])

    // read the connection status from enum
    const connectionStatus = ConnectionStatus[readyState];

    // refresh the connection on new game selection or when the server status changes
    useEffect(() => {
        if (connectionStatus === "Open" && game_url) {
            requestGameDetails(game_url)
        }
    }, [game_url, connectionStatus, requestGameDetails]);

    return (
        <>
            <div className="header">
                <h1 className="title">splndr.io</h1>
            </div>
            <div className="container">
                <div>
                    <div className="table-container">
                        {
                            // !showCardClicked ?
                            <div>
                                <Board game={gameData} sendMessage={sendMessage} />

                                {/* <CardModal container={document.getElementById(".table-container") as HTMLElement} /> */}
                            </div>
                            // <div>
                            //     <button onClick={() => setShowCardClicked(false)}>Buy</button>
                            //     <button onClick={() => setShowCardClicked(false)}>Reserve</button>
                            // </div>
                        }
                    </div>

                    <Bank bank={gameData?.bank[0]}></Bank>

                    <div>CurrentPlayer:
                        <Player player={gameData?.current_player[0] as PlayerType} />
                    </div>

                    {/* <div>{gameData?.players?.map((player: PlayerType, i) => {
                        return <Player key={i} player={player} />
                    })}</div> */}

                </div>
            </div>
        </>
    )
}

export default Game