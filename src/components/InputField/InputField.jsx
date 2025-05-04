import { useContext, useEffect, useRef, useState } from "react";
import { ChatContext } from "../../Context";

const InputField = () => {
    const [message, setMessage] = useState('');
    const inputRef = useRef();
    const chatContext = useContext(ChatContext);
    const {chatDetails, setChatDetails, isApiLoading, setIsApiLoading} = chatContext;
    console.log(chatDetails)

    const callWatsonAPI = async (callMessage, message) => {
        setIsApiLoading(true)
        try{
            const aIResponse = await fetch("http://localhost:8000/ask2", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    question: message
                })
            })
            const aIData = await aIResponse.json();
            const currentChatData = [...callMessage];
            const newChat = {
                message: aIData.response_text,
                messageFrom: "AI"
            }
            currentChatData.push(newChat);
            console.log(currentChatData)
            setChatDetails(currentChatData);
            setIsApiLoading(false)
        }
        catch(error){
            console.error('Error:', error.message);
            setIsApiLoading(false)
        }
        
    }

    const saveNewChat = () => {
        const currentChatData = [...chatDetails];
        const newChat = {
            message: message,
            messageFrom: "human"
        }
        currentChatData.push(newChat);
        setChatDetails(currentChatData)
        callWatsonAPI(currentChatData, message)
    }

    const handleSend = () => {
        if (message.trim()) {
            setMessage('');
            saveNewChat()
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSend();
            saveNewChat()
        }
    };

    const chatHandler = (e) => {
        setMessage(e.target.value)
    }

    useEffect(()=>{
        inputRef.current.focus();
    }, [])

    return (
        <div className="chat-input-container">
            <input
                ref={inputRef}
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={chatHandler}
                onKeyDown={handleKeyPress}
                className="chat-input"
            />
            <button className="send-button" onClick={handleSend} title="Send">
                ➤
            </button>
        </div>
    );
}

export default InputField