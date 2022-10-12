import React from 'react'
import { NobleType } from './types'

interface propsType {
    key?: number,
    noble: NobleType,
    style?: any,
    className?: string,
}

const Noble: React.FC<propsType> = ({ noble, style, className }) => {


    return (
        <div className={className} style={style}>
            {noble.cost.slice(0, 9)}
            <br />
            points:{noble.points}
        </div>
    )
}

export default Noble