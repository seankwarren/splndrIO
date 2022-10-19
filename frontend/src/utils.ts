import { ReadyState } from 'react-use-websocket';
import { PlayerType } from './components/types';

export const ConnectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
};

// format zulu/zero format times to LocaleTime
export const FormatDate = (str: string) => {
    var date = new Date(str);
    return date.toLocaleTimeString('en-US');
};

export const CARD_COLORS: any = {
    1: {
        string: 'white',
        hex: '#eeeeee',
    },
    2: {
        string: 'blue',
        hex: '#1b24a1',
    },
    3: {
        string: 'green',
        hex: '#17610f',
    },
    4: {
        string: 'red',
        hex: '#bd2a2a',
    },
    5: {
        string: 'black',
        hex: '#000000',
    },
    6: {
        string: 'gold',
        hex: '#FFD700',
    },
};

export const parseGems = (str: string | undefined): number[] => {
    if (!str) return [];
    return str.split(',').map((x) => parseInt(x));
};

// Returns the total points of a player's deck"""
export const getPlayerPoints = (player: PlayerType | undefined): number => {
    if (!player) return 0;

    const points = sum(player?.deck[0].cards.map((card) => card.points));

    return points;
};

// Returns the combined purchasing power of a player's gems and deck
export const getPurchasingPower = (player: PlayerType | undefined) => {
    if (!player) return {};
    let deckValue = [0, 0, 0, 0, 0, 0];
    for (const card of player?.deck[0].cards) {
        if (!card.isReserved) deckValue[card.color - 1] += 1;
    }
    const gemValue = parseGems(player.bank[0].gems); //.map((num) => parseInt(num))

    return { deckValue, gemValue };
};

// Converts an int < 14 to its equivalent roman numeral
export const romanize = (num: number | undefined) => {
    if (!num) return;

    if (num < 1) return '0';

    interface RomanType {}

    var roman: RomanType = {
        X: 10,
        IX: 9,
        V: 5,
        IV: 4,
        I: 1,
    };

    var str = '';

    for (var i of Object.keys(roman)) {
        var q = Math.floor(num / roman[i as keyof RomanType]);
        num -= q * roman[i as keyof RomanType];
        str += i.repeat(q);
    }

    return str;
};

export const sum = (arr: number[]): number => {
    return arr.reduce((partialSum, a) => partialSum + a, 0);
};

export const max = (arr: number[]): number => {
    return arr.reduce((a, b) => Math.max(a, b), -Infinity);
};

export const all = (arr: number[]): boolean => {
    return arr.reduce((a, b) => a && b > 0, true);
};
