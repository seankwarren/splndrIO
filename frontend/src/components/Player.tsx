import React from 'react'
import { CARD_COLORS, getPlayerPoints, getPurchasingPower } from '../utils'
import { PlayerType } from './types'

interface propsType {
    key?: number,
    className?: string,
    player: PlayerType | undefined,
}

const Player: React.FC<propsType> = ({ player, key, className }) => {

    const { deckValue, gemValue } = getPurchasingPower(player)

    const bank_str = deckValue?.map((deckValue, i) => {
        return (
            <>
                <div className={`bank-gem-value ${CARD_COLORS[i + 1]?.string}`}>
                    {gemValue[i]}
                </div>
                <div className={`bank-deck-value ${CARD_COLORS[i + 1]?.string}`}>
                    {`+${deckValue}`}
                </div>
            </>
        )
    })

    const bank_elem = bank_str?.map((str, i) => {
        return <div key={i} className={`player-bank-gem`} >{str}</div>
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
            </div>

            <div className='player-bank'>
                {bank_elem}
            </div>

        </div>
    )
}

export default Player