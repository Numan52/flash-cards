import React from 'react'
import useFetch from './useFetch';
import { Message } from '../Components/Game';

export const useChatApi = () => {
    const { request } = useFetch();

    const postMessage = async (message: Message) => {
        const data = await request({
            endpoint: "/chats/message",
            method: "POST",
            body: JSON.stringify( message ),
        });

        return data;
    }


    return {postMessage}
}

