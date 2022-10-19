import Button from '@mui/material/Button';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import useCustomWebSocket from '../hooks/useCustomWebsocket';
import { FormatDate } from '../utils';
import FormModal from './FormModal';
import { GameType } from './types';

interface propsType {
    gameList?: GameType[]
}

const GameList: React.FC<propsType> = (props) => {

    // allow redirect
    const navigate = useNavigate();


    // websocket connection and handling
    const { sendMessage, readyState, response } = useCustomWebSocket('ws://127.0.0.1:8000/games/')

    // manage game list state
    const [gameList, setGameList] = useState<GameType[] | undefined>([])
    const [selectedGameURL, setSelectedGameURL] = useState<string | undefined>()

    // update game list whenever websocket sends new response
    useEffect(() => {
        const type = response?.type
        const message = JSON.stringify(response?.message)
        switch (type) {
            case 'request_game_list':
                setGameList(JSON.parse(message))
                break;
            case 'create_game':
                setGameList((gameList) => gameList?.concat(JSON.parse(message)))
                navigate("/games/" + JSON.parse(message)["game_url"] + "/" + JSON.parse(message).current_player[0].id)
                break;
            case 'add_player':
                navigate("/games/" + selectedGameURL + "/" + JSON.parse(message))
                break;
            default:
                console.log(`Unknown message type ${type}`)
        }
    }, [response, navigate, selectedGameURL])


    // Event Handlers
    const [showJoin, setShowJoin] = useState<boolean>(false)
    const [isCreating, setIsCreating] = useState<boolean>(false)

    const handleClickJoinGame = ((game_url: string) => {
        setSelectedGameURL(game_url)
        setShowJoin(!showJoin)
        setIsCreating(false)
        console.log("clicked")
    });

    // load game list on component mount
    useEffect(() => {
        requestGameList()
        // eslint-disable-next-line
    }, [])

    // Websocket requests
    const requestGameList = (query = ""): void => {
        const request = {
            type: "request_game_list",
            message: query,
        }
        sendMessage(JSON.stringify(request))
    }

    // JSX Elements
    const GamePapers = () => {

        return (
            <div className="game-list-container">
                {/* onClick={() => setShowJoin(!showJoin)} */}
                {gameList?.map((game: any) => (
                    <div className="game-list-item-wrapper" key={game["game_url"]}>
                        <div className="game-list-item" >
                            <div className="game-list-item-detail">
                                <a href={`games/${game["game_url"]}`}>
                                    <h3 className="game-name" >{game["game_name"] ? game["game_name"] : game["game_url"]}</h3>
                                </a>
                                <p className="creation-time" >Started: {FormatDate(game["created_at"])}</p>
                                <ul className="player-list" >
                                    {game["players"].slice(0, 4).map((player: any) =>
                                        <li className="player-list-item" key={player.id}>
                                            {player.name ? player.name : "Anonymous"}
                                        </li>)}
                                </ul>
                            </div>
                            <div className="join-game" >
                                <Button variant="contained" size="small" onClick={() => { handleClickJoinGame(game["game_url"]) }}>Join</Button>
                            </div>
                        </div>
                    </div>))}
                {showJoin && (
                    <FormModal game_url={selectedGameURL as string}
                        isCreating={isCreating}
                        showJoin={showJoin}
                        setShowJoin={setShowJoin}
                        sendMessage={sendMessage}></FormModal>
                )}
            </div>
        )
    };

    const CreateGameButton = () => {
        const handleCreateGameClick = useCallback(() => {
            setIsCreating(true)
            setShowJoin(true)
        }, []);

        return (
            <Button id="create-game" size="small" variant="contained" onClick={handleCreateGameClick}>
                Create Game
            </Button>
        )
    };

    const RefreshButton = () => {

        const handleRefreshClick = useCallback(() => { // callback needed when this message varies
            requestGameList()
        }, []);

        return (
            <Button id="refresh" size="small" variant="contained" onClick={handleRefreshClick}>
                Refresh
            </Button>
        )
    };


    return (
        <div>
            <div className="header">
                <h1 className="title">splndr.io</h1>
            </div>
            <div className="wrapper">
                <div className='game-list-buttons'>
                    <RefreshButton />
                    <CreateGameButton />
                </div>
                <GamePapers />
            </div>

        </div>
    )
}

export default GameList