import * as styled from 'styled-components';

const GlobalStyle = styled.createGlobalStyle`
    :root {
        --NavHeight: 70px;

        --bg: rgba(50, 181, 233, 1);
        --bg-darker: rgba(47, 140, 195, 0.7);

        --outline-1: #94bfff;
        --outline-2: #94ffb1;
        --outline-3: #ffe694;
        --outline-white: white;

        --fine-outline: black;

        --deck-1: white;
        --deck-2: white;
        --deck-3: white;

        --white: white;
        --blue: blue;
        --green: green;
        --red: red;
        --black: black;
        --gold: gold;
        --faded-blue: lightblue;
        --faded-green: lightgreen;
        --faded-red: lightpink;
        --faded-black: darkgray;
        --faded-purple: #c994ff;
        --trans-gray: rgba(50, 50, 50, 0.5);
        --semi-trans-gray: rgba(50, 50, 50, 0.35);

        --card-width: 100px;
        --card-height: 125px;

        --sm-emblem-size: 20px;
        --emblem-size: 25px;
        --big-emblem-size: 60px;

        --big-padding: 25px;
        --small-padding: 8px;
        --xs-padding: 3px;

        --sm-radius: 5px;
        --med-radius: 15px;

        --big-ft-sz: 1.5em;
        --med-ft-sz: 1.5em;
        --sm-ft-sz: 1.5em;
    }
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    html,
    body {
        scroll-behavior: smooth;
        background-color: var(--bg);
        height: 100%;
    }

    /* Nav Header */
    .header {
        /* Positioning */
        display: flex;
        align-items: center;
        position: fixed;
        z-index: 1000;

        /* Box sizing */
        height: calc(var(--NavHeight, 60px) - 10px);
        width: 100%;
        top: 0%;

        /* Color */
        background-color: var(--bg-darker);
        color: white;

        font-family: monospace;

        .title {
            /* font-family: monospace; */
            margin: auto 0;
        }
    }

    // Game page content container
    .container {
        display: flex;
        flex-flow: column;
        position: absolute;
        width: 100%; // window width
        top: var(--NavHeight);
        align-items: center;
        > .player-list {
            position: absolute;
            right: 0;
            top: 0;
        }
    }

    .board {
        width: fit-content;
        position: relative;
        background-color: #cccccc;
        border-radius: var(--med-radius);
        .board-container {
            display: grid;
            grid-template-columns:
                calc(var(--card-width) + var(--big-padding))
                repeat(4, var(--card-width));
            grid-template-rows:
                calc(var(--card-height) + var(--big-padding))
                repeat(3, var(--card-height));
            grid-gap: var(--big-padding);

            padding: var(--big-padding);
        }
    }

    // card representation (applies to nobles as well)
    .card {
        display: grid;
        grid-template-columns: 1fr var(--emblem-size);
        height: var(--card-height);
        width: var(--card-width);
        border: 1px solid var(--fine-outline);
        outline: var(--small-padding) solid var(--outline-white);

        font-family: monospace;
        font-weight: 900;
        color: white;
        -webkit-text-stroke: 1px black;
        padding: 5px;
        border-radius: var(--sm-radius);

        .cost {
            grid-column: 2;
            justify-self: right;
            align-self: end;
            padding: 0;
            border: none;
            text-align: center;

            * {
                border-radius: 50%;
                margin-top: var(--xs-padding);
                padding: 0px;
                font-size: var(--sm-ft-sz);
                font-weight: 900;
                width: var(--emblem-size);
                height: var(--emblem-size);
                line-height: var(--emblem-size);
                border: 1px solid var(--fine-outline);
            }
        }

        .points {
            display: flex;
            font-size: var(--med-ft-sz);
            background-color: #cccccc;
            border: 1px solid black;
            width: fit-content;
            height: fit-content;
            grid-row: 1;
            padding: var(--xs-padding) var(--small-padding);
            align-self: start;
            border-radius: var(--sm-radius);

            justify-content: center;
            align-content: center;
            flex-direction: column;
            * {
                vertical-align: middle;
                white-space: pre;
            }
        }
    }

    .deck {
        grid-column: 1 / 2;
        margin-right: var(--big-padding);
        align-items: center;
        display: grid;
        justify-content: center;
        width: var(--card-width);
        height: var(--card-height);
        border: 1px solid var(--fine-outline);
        background-color: var(--white);

        font-family: monospace;
        font-weight: 900;
        font-size: var(--m-ft-sz);
        color: white;
        -webkit-text-stroke: 2px black;
        paint-order: stroke fill;
        padding: 5px;
        border-radius: var(--sm-radius);

        .deck-label {
            border: none;
            font-size: 1.7em;
            color: darkgray;
            transform: rotate(-30deg);
        }
    }

    // Assign cards to correct row
    .grid-filler {
        border: none;
        grid-column: 1;
        grid-row: 1;
    }
    .board-card.noble {
        grid-row: 1;
    }
    .board-card.level-three {
        grid-row: 2;
    }
    .board-card.level-two {
        grid-row: 3;
    }
    .board-card.level-one {
        grid-row: 4;
    }
    .deck.level-3 {
        grid-row: 2 / 3;
        outline: var(--small-padding) solid var(--outline-3);
    }
    .deck.level-2 {
        grid-row: 3 / 4;
        outline: var(--small-padding) solid var(--outline-2);
    }
    .deck.level-1 {
        grid-row: 4 / 5;
        outline: var(--small-padding) solid var(--outline-1);
    }

    .bank {
        /* Grid and positioning */
        display: grid;
        grid-template-rows: 60px;
        grid-template-columns: repeat(6, 60px);
        grid-column-gap: var(--xs-padding);
        margin: auto;
        margin-bottom: var(--big-padding);
        padding: var(--small-padding);
        width: min-content;

        /* Colors */
        background-color: #e7e7e7;
        border-radius: 10px;
        color: white;

        /* fonts */
        font-family: 'Roboto Mono', monospace;
        font-size: 3em;
        font-weight: 900;
        -webkit-text-stroke: 3px black;
        paint-order: stroke fill;
        text-align: center;

        .bank-gems {
            /* Positioning */
            display: flex;
            align-items: center;
            justify-content: center;

            /* Size and shape */
            height: var(--big-emblem-size);
            width: var(--big-emblem-size);
            border-radius: 50%;

            font-family: monospace;
        }
    }

    .bank-modal > .bank {
        margin-top: 0;
        padding: var(--big-padding);
        grid-template-columns: repeat(5, 60px);
    }

    .player.current-turn {
        outline: 5px solid black;
    }

    .player {
        position: relative;
        z-index: 2000;
        display: grid;
        grid-auto-flow: column;
        margin-bottom: var(--big-padding);
        font-family: 'Roboto Mono', monospace;
        /* max-width: 130px; */
        background-color: #dddddd;
        font-weight: 900;
        padding: var(--small-padding);

        border-top-left-radius: var(--med-radius);
        border-bottom-left-radius: var(--med-radius);
        .player-info {
            display: flex;
            font-size: var(--med-ft-sz);
            align-items: center;
            justify-content: space-between;
            .player-points {
                margin-right: var(--small-padding);
                color: var(--white);
                font-size: var(--med-ft-sz);
                -webkit-text-stroke: 3px black;
                paint-order: stroke fill;
            }
        }
        .player-bank {
            justify-self: center;
            display: flex;
            grid-row: 2;
            /* flex-direction: column; */
            .player-bank-gem {
                margin-right: var(--xs-padding);
                justify-content: center;
                text-align: center;
                .bank-deck-value {
                    background-color: transparent;
                    -webkit-text-stroke: 2px black;
                    paint-order: stroke fill;
                }
                .bank-deck-value.white {
                    color: var(--white);
                }
                .bank-deck-value.blue {
                    color: var(--blue);
                }
                .bank-deck-value.green {
                    color: var(--green);
                }
                .bank-deck-value.red {
                    color: var(--red);
                }
                .bank-deck-value.black {
                    color: var(--black);
                    -webkit-text-stroke: 2px white;
                }
                .bank-deck-value.gold {
                    color: var(--gold);
                }
                .bank-gem-value {
                    color: white;
                    -webkit-text-stroke: 2px black;
                    paint-order: stroke fill;
                    width: var(--sm-emblem-size);
                    aspect-ratio: 1;
                    border-radius: 50%;
                }
            }
        }
    }

    .reserved-deck {
        position: relative;
        grid-row: 3;
        display: grid;
        direction: rtl;
        grid-auto-flow: column;
        justify-self: right;
    }

    .player-card-container:not(:first-child) {
        position: relative;
        margin-right: -70px;
    }
    .player-card-container:first-child {
        position: relative;
        margin-right: 0px;
    }
    .player-card {
        direction: ltr;
        transform: scale(0.6);
        position: relative;
        :hover {
            z-index: 2001;
            transition: 0.1s all;
            transform: scale(0.9);
        }
    }

    // GameList styling
    .wrapper {
        text-align: center;
        height: 100%;
        .game-list-buttons {
            margin-top: var(--NavHeight);
            button {
                font-family: 'Roboto Mono', monospace;
                margin: var(--small-padding);
            }
        }
        .game-list-container {
            text-align: left;
            width: 50%;
            margin: auto;
            font-family: 'Roboto Mono', monospace;
            max-height: 650px;
            overflow-y: scroll;

            height: 100%;

            .game-list-item-wrapper {
                .game-list-item {
                    display: grid;
                    grid-template-columns: 3fr 1fr;
                    padding: 5px;
                    margin: 10px 0px;
                    background-color: #dddddd;
                    font-size: 1em;
                    border-radius: 5px;

                    .game-list-item-detail {
                        display: flex;
                        flex-direction: column;
                        * {
                            font-family: 'Roboto Mono', monospace;
                        }
                        .creation-time {
                            padding: 0;
                            margin: 0;
                            font-size: 0.6em;
                            margin-bottom: var(--small-padding);
                        }
                    }
                    .join-game {
                        margin: auto;
                        button {
                            font-family: 'Roboto Mono', monospace;
                            align-content: right;
                            align-self: middle;
                        }
                    }
                }
            }
        }
    }

    .modal {
        display: flex;
        flex-direction: column;
        border-radius: 1em;
        background-color: var(--trans-gray);
        z-index: 1000;
    }

    .game-modal {
        position: absolute;
        bottom: 0%;
        width: 100%;
        min-height: 100%;
        align-items: center;
        justify-content: center;
        div button {
            margin: calc(var(--big-padding) * 3) var(--big-padding);
            font-family: 'Roboto Mono', monospace;
        }
    }

    .form-container {
        position: absolute;
        align-items: center;
        justify-content: center;
        max-width: 40%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: var(--trans-gray);
        z-index: 100;
        padding: var(--big-padding);
        border-radius: var(--small-padding);
        border: 3px solid var(--semi-trans-gray);
        .form {
            display: flex;
            flex-wrap: wrap;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            button {
                margin: var(--small-padding);
                font-family: 'Roboto Mono', monospace;
            }
            .form-input {
                margin-bottom: var(--big-padding);
                font-size: 1em;
                font-family: 'Roboto Mono', monospace;
            }
        }
    }

    /* Utility classes */
    .white {
        background-color: var(--white);
    }
    .blue {
        background-color: var(--blue);
    }
    .green {
        background-color: var(--green);
    }
    .red {
        background-color: var(--red);
    }
    .black {
        background-color: var(--black);
        color: white;
    }
    .gold {
        background-color: var(--gold);
    }
    .noble {
        background-color: var(--faded-purple);
    }

    .disabled {
        display: none;
        filter: saturate(30%) brightness(30%);
    }

    .board-card.white,
    .player-card.white {
        background-color: var(--white);
    }
    .board-card.blue,
    .player-card.blue {
        background-color: var(--faded-blue);
    }
    .board-card.green,
    .player-card.green {
        background-color: var(--faded-green);
    }
    .board-card.red,
    .player-card.red {
        background-color: var(--faded-red);
    }
    .board-card.black,
    .player-card.black {
        background-color: var(--faded-black);
        color: white;
    }

    .bank-gems.black,
    .bank-gems.blue,
    .bank-gems.green,
    .bank-gems.red,
    .bank-gems.gold {
        border: 3px solid white;
    }

    .bank-gems.white {
        border: 3px solid black;
    }

    .hover-zoom {
        :hover {
            transition: 0.1s all;
            transform: scale(1.5);
            z-index: 100;
        }
    }

    .zoomed {
        transform: scale(1.5);
    }
`;

export default GlobalStyle;
