import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { ChatContext } from '../../Context';

const districtList = [
    { label: "Akola" },
    { label: "Amravati" },
    { label: "Aurangabad" },
    { label: "Beed" },
    { label: "Bhandara" },
    { label: "Buldana" },
    { label: "Chandrapur" },
    { label: "Dhule" },
    { label: "Gondia" },
    { label: "Hingoli" },
    { label: "Jalgaon" },
    { label: "Jalna" },
    { label: "Kolaba" },
    { label: "Kolhapur" },
    { label: "Latur" },
    { label: "Mumbai City" },
    { label: "Mumbai Suburban" },
    { label: "Nagpur" },
    { label: "Nanded" },
    { label: "Nandurbar" },
    { label: "Nasik" },
    { label: "Osmanabad" },
    { label: "Palghar" },
    { label: "Parbhani" },
    { label: "Pune" },
    { label: "Ratnagiri" },
    { label: "Sangli" },
    { label: "Satara" },
    { label: "Solapur" },
    { label: "Thane" },
    { label: "Vijaydurg" },
    { label: "Wardha" },
    { label: "Washim" },
    { label: "Yavatmal" },
    { label: "Ahmednagar" },
]
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function DistrictDialog() {
    const ChatDetailsContext = React.useContext(ChatContext);
    const { setDistrict, chatDetails, setChatDetails, showDialog, setShowDialog, setIsApiLoading, isApiLoading } = ChatDetailsContext;
    const [open, setOpen] = React.useState(true);
    const [currentDistrict, setCurrentDistrict] = React.useState();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const districtApi = async() => {
        setIsApiLoading(true)
        try {
            const aIResponse = await fetch("http://localhost:8000/set_district", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    district: currentDistrict
                })
            })
            const aIData = await aIResponse.json();
            console.log(aIData)
            setIsApiLoading(false)
        }
        catch (error) {
            console.error('Error:', error.message);
            setIsApiLoading(false)
        }
    }
    const handleClose = (event, reason) => {
        setDistrict(currentDistrict)
        if (reason !== "backdropClick") {
            setShowDialog(false);
            districtApi().then((data)=>{
                const currentChatData = [...chatDetails];
                const newChat = {
                    message: `Your location is set to ${currentDistrict}`,
                    messageFrom: "AI"
                }
                currentChatData.push(newChat);
                setChatDetails(currentChatData);
            })
        }
        
        
    };


    const districtHandler = (e) => {
        console.log(e);
        setCurrentDistrict(e.target.innerText)
    }

    return (
        <React.Fragment>
            <Dialog
                open={showDialog}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                disable
            >
                <DialogTitle style={{ display: "flex", justifyContent: "center", fontSize: "18px" }}><LocationOnIcon fontSize='large' color='success' /></DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description" style={{ textAlign: "center" }}>
                        <div>Welcome!</div>
                        <div style={{ padding: "10px 0px 15px 0px" }}>Please enter your district to continue</div>
                        <Autocomplete
                            options={districtList}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Select District" />}
                            onChange={districtHandler}
                        />
                    </DialogContentText>
                </DialogContent>
                <DialogActions style={{ display: "flex", justifyContent: "center" }}>
                    <Button onClick={handleClose} color="success" variant="contained">Continue to Chat</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
