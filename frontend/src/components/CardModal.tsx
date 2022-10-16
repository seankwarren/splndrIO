import React from "react";
import { Portal, Button } from "@mui/material";
import { MoveType, CardType } from './types'
import { useParams } from 'react-router-dom'
import { CARD_COLORS, parseGems, romanize } from "../utils";


interface propsType {
    className?: string,
    container: HTMLElement | null,
    sendMessage: Function,
    card: CardType,
    setShowCardClicked: Function,
}

export const CardModal: React.FC<propsType> = ({ className, container, sendMessage, card, setShowCardClicked }) => {
    const { game_url, player_id } = useParams();

    const handleBuyClick: React.MouseEventHandler<HTMLAnchorElement> = () => {
        const move: MoveType = {
            gemsToDraw: "",
            cardToPurchase: card.id,
            cardToReserve: "",
        }

        console.log(card.cost)

        const request = {
            type: "player_move",
            message: {
                "game_url": game_url,
                "player": player_id,
                move,
            },
        }
        sendMessage(JSON.stringify(request))
        setShowCardClicked(false)
    }

    const handleReserveClick: React.MouseEventHandler<HTMLAnchorElement> = () => {
        const move: MoveType = {
            gemsToDraw: "",
            cardToPurchase: "",
            cardToReserve: card.id,
        }

        const request = {
            type: "player_move",
            message: {
                "game_url": game_url,
                "player": player_id,
                move,
            },
        }
        sendMessage(JSON.stringify(request))
        setShowCardClicked(false)
    }
    return (
        <Portal container={document.querySelector(".board")}>
            <div className='card-buy-reserve'>
                <div>
                    <Button href="" variant="contained" size="large" onClick={handleBuyClick}>Buy</Button>
                    <Button href="" variant="contained" size="large" onClick={handleReserveClick}>Reserve</Button>
                </div>
                {/* <div style={{ flexBasis: "100%", height: 0 }}></div> */}
                <div key={card.id} id={card.id} className={`card ${className} ${CARD_COLORS[card.color].string}`}>
                    <div className="card-cost">
                        {parseGems(card.cost.slice(0, 9))
                            .map((cost, i) => {
                                const color = CARD_COLORS[i + 1]?.string
                                return (
                                    cost > 0 && (
                                        <div className={`${color}`} key={i}>
                                            {cost}
                                        </div>
                                    )
                                )
                            })
                        }
                    </div>
                    <div className="card-points">
                        {(card.points > 0) ? romanize(card.points) : " "}
                    </div>
                </div >
            </div>
        </Portal>
    )
}