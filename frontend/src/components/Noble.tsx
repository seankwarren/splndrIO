import React from 'react'
import { NobleType } from './types'
import { parseGems, CARD_COLORS, romanize } from '../utils'

interface propsType {
    key?: number,
    noble: NobleType,
    className?: string,
    handleClick?: React.MouseEventHandler<HTMLDivElement> | undefined,
}

const Noble: React.FC<propsType> = ({ noble, className, handleClick }) => {

    const style = { "gridRow": "1 / 2" }

    return (
        <div id={noble.id} className={`noble ${className}`} style={style} onClick={handleClick}>
            <div className="noble-cost">
                {parseGems(noble.cost.slice(0, 9)).map((cost, i) => {

                    const color = CARD_COLORS[i + 1]?.string
                    return (
                        cost > 0 ? (
                            <div className={`${color}`} key={i}>
                                {cost}
                            </div>
                        ) : (null)
                    )
                })}
            </div>
            <div className="noble-points">
                {(noble.points > 0) ? romanize(noble.points) : " "}
            </div>
        </div>
    )
}

export default Noble