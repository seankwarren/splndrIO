import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import React, { useCallback, useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";

import { GameType } from './types';
import useCustomWebSocket from '../hooks/useCustomWebsocket';
import styles from '../styles';
import { ConnectionStatus, FormatDate } from '../utils';

interface propsType {
    gameList?: GameType[]
}

const GameList: React.FC<propsType> = (props) => {

    // allow redirect
    const navigate = useNavigate();


    // websocket connection and handling
    const { sendMessage, readyState, response } = useCustomWebSocket('ws://127.0.0.1:8000/games/')
    const connectionStatus = ConnectionStatus[readyState];


    // manage game list state
    const [gameList, setGameList] = useState<GameType[] | undefined>([])
    const [selectedGame, setSelectedGame] = useState<GameType | undefined>()
    const [selectedGameURL, setSelectedGameURL] = useState<string | undefined>()

    // update game list whenever websocket sends new response
    useEffect(() => {
        const type = response?.type
        const message = JSON.stringify(response?.message)
        // console.log(`updating based on last response of type: ${type}`)
        switch (type) {
            case 'request_game_list':
                setGameList(JSON.parse(message))
                // console.log(message)
                break;
            case 'create_game':
                setSelectedGame(JSON.parse(message))
                setGameList((gameList) => gameList?.concat(JSON.parse(message)))
                // console.log("HERE")
                navigate("/games/" + JSON.parse(message)["game_url"] + "/" + JSON.parse(message).current_player[0].id)
                //     { state: { player_id: JSON.parse(message).current_player[0].id } }
                // )
                break;
            case 'add_player':
                // console.log("HERE")
                // console.log(selectedGame)
                navigate("/games/" + selectedGameURL + "/" + selectedGame?.current_player[0].id)
                //     { state: { player_id: selectedGame?.current_player.id } }
                // )
                break;
            default:
                console.log(`Unknown message type ${type}`)
        }
    }, [response, selectedGameURL])


    // Event Handlers
    const [isShowJoin, setIsShowJoin] = useState<boolean>(false)
    const [isShowCreate, setIsShowCreate] = useState<boolean>(false)

    const handleClickJoinGame = ((game_url: string) => {
        setSelectedGameURL(game_url)
        setSelectedGame(gameList?.filter((game) => game.game_url === game_url)[0])
        setIsShowJoin(true)
        setIsShowCreate(false)
    });


    const requestGameList = (query = ""): void => {
        const request = {
            type: "request_game_list",
            message: query,
        }
        sendMessage(JSON.stringify(request))
    }

    // load game list on component mount
    useEffect(() => {
        requestGameList()
        // eslint-disable-next-line
    }, [])

    // JSX Elements
    const GamePapers = () => {

        return (
            <div>
                {gameList?.map((game: any) => (
                    <Paper style={styles.Paper} key={game["game_url"]} elevation={3}>
                        <div style={styles.gameDetailContainer}>
                            <div>
                                <a href={`${game["game_url"]}`}>
                                    <h3 className="game-name" style={styles.gameName}>{game["game_name"] ? game["game_name"] : game["game_url"]}</h3>
                                </a>
                                <p className="creation-time" style={styles.creationTime}>Started: {FormatDate(game["created_at"])}</p>
                                <h4 className="player-list-header" style={styles.playerListHeader}>Players:</h4>
                                <ul className="player-list" style={styles.playerList}>
                                    {game["players"].map((player: any) => <li key={player.id} style={styles.playerListItem}>{player.name ? player.name : "Anonymous"}</li>)}
                                </ul>
                            </div>
                            <div style={styles.joinButtonContainer}>
                                <Button variant="contained" size="small" style={styles.JoinButton} onClick={() => { handleClickJoinGame(game["game_url"]) }}>Join</Button>
                            </div>
                        </div>
                    </Paper>))}
            </div>
        )
    };

    const CreateGameButton = () => {
        const handleCreateGameClick = useCallback(() => {
            setIsShowCreate(true)
            setIsShowJoin(true)
        }, []);

        return (
            <Button id="create-game" size="small" variant="outlined" onClick={handleCreateGameClick} style={styles.disconnectButton}>
                Create Game
            </Button>
        )
    };

    const RefreshButton = () => {

        const handleRefreshClick = useCallback(() => { // callback needed when this message varies
            requestGameList()
        }, []);

        return (
            <Button id="refresh" size="small" variant="outlined" onClick={handleRefreshClick} style={styles.refreshButton}>
                Refresh
            </Button>
        )
    };

    // Username input state management
    const usernameRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const gameNameRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const handleReadyClick = () => {
        if (isShowCreate) {
            const create_game_request = JSON.stringify({
                type: "create_game",
                message: {
                    gameName: gameNameRef.current.value,
                    username: usernameRef.current.value,
                },
            })
            sendMessage(create_game_request)
        } else if (isShowJoin) {
            const add_player_request = JSON.stringify({
                type: "add_player",
                message: {
                    "game_url": selectedGameURL,
                    "username": usernameRef.current.value,
                },
            })

            sendMessage(add_player_request)
        }
        setIsShowJoin(false)
    }

    return (
        <div>
            <h1 style={styles.title}>splndr.io</h1>
            {isShowJoin ?
                <div style={styles.TextInput}>
                    <form onSubmit={handleReadyClick} onReset={() => setIsShowJoin(false)}>
                        <label htmlFor='game-name'>Game Name
                            <input
                                id="game-name"
                                disabled={!isShowCreate}
                                type="text"
                                ref={gameNameRef} />
                        </label>
                        <label>Username
                            <input
                                id="username"
                                type="text"
                                ref={usernameRef} />
                        </label>
                        <Button type="submit" variant="contained">Ready</Button>
                        <Button type="reset" variant="contained" color="error">Cancel</Button>
                    </form>
                </div> :
                <></>
            }
            <div className="game-list-container" style={styles.gameListContainer}>
                <RefreshButton />
                <CreateGameButton />
                <GamePapers />
            </div>

        </div>
    )
}

export default GameList