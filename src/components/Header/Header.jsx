import { useContext } from "react"
import { ChatContext } from "../../Context"
import logo from "../../assets/logo.svg"
const Header = () => {
    const chatContext = useContext(ChatContext);
    const {chatDetails, setChatDetails} = chatContext;

    const newChatHandler = () => {
        const defaultChatMessage = chatDetails[0];
        setChatDetails([defaultChatMessage])
    }
    
    return (
        <header>
            <div className="headerText">
                <img src={logo} width="38" style={{marginBottom: "15px"}}/>
                <div>FARM IQ</div>
            </div>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <div className="newChat" onClick={newChatHandler}>
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