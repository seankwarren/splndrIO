import { ReadyState } from 'react-use-websocket';

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
