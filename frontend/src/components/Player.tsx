import React from 'react'
import { PlayerType } from './types'

interface propsType {
    key?: number,
    player: PlayerType,
}

const getPoints = (player: PlayerType): number => {
    if (!player) return 0

    let points = 0;
    player?.deck?.cards?.map((card) => {
        return () => points += card.points
    })
    return points
}


const Player: React.FC<propsType> = (props) => {

    const player = props.player
    const bank = player.bank[0];

    console.log("player:", bank)

    return (
        <>
            <br />
            <div>Player: {player.name}</div>
            <div>{bank.gems}</div>
            <div>points: {getPoints(player)}</div>
            <br />
        </>
    )
}

export default Player