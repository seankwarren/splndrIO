import React, { useState, useRef } from 'react'
import { BoardType } from './types'
import Card from './Card'
import Noble from './Noble'
import { click } from '@testing-library/user-event/dist/click'

interface propsType {
    key?: number,
    board?: BoardType
}

const styles = {
    board: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gridRow: "1 / 2",
    },

    boardCard: {
        display: "flex",
        backgroundColor: "#444",
        color: "#fff",
        borderRadius: 5,
        padding: 0,
        fontSize: "70%",
        width: 80,
        height: 100,
        justifyContent: "center",
        alignItems: "center",
    },
    boardContainer: {
        display: "grid",
        gridTemplateColumns: "repeat(4, 80px)",
        gridGap: 5,
        backgroundColor: "#fff",
        color: "#444",
        marginRight: 0,
    },
    levelOne: {
        gridRow: "4 / 5",
    },
    levelTwo: {
        gridRow: "3 / 4",
    },
    levelThree: {
        gridRow: "2 / 3",
    },
    boardNoble: {
        display: "flex",
        gridRow: "1 / 2",
        backgroundColor: "#e6c73e",
        color: "#fff",
        borderRadius: 5,
        padding: 0,
        fontSize: "70%",
        width: 80,
        height: 100,
        justifyContent: "center",
        alignItems: "center",
    }
}

const Board: React.FC<propsType> = ({ board }) => {

    const [clickedCard, setClickedCard] = useState<string | undefined>()

    const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
        console.log("clicked", e.currentTarget.id)
        setClickedCard(e.currentTarget.id)
    }

    return (
        <div className="board" style={styles.board}>
            <div className="board-container" style={styles.boardContainer}>
                {board?.cards.map((card, i) => {
                    let level = ""
                    let style = {}
                    switch (card.level) {
                        case 1:
                            level = "level-one"
                            style = { ...styles.levelOne, ...styles.boardCard }
                            break;
                        case 2:
                            level = "level-two"
                            style = { ...styles.levelTwo, ...styles.boardCard }
                            break;
                        case 3:
                            level = "level-three"
                            style = { ...styles.levelThree, ...styles.boardCard }
                            break;
                        default:
                            level = ""
                    }
                    return (
                        <Card
                            className={`board-card ${level}`}
                            style={style}
                            key={i}
                            card={card}
                            handleClick={handleClick} />
                    )
                })}

                {board?.nobles.map((noble, i) => {
                    return <Noble className="board-noble" style={styles.boardNoble} key={i} noble={noble}></Noble>
                })}
            </div>
        </div>
    )
}

export default Board