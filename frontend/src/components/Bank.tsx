import React, { useEffect, useState } from 'react'
import { BankType, PlayerType } from './types'
import { CARD_COLORS, parseGems } from '../utils'
import BankModal from './BankModal';

interface Props {
    key?: number,
    bank?: BankType,
    className?: string,
    sendMessage: Function,
    player?: PlayerType,
    overrideGems?: string,
    isModal?: boolean,
    selectedGems?: number[],
    setSelectedGems?: Function,
    disabledGems?: number[],
}

const Bank: React.FC<Props> = ({ bank, sendMessage, className, player, overrideGems, isModal, selectedGems, setSelectedGems, disabledGems }) => {

    const [showBankClicked, setShowBankClicked] = useState<boolean>(false);

    const handleBankClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
        // e.preventDefault()
        if (!overrideGems) { setShowBankClicked(true); return }
    }

    const handleCloseModalClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
        e.stopPropagation()
        setShowBankClicked(false)
    }

    // useEffect(() => {
    //     console.log("changed")
    //     if (!setSelectedGems) return
    //     setSelectedGems(selectedGems)
    //     setShowBankClicked(showBankClicked)
    // }, [selectedGems])

    const handleGemClick = (e: any, color: number) => {
        if (!selectedGems || !setSelectedGems) return
        if (disabledGems?.[color - 1]) return
        // e.preventDefault()
        // console.log(selectedGems)
        const newSelectedGems = [...selectedGems]
        newSelectedGems?.splice(color - 1, 1, selectedGems[color - 1] + 1)
        setSelectedGems(newSelectedGems)
    }

    let gems = overrideGems ? overrideGems : bank?.gems

    const Gems = () => {
        if (overrideGems) gems = gems?.slice(0, -1)
        return (
            <>
                {parseGems(gems)?.map((cost: number, i) => {
                    const color = CARD_COLORS[i + 1]?.string
                    const isDisabled = disabledGems?.[i]
                    const disableClass = isDisabled && "disabled"
                    return (
                        (isModal) ? (
                            <div key={i} className={`${color} bank-gems hover-zoom ${disableClass}`} onClick={(e) => handleGemClick(e, i + 1)
                            }>
                                {cost}
                            </div>

                        ) : (
                            <div key={i} className={`${color} bank-gems hover-zoom`} >
                                {cost}
                            </div>
                        )
                    )
                })}
            </>
        )
    }

    return (
        <div className={`bank-container ${className}`} onClick={handleBankClick}>
            <div className="bank">
                <Gems />
            </div>
            {
                showBankClicked &&
                <BankModal
                    bank={bank}
                    player={player}
                    sendMessage={sendMessage}
                    handleClose={handleCloseModalClick} />
            }
        </div >
    )
}

export default Bank