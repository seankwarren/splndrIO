import React, { useState } from 'react'
import { NobleType } from './types'
import { parseGems, CARD_COLORS, romanize } from '../utils'
import { NobleModal } from './NobleModal'

interface propsType {
    key?: number,
    noble: NobleType,
    className?: string,
    sendMessage: Function,
    useModal?: boolean,
}

const Noble: React.FC<propsType> = ({ noble, className, sendMessage, useModal = true }) => {

    const [showNobleClicked, setShowNobleClicked] = useState<boolean>(false);

    const handleNobleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
        setShowNobleClicked(!showNobleClicked)
    }

    const cost = parseGems(noble.cost.slice(0, 9)).map((cost, i) => {
        return (
            cost > 0 && (
                <div className={`${CARD_COLORS[i + 1]?.string}`} key={i}>
                    {cost}
                </div>
            )
        )
    })

    const points = (noble.points > 0) ? romanize(noble.points) : " "

    return (
        <div id={noble.id} className={`noble card ${className}`} onClick={handleNobleClick}>
            <div className="cost">
                {cost}
            </div>
            <div className="points">
                <div>{points}</div>
            </div>
            {showNobleClicked && (
                <NobleModal className={className}
                    container={document.querySelector(".board")}
                    sendMessage={sendMessage}
                    noble={noble}
                    setShow={setShowNobleClicked}></NobleModal>
            )}
        </div>
    )
}

export default Noble