import React, { useState } from 'react'
import { BoardType, DeckType, MoveType } from './types'
import Card from './Card'
import Noble from './Noble'
import Deck from './Deck'
import { GameType } from './types'

interface propsType {
    key?: number,
    game?: GameType,
    sendMessage: Function,
}

const Board: React.FC<propsType> = ({ key, game, sendMessage }) => {

    return (
        <div className="board" >
            <div className="board-container" >
                <span className='grid-filler'></span>
                {game?.decks?.map((deck, i) => {
                    return <Deck key={i} deck={deck} />
                })}
                {game?.board[0]?.cards.map((card, i) => {
                    let level = ""
                    switch (card.level) {
                        case 1:
                            level = "level-one"
                            break;
                        case 2:
                            level = "level-two"
                            break;
                        case 3:
                            level = "level-three"
                            break;
                        default:
                            level = ""
                    }
                    return (
                        <Card
                            className={`board-card ${level}`}
                            card={card}
                            sendMessage={sendMessage} />
                    )
                })}

                {game?.board[0]?.nobles.map((noble, i) => {
                    return <Noble className="board-noble" key={i} noble={noble}></Noble>
                })}
            </div>
        </div>
    )
}

export default Board