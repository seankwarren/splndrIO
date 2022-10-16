import React, { useEffect, useState } from 'react'
import { CARD_COLORS } from '../utils'
import { PlayerType } from './types'

interface propsType {
    key?: number,
    player: PlayerType | undefined,
}

const getPoints = (player: PlayerType | undefined): number => {
    if (!player) return 0
    const points = player?.deck[0].cards
        .map((card) => card.points)
        .reduce((partialSum, a) => partialSum + a, 0)

    return points
}


const getDeckValue = (player: PlayerType | undefined) => {
    if (!player) return {}
    let deckValue = [0, 0, 0, 0, 0, 0]
    for (const card of player?.deck[0].cards) {
        // console.log(card.color)
        deckValue[card.color - 1] += 1
    }
    const gemValue = player.bank[0].gems.split(',').map((num) => parseInt(num))

    return { deckValue, gemValue } as const
}


const Player: React.FC<propsType> = ({ player, key }) => {

    // const bank = player?.bank[0];

    const points = getPoints(player)
    const { deckValue, gemValue } = getDeckValue(player)

    const bank_str = deckValue?.map((deckValue, i) => {
        return `${gemValue[i]}+(${deckValue}) , `
    })

    return (
        <div key={key} className='player'>
            <>turn: {player?.turn}</>
            {/* <div>Player: {JSON.stringify(player)}</div> */}
            <div className='player-name'>Player: {player?.name} {player?.id}</div>
            <div className='player-points'>{points}</div>
            <div className='player-bank'>{
                bank_str?.map((str, i) => {
                    return <div className={`${CARD_COLORS[i + 1]?.string}`} >{str}</div>
                })
            }</div>
        </div>
    )
}

export default Player