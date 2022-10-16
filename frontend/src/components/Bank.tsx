import React from 'react'
import { BankType } from './types'
import { CARD_COLORS, parseGems } from '../utils'

interface propsType {
    key?: number,
    bank?: BankType,
}

const Bank: React.FC<propsType> = ({ bank }) => {
    const gems = parseGems(bank?.gems)
    return (
        <div className="bank-container">
            <div className="bank">
                {gems?.map((cost: number, i) => {
                    const color = CARD_COLORS[i + 1]?.string
                    return <div key={i} className={`${color} bank-gems`}>{cost}</div>
                })}
            </div>
        </div>
    )
}

export default Bank