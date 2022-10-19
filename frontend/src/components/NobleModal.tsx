import React from "react";
import { Portal, Button } from "@mui/material";
import { MoveType, NobleType } from './types'
import { useParams } from 'react-router-dom'
import Noble from "./Noble";


interface Props {
    className?: string,
    container: HTMLElement | null,
    sendMessage: Function,
    noble: NobleType,
    setShow: Function,
    children?: React.ReactElement;
}

export const NobleModal: React.FC<Props> = ({ className, container, sendMessage, noble, setShow, children, }) => {
    const { game_url, player_id } = useParams();

    const handleBuyClick: React.MouseEventHandler<HTMLAnchorElement> = () => {
        const move: MoveType = {
            gemsToDraw: "",
            cardToPurchase: noble.id,
            cardToReserve: "",
        }

        console.log(noble.cost)

        const request = {
            type: "player_move",
            message: {
                "game_url": game_url,
                "player": player_id,
                move,
            },
        }
        sendMessage(JSON.stringify(request))
        setShow(false)
    }

    return (
        <Portal container={document.querySelector(".board")}>
            <div className='game-modal modal'>

                <div>
                    <Button href="" variant="contained" size="large" onClick={handleBuyClick}>Buy</Button>
                </div>

                <Noble className="zoomed" sendMessage={sendMessage} noble={noble}></Noble>

            </div>
        </Portal >
    )
}