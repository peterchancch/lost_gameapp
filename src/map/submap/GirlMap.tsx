import { QuestionAnswer } from "@mui/icons-material";
import { Box, Button, ButtonProps, DialogActions, DialogContent, SxProps } from "@mui/material"
import { useContext, useState } from "react";
import { DialogContext, SimpleDialog } from "../../dialog/DialogService";
import { GAME_ITEM, InventoryContext } from "../../inventory/InventoryService";
import { PlayerContext } from "../../player/PlayerService";
import MapImg from "./../../assets/map_sis.png"


const bgSx: SxProps = {
    backgroundImage: `url('${MapImg}')`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: 'contain',
    width: 1500,
    height: 1500,
    position: "relative"
}

const KeyEvent = (arg: ButtonProps) => {
    const { addItem, isItemExist } = useContext(InventoryContext);
    const { playerState } = useContext(PlayerContext);
    const { setOpen, setDialog } = useContext(DialogContext);

    const isVisible = !isItemExist(playerState.currentTurn, GAME_ITEM.KEY1);

    const dialogContent = <>
    <DialogContent>It's should have a statue here...</DialogContent>
    <DialogActions>
        <Button onClick={()=>{
                addItem(playerState.currentTurn, GAME_ITEM.KEY1);
                setOpen(false);
            }}
        >Close</Button>
    </DialogActions>
    </>

    return isVisible ? <Button color="primary" variant="contained" onClick={()=>{
        setDialog(dialogContent);
        setOpen(true);
    }} {...arg}>
        <QuestionAnswer />
    </Button> : null
}

const KitchenHole = (arg: ButtonProps) => {
    const { addItem, isItemExist } = useContext(InventoryContext);
    const { playerState } = useContext(PlayerContext);
    const { setOpen, setDialog } = useContext(DialogContext);

    const isVisible = true;

    const dialogContent = <>
    <DialogContent>Why there is a big hole in the kitchen...</DialogContent>
    <DialogActions>
        <Button onClick={()=>{
                setOpen(false);
            }}
        >Close</Button>
    </DialogActions>
    </>

    return isVisible ? <Button color="primary" variant="contained" onClick={()=>{
        setDialog(dialogContent);
        setOpen(true);
    }} {...arg}>
        <QuestionAnswer />
    </Button> : null
}

const KeyEvent1 = (arg: ButtonProps) => {
    const { addItem, removeItem, isItemExist } = useContext(InventoryContext);
    const { playerState } = useContext(PlayerContext);
    const { setOpen, setDialog, callDialogs } = useContext(DialogContext);
    const Event1Script: {dialogs: {content: string, actions?: {displayName: string, action: Function}[]}[]} = {
        dialogs: [{
            content: "What's that... There are some wording written on the stone"
         },{
            content: "I don't know what it means... It is not our language"
        },{
            content: "Seems the stone is able to move"
        },{
            content: "Move the stone? (Throw a dice and click below according to result)",
            actions: [{
                displayName: "Move (> 6)",
                action: () => {
                    // Use Item
                    addItem(playerState.currentTurn, GAME_ITEM.KEY2);
                    setDialog(<SimpleDialog displayText="You found a silver Key!"></SimpleDialog>)
                }
            },{
                displayName: "Ignore",
                action: () => {
                    setOpen(false);
                }
            }]
        }]
    }

    const {dialogs} = Event1Script;



    return <Button color="primary" variant="contained" onClick={()=>{
        callDialogs(dialogs);
        setOpen(true);
    }} {...arg}>
        <QuestionAnswer />
    </Button>
}

const Stair = (arg: ButtonProps) => {
    const { addItem, removeItem, isItemExist } = useContext(InventoryContext);
    const { playerState } = useContext(PlayerContext);
    const { setOpen, setDialog, callDialogs } = useContext(DialogContext);
    
    const Event1Script: {dialogs: {content: string, actions?: {displayName: string, action: Function}[]}[]} = {
        dialogs: [{
            content: "Here's two stairs..."
         },{
            content: "Go to upstairs / downstairs",
            actions: [{
                displayName: "UP",
                action: () => {
                    setDialog(<SimpleDialog displayText="You can move to the upstairs, place the character to upstair map."></SimpleDialog>)
                }
            },{
                displayName: "DOWN",
                action: () => {
                    if (isItemExist(playerState.currentTurn, GAME_ITEM.KEY2)) {
                        setDialog(<SimpleDialog displayText="You can move to the downstairs, place the character to downstair map."></SimpleDialog>)
                    } else {
                        setDialog(<SimpleDialog displayText="Seems it's locked...."></SimpleDialog>)
                    }
                }
            },{
                displayName: "Ignore",
                action: () => {
                    setOpen(false);
                }
            }]
        }]
    }

    const {dialogs} = Event1Script;



    return <Button color="primary" variant="contained" onClick={()=>{
        callDialogs(dialogs);
        setOpen(true);
    }} {...arg}>
        <QuestionAnswer />
    </Button>
}

const Bear = (arg: ButtonProps) => {
    const { addItem, isItemExist } = useContext(InventoryContext);
    const { playerState } = useContext(PlayerContext);
    const { setOpen, setDialog } = useContext(DialogContext);

    const isVisible = !isItemExist(playerState.currentTurn, GAME_ITEM.BEAR);

    const dialogContent = <>
    <DialogContent>Why my teddy bear has been placed here...</DialogContent>
    <DialogActions>
        <Button onClick={()=>{
                addItem(playerState.currentTurn, GAME_ITEM.BEAR);
                setOpen(false);
            }}
        >Close</Button>
    </DialogActions>
    </>

    return isVisible ? <Button color="primary" variant="contained" onClick={()=>{
        setDialog(dialogContent);
        setOpen(true);
    }} {...arg}>
        <QuestionAnswer />
    </Button> : null
}

const BedRoom = (arg: ButtonProps) => {
    const { addItem, isItemExist } = useContext(InventoryContext);
    const { playerState } = useContext(PlayerContext);
    const { setOpen, setDialog } = useContext(DialogContext);

    const isGotBear = isItemExist(playerState.currentTurn, GAME_ITEM.BEAR);

    const dialogContent = !isGotBear ? <>
    <DialogContent>Here's my bedroom. So sleepy now... But I can't sleep without my DOLLs!</DialogContent>
    <DialogActions>
        <Button onClick={()=>{
                setOpen(false);
            }}
        >Close</Button>
    </DialogActions>
    </>:<>
    <DialogContent>So sleepy... I can sleep now...</DialogContent>
    <DialogActions>
        <Button onClick={()=>{
                setOpen(false);
                addItem(playerState.currentTurn, GAME_ITEM.GIRL_SLEEP);
            }}
        >Close</Button>
    </DialogActions>
    </>

    return <Button color="primary" variant="contained" onClick={()=>{
        setDialog(dialogContent);
        setOpen(true);
    }} {...arg}>
        <QuestionAnswer />
    </Button>
}

const GirlMap = () => {
    return <Box sx={bgSx}>
        <KeyEvent sx={{position: "absolute", top: 262, left: 666}}/>
        <KitchenHole sx={{position: "absolute", top: 750, left: 289}}/>
        <KeyEvent1 sx={{position: "absolute", top: 634, left: 988}}/>
        <Stair sx={{position: "absolute", top: 501, left: 102}}/>
        <Bear sx={{position: "absolute", top: 1138, left: 610}}/>
        <BedRoom sx={{position: "absolute", top: 972, left: 1206}}/>
    </Box>
}

export default GirlMap;