import { useContext, useEffect, useRef } from "react";
import { marked } from 'marked';
import { ChatContext } from "../../Context"
import clipboard from "../../assets/clipboard.svg"

const Chat = () => {
    const ChatDetailsContext = useContext(ChatContext);
    const { chatDetails, isApiLoading } = ChatDetailsContext;
    console.log(ChatDetailsContext)
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
        <div className="chat-container">
            {
                chatDetails.map((data, index) => {
                    const htmlString = displayResponse(data.message);
                    return (
                        <div className={data.messageFrom === "AI" ? "ai-chat-container" : "human-chat-container"}>
                            <div className={data.messageFrom === "AI" ? "ai-chat-wrapper" : "human-chat-wrapper"}>
                                <div dangerouslySetInnerHTML={{ __html: htmlString }} />
                                {
                                    (index > 1 && data.messageFrom === "AI") && (
                                        <div className="clipboard" onClick={() => clipboardHandler(data.message)}>
                                            <img src={clipboard} width="18px" />
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
                    <div className="ai-chat-container">
                        <div className="ai-chat-wrapper dot-loader">
                            <span></span><span></span><span></span>
                        </div>
                    </div>
                )
            }
            <div ref={bottomRef}></div>
        </div>
    )
}

export default Chat