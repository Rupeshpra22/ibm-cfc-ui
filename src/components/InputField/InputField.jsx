import { useState } from "react";

const InputField = () => {
    const [message, setMessage] = useState('');

    const handleSend = () => {
        if (message.trim()) {
            setMessage('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    return (
        <div className="chat-input-container">
            <input
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
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