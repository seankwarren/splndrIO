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
                <Board game={gameData} sendMessage={sendMessage}>
                    <Bank bank={gameData?.bank[0]} player={gameData?.players.filter((player) => player.id === player_id)[0]} sendMessage={sendMessage}></Bank>
                </Board>

                {/* <Player player={gameData?.current_player[0] as PlayerType} /> */}

                <div className="player-list">{gameData?.players?.map((player: PlayerType, i) => {
                    return <Player key={i} player={player} className={`${(player.id === gameData?.current_player[0].id) && "current-turn"}`} />
                })}</div>
            </div>
        </>
    )
}

export default Game