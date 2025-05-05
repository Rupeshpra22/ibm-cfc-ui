import { useContext } from "react"
import { ChatContext } from "../../Context"
import logo from "../../assets/logo.svg"
const Header = () => {
    const chatContext = useContext(ChatContext);
    const {chatDetails, setChatDetails, setShowDialog} = chatContext;

    const newChatHandler = () => {
        const defaultChatMessage = chatDetails[0];
        setShowDialog(true)
        setChatDetails([defaultChatMessage])
    }
    
    return (
        <header>
            <div className="header-text">
                <img src={logo} width="38" style={{marginBottom: "15px"}}/>
                <div>FARM IQ</div>
            </div>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <div className="new-chat" onClick={newChatHandler}>
                    New Chat
                </div>
                <span style={{padding: "0px 5px"}}>|</span>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <div>Chat bot designed for farmers</div>
                    <div class="material-symbols-outlined" style={{marginLeft:'5px'}}>smart_toy</div>
                </div>
            </div>
        </header>
    )
}

export default Header