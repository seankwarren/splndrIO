
import { useState, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

interface Response {
    message: string,
    type: string,
}

const useCustomWebSocket = ((url: string): { sendMessage: Function, readyState: ReadyState, response: Response | undefined } => {
    const [WSUrl,] = useState(url)
    const [response, setResponse] = useState<Response>()

    const { sendMessage, readyState } = useWebSocket(WSUrl, {
        onOpen: (e) => {
            console.log("Connected to server")
        },
        onClose: () => {
            console.log("Disconnected from server")
        },
        // will attempt to reconnect on disconnect
        shouldReconnect: (closeEvent) => {
            return true;
        },
        reconnectAttempts: 5,
        reconnectInterval: 1000,
        onMessage: (e: MessageEvent) => {
            const response = JSON.parse(e?.data)
            setResponse(response)
        }
    });

    useEffect(() => {
        //console.log(url, response)
    }, [url, response])

    return { sendMessage, readyState, response };
});

export default useCustomWebSocket;