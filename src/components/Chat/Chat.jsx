import { useContext, useEffect, useRef } from "react"
import { ChatContext } from "../../Context"

const Chat = () => {
    const ChatDetailsContext = useContext(ChatContext);
    const { chatDetails, isApiLoading} = ChatDetailsContext;
    const bottomRef = useRef();

    useEffect(()=>{
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatDetails])

    function formatResponseWithTable(responseText) {
        const lines = responseText.split('\n');
        let htmlOutput = '';
        let inTable = false;
        let tableHtml = '<table>';
        let headerDetected = false;
    
        lines.forEach(line => {
            // Heuristic: Try to detect table start (e.g., lines with multiple spaces, specific keywords)
            // This logic needs to be robust based on your expected table format.
            const isPotentiallyTableRow = line.includes('  ') && line.trim().length > 0; // Very basic check
    
            if (isPotentiallyTableRow && !inTable) {
                 // Might be the start of the table
                 inTable = true;
                 headerDetected = false; // Reset header detection
                 tableHtml += '<thead><tr>';
                 // Attempt to parse header columns (splitting by multiple spaces, requires refinement)
                 const headers = line.trim().split(/\s{2,}/); // Split on 2+ spaces
                 headers.forEach(h => tableHtml += <th>${h.trim()}</th>);
                 tableHtml += '</tr></thead><tbody>';
                 headerDetected = true; // Assuming first detected row is header
            } else if (inTable && line.trim() === '') {
                // Empty line might signify end of table
                inTable = false;
                tableHtml += '</tbody></table>';
                htmlOutput += tableHtml; // Add completed table
                tableHtml = '<table>'; // Reset for potential next table
            } else if (inTable && headerDetected) {
                // Process data row
                tableHtml += '<tr>';
                const cells = line.trim().split(/\s{2,}/); // Split on 2+ spaces
                cells.forEach(c => tableHtml += <td>${c.trim()}</td>);
                tableHtml += '</tr>';
            } else if (inTable && !headerDetected) {
                 // Handle potential multi-line headers or assume first row is header (like above)
                 // This part is tricky
                  const headers = line.trim().split(/\s{2,}/); 
                 headers.forEach(h => tableHtml += <th>${h.trim()}</th>);
                 tableHtml += '</tr></thead><tbody>';
                 headerDetected = true;
            }
             else {
                // Regular paragraph text
                htmlOutput += <p>${line}</p>;
            }
        });
    
        // If the text ends while still inside a table
        if (inTable) {
            tableHtml += '</tbody></table>';
            htmlOutput += tableHtml;
        }
    
        return htmlOutput;
    }
    
    // In displayResponse function:
    // responseTextElement.innerHTML = formatResponseWithTable(data.response_text);
    return(
        <>
            <div className="chat-container">
            {
                chatDetails.map((data)=>{
                    return (
                        <div className={data.messageFrom === "AI" ? "AIChatContainer": "humanChatContainer"}>
                            <div className={data.messageFrom === "AI" ? "AIChatWrapper" : "humanChatWrapper"}>
                                {data.message}
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