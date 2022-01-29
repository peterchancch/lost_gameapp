import { QuestionAnswer } from "@mui/icons-material";
import { Box, Button, ButtonProps, DialogActions, DialogContent, SxProps } from "@mui/material"
import { useContext, useState } from "react";
import { DialogContext, SimpleDialog } from "../../dialog/DialogService";
import { GAME_ITEM, InventoryContext } from "../../inventory/InventoryService";
import { PLAYER, PlayerContext } from "../../player/PlayerService";
import MapImg from "./../../assets/map_bro.png"


const bgSx: SxProps = {
    backgroundImage: `url('${MapImg}')`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: 'contain',
    width: 1500,
    height: 1500,
    position: "relative"
}

const Letter = (arg: ButtonProps) => {
    const { addItem, isItemExist } = useContext(InventoryContext);
    const { playerState } = useContext(PlayerContext);
    const { setOpen, setDialog, callDialogs } = useContext(DialogContext);

    const Event1Script: {dialogs: {content: string, actions?: {displayName: string, action: Function}[]}[]} = {
        dialogs: [{
            content: "Here's some letters..."
         },{
            content: "Those letters are from Father's friends"
        },{
            content: `"There are some magic in the picture... Spell the stone word and dream comes true"`
        }]
    }

    const {dialogs} = Event1Script;

    return <Button color="primary" variant="contained" onClick={()=>{
        callDialogs(dialogs);
        addItem(playerState.currentTurn, GAME_ITEM.LETTER);
        setOpen(true);
    }} {...arg}>
        <QuestionAnswer />
    </Button>
}

const KeyEvent1 = (arg: ButtonProps) => {
    const { addItem, removeItem, isItemExist } = useContext(InventoryContext);
    const { playerState } = useContext(PlayerContext);
    const { setOpen, setDialog, callDialogs } = useContext(DialogContext);

    const isGotLetter = isItemExist(playerState.currentTurn, GAME_ITEM.LETTER);

    const noLetterScript : {dialogs: {content: string, actions?: {displayName: string, action: Function}[]}[]} = {
        dialogs: [{
            content: "Here's a picture..."
        }]
    }

    const script: {dialogs: {content: string, actions?: {displayName: string, action: Function}[]}[]} = {
        dialogs: [{
            content: "What's that... There are some wording written on the stone"
         },{
            content: "I don't know what it means... It is not our language"
        },{
            content: "Try to spell the stone word?",
            actions: [{
                displayName: "Try (>= 6)",
                action: () => {
                    // Use Item
                    if (isItemExist(playerState.currentTurn, GAME_ITEM.DICTIONARY)) {
                        if (isItemExist(playerState.currentTurn, GAME_ITEM.PHOTO)) {
                            if (isItemExist(PLAYER.AMY, GAME_ITEM.GIRL_SLEEP)) {
                                setDialog(<SimpleDialog displayText="You spell the words, the magic seems to be triggered! Your sister backed! GAME END!"></SimpleDialog>)
                            } else {
                                setDialog(<SimpleDialog displayText="You spell the words, the magic seems to be triggered! But your sister haven't get back from the magic picture"></SimpleDialog>)
                            }
                        } else {
                            setDialog(<SimpleDialog displayText="You can translated the words! Bring the photo here and save your sister!"></SimpleDialog>)
                        }
                    } else {
                        setDialog(<SimpleDialog displayText="You tried to spell but nothing happen... Maybe your translation is not good"></SimpleDialog>)
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

    const {dialogs} = isGotLetter ? script : noLetterScript;



    return <Button color="primary" variant="contained" onClick={()=>{
        callDialogs(dialogs);
        setOpen(true);
    }} {...arg}>
        <QuestionAnswer />
    </Button>
}

const CompRoom = (arg: ButtonProps) => {
    const { addItem, removeItem, isItemExist } = useContext(InventoryContext);
    const { playerState } = useContext(PlayerContext);
    const { setOpen, setDialog, callDialogs } = useContext(DialogContext);

    const script: {dialogs: {content: string, actions?: {displayName: string, action: Function}[]}[]} = {
        dialogs: [{
            content: "Here's father computer. It should have something inside"
         },{
            content: "Try to turn on the computer?",
            actions: [{
                displayName: "Turn on (>= 8)",
                action: () => {
                    // Use Item
                    setDialog(<SimpleDialog displayText="You have turned on the computer and found a translate program."></SimpleDialog>)
                    addItem(playerState.currentTurn, GAME_ITEM.DICTIONARY);
                }
            },{
                displayName: "Turn on (< 8)",
                action: () => {
                    // Use Item
                    setDialog(<SimpleDialog displayText="You have turned on the computer. But your mom think that you are playing computer games. She is coming!! (Place 'Mom' at the kitchen and start move 1 steps every turn)"></SimpleDialog>)
                }
            },{
                displayName: "Ignore",
                action: () => {
                    setOpen(false);
                }
            }]
        }]
    }

    const {dialogs} = script;


    

    return <Button color="primary" variant="contained" onClick={()=>{
        callDialogs(dialogs);
        setOpen(true);
    }} {...arg}>
        <QuestionAnswer />
    </Button>
}

const BedRoom = (arg: ButtonProps) => {
    const { addItem, isItemExist } = useContext(InventoryContext);
    const { playerState } = useContext(PlayerContext);
    const { setOpen, setDialog } = useContext(DialogContext);

    const dialogContent = <>
    <DialogContent>Here's my sister photo....</DialogContent>
    <DialogActions>
        <Button onClick={()=>{
                setOpen(false);
                addItem(playerState.currentTurn, GAME_ITEM.PHOTO);
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
                    setDialog(<SimpleDialog displayText="You can move to the downstairs, place the character to downstair map."></SimpleDialog>)
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

const BoyMap = () => {
    return <Box sx={bgSx}>
        <Letter sx={{position: "absolute", top: 1048, left: 800}}/>
        <KeyEvent1 sx={{position: "absolute", top: 750, left: 987}}/>
        <Stair sx={{position: "absolute", top: 501, left: 102}}/>
        <CompRoom sx={{position: "absolute", top: 1048, left: 1008}}/>
        <BedRoom sx={{position: "absolute", top: 970, left: 1230}}/>
    </Box>
}

export default BoyMap;