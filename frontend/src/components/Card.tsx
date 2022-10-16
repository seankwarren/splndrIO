import React, { useState } from 'react'
import { CardType, MoveType } from './types'
import { CARD_COLORS, parseGems, romanize } from '../utils'
import { Portal, Button } from '@mui/material'
import { CardModal } from './CardModal'

interface propsType {
    card: CardType,
    className?: string,
    sendMessage: Function,
}

const Card: React.FC<propsType> = ({ card, className, sendMessage }) => {

    const [showCardClicked, setShowCardClicked] = useState<boolean>(false);

    const handleCardClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
        setShowCardClicked(!showCardClicked)
    }

    return (
        <div key={card.id} id={card.id} className={`card ${className} ${CARD_COLORS[card.color].string}`} onClick={(e) => handleCardClick(e)}>
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
            {showCardClicked && (
                <CardModal className={className} container={document.querySelector(".board")} sendMessage={sendMessage} card={card} setShowCardClicked={setShowCardClicked} />
            )}
        </div >
    )
}

export default Card