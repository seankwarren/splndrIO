import React from 'react'
import { BankType } from './types'

interface propsType {
    key?: number,
    bank?: BankType,
}

const Bank: React.FC<propsType> = ({ bank }) => {

    return (
        <div>Bank: {bank?.gems}</div>
    )
}

export default Bank