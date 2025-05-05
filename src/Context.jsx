import { createContext, useState } from "react";

export const ChatContext = createContext();

const initialChatDetails = [
    {
        message: "Hello👋! I'm your farming assistant, Need help with crops, weather, or prices? Just type your question!",
        messageFrom: "AI"
    }
]

export const ChatContextProvider = ({children}) => {
    const [chatDetails, setChatDetails] = useState(initialChatDetails);
    const [isApiLoading, setIsApiLoading] = useState(false);
    const [district, setDistrict] = useState();
    const [showDialog, setShowDialog] = useState(true)

    return (
        <ChatContext.Provider value={{chatDetails, setChatDetails, isApiLoading, setIsApiLoading, district, setDistrict, showDialog, setShowDialog}}>
            {children}
        </ChatContext.Provider>
    )
}