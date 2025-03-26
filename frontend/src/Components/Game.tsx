import React, { useState } from 'react'
import { Button, Container, Typography } from '@mui/material';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import useAuth from '../Hooks/useAuth';
import { Scenario } from '../scenarios';
import { useNavigate, useParams } from 'react-router';
import { useChatApi } from '../Hooks/useChatApi';


export type Message = {
    id?: string
    username?: string
    message: string
    scenarioId: string
    gameId: string
    fromUser: boolean
}


const Game = () => {
    const { scenarioId, gameId } = useParams();
    const {auth} = useAuth()
    const [input, setInput] = useState("")
    const [messages, setMessages] = useState([] as Message[])
    const navigate = useNavigate()
    const { postMessage } = useChatApi()

    if (!scenarioId || !gameId) {
        console.error("Missing scenarioId or gameId");
        navigate('/'); // Redirect to homepage or error page
        return;
    }

    function sendMessage() {
        if (!input.trim()) return;
        console.log("sent")
        const message: Message = {
            message: input,
            scenarioId: scenarioId,
            gameId: gameId,
            fromUser: true
        }
        setMessages(prev => 
            [...prev, message]
        )

        try {
            postMessage(message)
        } catch (error) {
            console.error(error)
        }
        
        setInput("")
    }

    return (
    <Container>
        <Container>
            <Container>
                {messages.map((message, index) => (
                    (message.fromUser 
                        ?
                            <Container key={message.id || crypto.randomUUID()}  disableGutters >
                                <Typography className=''>
                                    {message.message}
                                </Typography>
                            </Container>
                        :
                            <Container key={message.id || crypto.randomUUID()} disableGutters> 
                                <Typography>
                                    {message.message}
                                </Typography>
                            </Container>
                    ) 
                ))}
            </Container>
            <Container className='flex gap-3'>
                <TextareaAutosize
                    className="w-80 text-sm font-normal font-sans leading-normal p-3 rounded-xl rounded-br-none shadow-lg shadow-slate-100 dark:shadow-slate-900 focus:shadow-outline-purple dark:focus:shadow-outline-purple focus:shadow-lg border border-solid border-slate-300 hover:border-purple-500 dark:hover:border-purple-500 focus:border-purple-500 dark:focus:border-purple-500 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-300 focus-visible:outline-0 box-border"
                    aria-label="empty textarea"
                    placeholder="Empty"
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                />
                <Button sx={{}} variant='contained' onClick={sendMessage}>
                    Confirm
                </Button>
            </Container>

        </Container>
        
    </Container>
  )
}

export default Game
