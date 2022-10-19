import React, { useRef } from 'react'
import { Button, Portal } from '@mui/material'

interface Props {
    game_url: string,
    isCreating?: boolean,
    showJoin?: boolean,
    setShowJoin: Function,
    sendMessage: Function,
}

const FormModal: React.FC<Props> = ({ game_url, isCreating, showJoin, setShowJoin, sendMessage }) => {


    const usernameRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const gameNameRef = useRef() as React.MutableRefObject<HTMLInputElement>;


    const handleReadyClick = (e: any) => {
        e.preventDefault()
        if (isCreating) {
            requestCreateGame()
        } else if (showJoin) {
            requestAddPlayer()
        }
        setShowJoin(false)
    }

    const requestCreateGame = () => {
        const create_game_request = JSON.stringify({
            type: "create_game",
            message: {
                gameName: gameNameRef.current.value,
                username: usernameRef.current.value,
            },
        })
        sendMessage(create_game_request)
    }

    const requestAddPlayer = () => {
        const add_player_request = JSON.stringify({
            type: "add_player",
            message: {
                "game_url": game_url,
                "username": usernameRef.current.value,
            },
        })
        sendMessage(add_player_request)
    }

    return (
        <Portal container={document.querySelector("#root")}>
            <div className='form-container modal'>
                <form className="form" onSubmit={handleReadyClick} onReset={() => setShowJoin(false)}>
                    {/* <label htmlFor='game-name-form'>Game Name</label> */}
                    {isCreating && (
                        <input
                            id="game-name-form"
                            className='form-input'
                            disabled={!isCreating}
                            type="text"
                            placeholder="Game name"
                            ref={gameNameRef} />
                    )}
                    {/* <label htmlFor='username-form'>Username</label> */}
                    <input
                        className='form-input'
                        id="username-form"
                        type="text"
                        placeholder='Anonymous'
                        ref={usernameRef} />

                    <Button type="submit" variant="contained">Ready</Button>
                    <Button type="reset" variant="contained" color="error">Cancel</Button>
                </form>
            </div>
        </Portal>
    )
}

export default FormModal