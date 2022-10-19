import React from 'react'
import { DeckType } from './types'
import { romanize } from '../utils'

interface propsType {
    deck?: DeckType,
}

const Deck: React.FC<propsType> = ({ deck }) => {
    return (
        <div className={`deck level-${deck?.level}`}>
            <div className={`deck-label level-${deck?.level}`}>
                {/* {romanize(deck?.level)} */}
                splndr
            </div>
        </div>
    )
}

export default Deck