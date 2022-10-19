import React from 'react'
import { CARD_COLORS, getPlayerPoints, getPurchasingPower } from '../utils'
import Card from './Card'
import { PlayerType } from './types'

interface propsType {
    key?: number,
    className?: string,
    player: PlayerType | undefined,
}

const Player: React.FC<propsType> = ({ player, key, className }) => {

    const { deckValue, gemValue } = getPurchasingPower(player)

    const bank_elem = deckValue?.map((deckValue, i) => {
        return (
            <div key={i} className={`player-bank-gem`} >
                <div className={`bank-gem-value ${CARD_COLORS[i + 1]?.string}`}>
                    {gemValue[i]}
                </div>
                <div className={`bank-deck-value ${CARD_COLORS[i + 1]?.string}`}>
                    {`+${deckValue}`}
                </div>
            </div>
        )
    })

    const reserved_deck = player?.deck[0].cards.map((card) => {
        return card.isReserved && (
            <div className='player-card-container'>
                <Card card={card} className="player-card" sendMessage={() => { }}></Card>
            </div>
        )
    })

    return (
        <div key={key} className={`player ${className}`}>
            <div className='player-info'>
                <div className='player-name'>
                    {player?.name ? player?.name + ':' : "Anonymous:"}
                </div>
                <div className='player-points'>
                    {getPlayerPoints(player)}
                </div>
                {/* {player?.turn} */}
            </div>
            <div className='player-bank'>
                {bank_elem}
            </div>
            <div className='reserved-deck'>
                {reserved_deck}
            </div>

        </div>
    )
}

export default Player