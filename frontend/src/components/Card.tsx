import React, { useState } from 'react'
import { CardType } from './types'
import { CARD_COLORS, parseGems, romanize } from '../utils'
import { CardModal } from './CardModal'

interface propsType {
    card: CardType,
    className?: string,
    sendMessage: Function,
}

const Card: React.FC<propsType> = ({ card, className, sendMessage }) => {

    const [showCardClicked, setShowCardClicked] = useState<boolean>(false);

    const handleCardClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
        // e.preventDefault()
        setShowCardClicked(!showCardClicked)
    }

    const cost = parseGems(card.cost.slice(0, 9)).map((cost, i) => {
        return (cost > 0 && (
            <div className={`${CARD_COLORS[i + 1]?.string}`} key={i}>
                {cost}
            </div>
        ))
    })

    const points = (card.points > 0) ? romanize(card.points) : " "

    return (
        <div
            key={card.id}
            id={card.id}
            className={`card ${className} ${CARD_COLORS[card.color].string}`}
            onClick={(e) => handleCardClick(e)}>

            <div className="cost">
                {cost}
            </div>

            <div className="points">
                <div>{points}</div>
            </div>

            {showCardClicked &&
                <CardModal className={className}
                    container={document.querySelector(".board")}
                    sendMessage={sendMessage}
                    card={card}
                    setShow={setShowCardClicked} />
            }

        </div >
    )
}

export default Card