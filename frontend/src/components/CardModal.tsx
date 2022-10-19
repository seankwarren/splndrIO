import React, { useState, useEffect } from "react";
import { Portal, Button } from "@mui/material";
import { MoveType, CardType } from './types'
import { useParams } from 'react-router-dom'
import Card from "./Card";


interface propsType {
    className?: string,
    container: HTMLElement | null,
    sendMessage: Function,
    card: CardType,
    setShow: Function,
}

export const CardModal: React.FC<propsType> = ({ className, container, sendMessage, card, setShow }) => {
    const { game_url, player_id } = useParams();

    const blankMove = {
        gemsToDraw: "",
        cardToPurchase: "",
        cardToReserve: "",
    }


    //
    const handleBuyClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
        const move = {
            gemsToDraw: "",
            cardToPurchase: card.id,
            cardToReserve: "",
        } as MoveType

        sendMove(move)
        setShow(false)
    }

    const handleReserveClick: React.MouseEventHandler<HTMLAnchorElement> = () => {
        const move = {
            gemsToDraw: "",
            cardToPurchase: "",
            cardToReserve: card.id,
        } as MoveType
        sendMove(move)
        setShow(false)
    }

    const sendMove = (move: MoveType) => {
        const request = {
            type: "player_move",
            message: {
                "game_url": game_url,
                "player": player_id,
                "move": move,
            },
        }
        sendMessage(JSON.stringify(request))
    }

    return (
        <Portal container={document.querySelector(".board")}>
            <div className='game-modal modal'>

                <div>
                    <Button href="" variant="contained" size="large" onClick={handleBuyClick}>Buy</Button>
                    <Button href="" variant="contained" size="large" onClick={handleReserveClick}>Reserve</Button>
                </div>

                <Card className="board-card zoomed" sendMessage={sendMessage} card={card} />

            </div>
        </Portal>
    )
}