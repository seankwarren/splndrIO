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
    var date = new Date(str)
    return date.toLocaleTimeString('en-US')
};

export const CARD_COLORS: any = {
    1: {
        string: "white",
        hex: "#eeeeee",
    },
    2: {
        string: "blue",
        hex: "#1b24a1",
    },
    3: {
        string: "green",
        hex: "#17610f",
    },
    4: {
        string: "red",
        hex: "#bd2a2a",
    },
    5: {
        string: "black",
        hex: "#000000",
    },
}