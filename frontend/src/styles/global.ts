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

        --card-width: 6.5em;
        --card-height: 8em;
        --big-padding: 1.4em;
        --small-padding: 0.5em;
        --xs-padding: 0.1em;
        --emblem-size: 1.3em;
    }
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: inheirit;
    }
    html {
        background-color: var(--bg);
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

        /* Color */
        background-color: var(--bg-darker);
        color: white;

        .title {
            font-family: monospace;
            margin: auto 0;
        }
    }

    /* Bank and contents */
    .container {
        position: absolute;
        width: 100%;
        top: 10%;
        text-align: center;
        /* transform: scale(1.2); */
    }

    .bank-container {
        display: inline-block;
        .bank {
            /* Grid and positioning */
            display: grid;
            grid-template-rows: 60px;
            grid-template-columns: repeat(6, 60px);
            grid-column-gap: var(--xs-padding);
            margin: 30px;
            padding: var(--xs-padding);

            /* Colors */
            background-color: #dddddd;
            border-radius: 10px;
            color: white;

            /* fonts */
            font-family: monospace;
            font-size: 3em;
            font-weight: 900;
            -webkit-text-stroke: 1.5px black;
            text-align: center;

            .bank-gems {
                /* Positioning */
                display: flex;
                align-items: center;
                justify-content: center;

                /* Size and shape */
                height: 60px;
                width: 60px;
                border-radius: 50%;

                font-family: monospace;
                :hover {
                    transform: scale(1.1);
                }
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
        }
    }

    /* Grid layout containing board, decks, and nobles */
    .table-container {
        display: grid;
        align-items: center;
        justify-content: center;
    }
    .board {
        position: relative;
        .card-buy-reserve {
            display: flex;
            flex-direction: column;
            /* flex-wrap: wrap; */
            border-radius: 1em;
            background-color: var(--trans-gray);
            z-index: 100;
            position: absolute;
            bottom: 0%;
            width: 100%;
            min-height: 100%;
            align-items: center;
            justify-content: center;
            div button {
                margin: var(--big-padding);
            }
        }
        .board-container {
            z-index: 1;
            /* Grid setup */
            display: grid;
            grid-template-columns:
                calc(var(--card-width) + var(--big-padding))
                repeat(4, var(--card-width));
            grid-template-rows:
                calc(var(--card-height) + var(--big-padding))
                repeat(3, var(--card-height));
            grid-gap: var(--big-padding);
            background-color: #cccccc;
            padding: var(--big-padding);
            border-radius: 1em;
            div {
                /* Fonts */
                font-family: monospace;
                font-size: 1.2em;
                font-weight: 900;
                color: white;
                -webkit-text-stroke: 1px black;

                /* Positioning */
                padding: 5px;

                /* Border styling */
                border: 1px solid var(--fine-outline);
                border-radius: 5px;
            }
            .deck {
                grid-column: 1 / 2;
                margin-right: var(--big-padding);
                align-items: center;
                display: grid;
                align-items: center;
                width: var(--card-width);
                height: var(--card-height);
            }
            .deck-label {
                border: none;
                font-size: 1.7em;
                font-family: sans-serif;
                color: darkgray;
            }
            .deck.level-one {
                /* grid-column: 1 / 2; */
                grid-row: 4 / 5;
                background-color: var(--deck-1);
                outline: var(--small-padding) solid var(--outline-1);
            }
            .deck.level-two {
                /* grid-column: 1 / 2; */
                grid-row: 3 / 4;
                background-color: var(--deck-2);
                outline: var(--small-padding) solid var(--outline-2);
            }
            .deck.level-three {
                /* grid-column: 1 / 2; */
                grid-row: 2 / 3;
                background-color: var(--deck-3);
                outline: var(--small-padding) solid var(--outline-3);
            }
            .board-card {
                display: grid;
                grid-template-columns: 1fr calc(
                        var(--small-padding) + var(--emblem-size)
                    );
                justify-content: left;
                align-items: end;
                width: 100%;
                outline: var(--small-padding) solid var(--outline-white);

                :hover {
                    transform: scale(1.5);
                }
            }

            .card-cost,
            .noble-cost {
                border: none;
                padding: 0;
                grid-column: 2;
                justify-content: left;
                div {
                    border-radius: 50%;
                    margin-top: var(--xs-padding);
                    padding: 0px;
                    font-size: calc(var(--emblem-size) / 1.25);
                    font-weight: bold;
                    width: var(--emblem-size);
                    height: var(--emblem-size);
                    line-height: var(--emblem-size);
                }
            }
            .card-points,
            .noble-points {
                background-color: #cccccc;
                display: inline-block;
                outline: 1px solid black;
                width: fit-content;
                grid-row: 1;
                margin-right: 0;
                padding: 0 var(--small-padding);
                align-self: start;
                text-align: center;
                border: none;
                font-family: sans-serif;
                white-space: pre;
            }

            .board-card.level-one {
                grid-row: 4;
                /* outline: 5px solid var(--outline-1); */
            }
            .board-card.level-two {
                grid-row: 3;
                /* outline: 5px solid var(--outline-2); */
            }
            .board-card.level-three {
                grid-row: 2;
                /* outline: 5px solid var(--outline-3); */
            }
            .grid-filler {
                grid-column: 1;
                grid-row: 1;
            }
            .board-noble {
                display: grid;
                grid-template-columns: 1fr calc(
                        var(--small-padding) + var(--emblem-size)
                    );
                align-items: end;

                grid-row: 1;
                background-color: var(--faded-purple);
                margin-bottom: var(--big-padding);
                outline: var(--small-padding) solid var(--outline-white);

                :hover {
                    transform: scale(1.5);
                }
            }
        }
    }

    .card {
        display: grid;
        grid-template-columns: 1fr calc(var(--xs-padding) + var(--emblem-size));
        justify-content: left;
        align-items: end;
        width: var(--card-width);
        height: var(--card-height);
        outline: var(--small-padding) solid var(--outline-white);
        font-size: 1.2em;
        font-weight: 900;
        color: white;
        -webkit-text-stroke: 1px black;
        /* align-self: baseline; */
        align-self: center;
        justify-self: center;

        /* Positioning */
        padding: 5px;

        /* Border styling */
        border: 1px solid var(--fine-outline);
        border-radius: 5px;

        .card-cost,
        .noble-cost {
            border: none;
            padding: 0;
            grid-column: 2;
            justify-content: left;
            div {
                font-family: monospace;
                border-radius: 50%;
                border: 1px solid black;
                margin-top: var(--xs-padding);
                padding: 0px;
                font-size: calc(var(--emblem-size) / 1.25);
                font-weight: bold;
                width: var(--emblem-size);
                height: var(--emblem-size);
                line-height: var(--emblem-size);
            }
        }
        .card-points,
        .noble-points {
            font-size: 1.2em;
            border-radius: 5px;
            background-color: #cccccc;
            display: inline-block;
            outline: 1px solid black;
            width: fit-content;
            grid-row: 1;
            margin-right: 0;
            padding: 0 var(--small-padding);
            align-self: start;
            text-align: center;
            border: none;
            font-family: sans-serif;
            white-space: pre;
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

    .board-card.white {
        background-color: var(--white);
    }
    .board-card.blue {
        background-color: var(--faded-blue);
    }
    .board-card.green {
        background-color: var(--faded-green);
    }
    .board-card.red {
        background-color: var(--faded-red);
    }
    .board-card.black {
        background-color: var(--faded-black);
        color: white;
    }
`;

export default GlobalStyle;
