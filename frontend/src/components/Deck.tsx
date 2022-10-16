import React from 'react'
import { DeckType } from './types'
import { romanize } from '../utils'

interface propsType {
    key?: number,
    deck?: DeckType,
}

const Deck: React.FC<propsType> = ({ deck }) => {

    let level = ""

    switch (deck?.level) {
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
        <div className={`deck ${level}`}>
            <div className={`deck-label ${level}`}>
                {romanize(deck?.level)}
            </div>
        </div>
    )
}

export default Deck