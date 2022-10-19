import { Portal, Button } from '@mui/material'
import { maxHeaderSize } from 'http';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { all, max, parseGems, sum } from '../utils';
import Bank from './Bank';
import { BankType, PlayerType, MoveType } from './types';

interface Props {
    bank?: BankType;
    player?: PlayerType;
    sendMessage: Function;
    handleClose: React.MouseEventHandler;
}

const BankModal: React.FC<Props> = ({ bank, player, sendMessage, handleClose }) => {

    const { game_url, player_id } = useParams();

    const [selectedGems, setSelectedGems] = useState<number[]>([0, 0, 0, 0, 0, 0])

    const getDisabledGems = () => {
        const total = sum(selectedGems)
        const max_ = max(selectedGems)
        const bank_gems = parseGems(bank?.gems)

        let res: number[] = []
        if (total > 2 || max_ > 1) {
            res = [1, 1, 1, 1, 1, 1]
        }
        else if (total <= 1) {
            res = selectedGems.map((selected, i) => (selected <= bank_gems[i] - 1) ? 0 : 1)
        }
        else if (total === 2) {
            res = selectedGems.map((gems, i) => (!gems || gems <= bank_gems[i] - 1) ? 0 : 1)
        }
        return res
    }

    let disabledGems = getDisabledGems()

    useEffect(() => {
        disabledGems = getDisabledGems()
    }, [])

    const handleTakeClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
        const move = {
            gemsToDraw: selectedGems.toString(),
            cardToPurchase: "",
            cardToReserve: ""
        }
        handleClose(e)
        sendMove(move)
    }

    const sendMove = (move: MoveType) => {
        const request = {
            type: "player_move",
            message: {
                "game_url": game_url,
                "player": player_id,
                move,
            },
        }
        sendMessage(JSON.stringify(request))
    }

    return (
        <Portal container={document.querySelector(".board")}>
            <div className='game-modal modal'>
                <div>
                    <Button href="" disabled={!all(disabledGems)} variant="contained" size="large" onClick={handleTakeClick}>Take</Button>
                    <Button href="" color="error" variant="contained" size="large" onClick={handleClose}>Cancel</Button>
                </div>
                <Bank className="bank-modal"
                    sendMessage={sendMessage}
                    overrideGems={selectedGems.toString()}
                    isModal={true}
                    selectedGems={selectedGems}
                    setSelectedGems={setSelectedGems}
                    disabledGems={disabledGems} />
            </div>
        </Portal>
    )
}

export default BankModal