import React from 'react'
import { DeckType } from './types'
import Card from './Card'

interface propsType {
    key?: number,
    deck?: DeckType,
}

const styles = {
    deck: {
        display: "flex",
        color: "#fff",
        borderRadius: 5,
        padding: 0,
        fontSize: "70%",
        width: 80,
        height: 100,
        justifyContent: "center",
        alignItems: "center",
    },
    levelOne: {
        gridRow: "4 / 5",
        backgroundColor: "#4287f5",
    },
    levelTwo: {
        gridRow: "3 / 4",
        backgroundColor: "#2b993f",
    },
    levelThree: {
        gridRow: "2 / 3",
        backgroundColor: "#bd892a",
    },
}

const Deck: React.FC<propsType> = ({ deck }) => {

    // const cards = deck?.cards?.map((card, i) => {
    //     return <Card key={i} card={card}></Card>
    // })
    let level = ""
    let style = {}

    switch (deck?.level) {
        case 1:
            level = "level-one"
            style = styles.levelOne
            break;
        case 2:
            level = "level-two"
            style = styles.levelTwo
            break;
        case 3:
            level = "level-three"
            style = styles.levelThree
            break;
        default:
            level = ""
    }

    style = { ...style, ...styles.deck }

    return (
        <div className={`deck ${level}`} style={style}>Deck: {deck?.level}</div>
    )
}

export default Deck