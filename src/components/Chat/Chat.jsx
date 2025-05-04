import { useContext, useEffect, useRef } from "react";
import { marked } from 'marked';
import { ChatContext } from "../../Context"
import clipboard from "../../assets/clipboard.svg"

const Chat = () => {
    const ChatDetailsContext = useContext(ChatContext);
    const { chatDetails, isApiLoading } = ChatDetailsContext;
    const bottomRef = useRef();

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatDetails])

    function displayResponse(data) {
        if (data) {
            marked.setOptions({
                gfm: true,
                breaks: false // Adjust as needed
            });
            return marked.parse(data);
        } else {
            return 'No answer generated.';
        }
    }

    const clipboardHandler = (htmlString) => {
        navigator.clipboard.writeText(htmlString);
        window.alert("Text copied to clipboard")
    }
    return (
        <>
            <div className="chat-container">
                {
                    chatDetails.map((data, index) => {
                        const htmlString = displayResponse(data.message);
                        return (
                            <div className={data.messageFrom === "AI" ? "AIChatContainer" : "humanChatContainer"}>
                                <div className={data.messageFrom === "AI" ? "AIChatWrapper" : "humanChatWrapper"}>
                                    <div dangerouslySetInnerHTML={{ __html: htmlString }} />
                                    {
                                        (index !== 0 && data.messageFrom==="AI") && (
                                            <div className="clipboard" onClick={() => clipboardHandler(data.message)}>
                                                <img src={clipboard} width="15px" />
                                            </div>
                                        )
                                    }

                                </div>
                            </div>
                        )
                    })
                }
                {
                    isApiLoading && (
                        <div className="AIChatContainer">
                            <div className="AIChatWrapper dotLoader">
                                <span></span><span></span><span></span>
                            </div>
                        </div>
                    )
                }
                <div ref={bottomRef}></div>
            </div>
        </>
    )
}

export default Chat