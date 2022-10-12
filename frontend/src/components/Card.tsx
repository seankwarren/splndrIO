import React from 'react'
import { CardType } from './types'
import { CARD_COLORS } from '../utils'

interface propsType {
    key?: number,
    card: CardType,
    className?: string,
    style?: any,
    handleClick?: React.MouseEventHandler<HTMLDivElement>,
}

const Card: React.FC<propsType> = ({ className, card, style, handleClick }) => {


    return (
        <div id={card.id} className={className} style={{ ...style, ...{ "backgroundColor": CARD_COLORS[card.color].hex } }} onClick={handleClick} >
            {card.cost.slice(0, 9)}
            < br />
            points: {card.points}
        </div >
    )
}

export default Card