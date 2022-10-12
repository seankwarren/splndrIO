import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import { GameType, PlayerType } from './types';
import useCustomWebSocket from '../hooks/useCustomWebsocket';
import Player from './Player';
import { ConnectionStatus } from '../utils';
import Board from './Board';
import Deck from './Deck';
import Bank from './Bank';
import styles from '../styles';

interface propsType {
    game?: GameType
}

const localStyles = {
    decksContainer: {
        display: "grid",
        gridTemplateColumns: "1fr",
        gridGap: 5,
        backgroundColor: "#fff",
        color: "#444",
        marginRight: 0,
        gridRow: "1 / 2",
    },

    playSurface: {
        display: "grid",
        gridTemplateColumns: "1fr 3fr",
    }
}

const Game: React.FC<propsType> = (props) => {

    // router param
    const { game_url } = useParams();

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
            <h1 className="title" style={styles.title}>spldr.io</h1>
            <Bank bank={gameData?.bank[0]}></Bank>
            <br />
            <div className="play-surface" style={localStyles.playSurface}>
                <div style={localStyles.decksContainer}>{gameData?.decks.map((deck, i) => {
                    return <Deck key={i} deck={deck} />
                })}</div>
                <br />
                <Board board={gameData?.board[0]}></Board>
            </div>
            <div>{gameData?.players.map((player: PlayerType, i) => {
                return <Player key={i} player={player} />
            })}</div>
        </>
    )
}

export default Game