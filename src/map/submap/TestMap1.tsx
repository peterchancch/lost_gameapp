import { Box, DialogActions, makeStyles } from "@material-ui/core";
import { QuestionAnswer } from "@mui/icons-material";
import { Button, ButtonProps, DialogContent, Hidden } from "@mui/material";
import { useContext, useMemo, useState } from "react";
import { DialogContext, SimpleDialog } from "../../dialog/DialogService";
import { GAME_ITEM, InventoryContext } from "../../inventory/InventoryService";
import { PlayerContext } from "../../player/PlayerService";
import BG from "../asset/untitled_11.gif";

const useStyles = makeStyles(theme => ({
    root: {
        backgroundImage: `url(${BG})`,
        height: 794,
        width: 1524,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        position: "relative",
        overflow: "hidden"
    }
}));






const Event1 = (arg: ButtonProps) => {
    const { addItem, removeItem, isItemExist } = useContext(InventoryContext);
    const { playerState } = useContext(PlayerContext);
    const { setOpen, setDialog, callDialogs } = useContext(DialogContext);
    const [ isVisible, setVisible ] = useState(true);
    const [dialogStep, setDialogStep] = useState<number>(0);

    const Event1Script: {dialogs: {content: string, actions?: {displayName: string, action: Function}[]}[]} = {
        dialogs: [{
            content: "HelloWorld1"
         },{
            content: "HelloWorld2"
        },{
            content: "HelloWorld3"
        },{
            content: "HelloWorld4",
            actions: [{
                displayName: "Use Item",
                action: () => {
                    // Use Item
                    if (isItemExist(playerState.currentTurn, GAME_ITEM.KEY1)) {
                        removeItem(playerState.currentTurn, GAME_ITEM.KEY1);   
                        addItem(playerState.currentTurn, GAME_ITEM.KEY2);
                        setDialog(<SimpleDialog displayText="You got Key2!"></SimpleDialog>)
                        setVisible(false);
                    } else {
                        setDialog(<SimpleDialog displayText="Seems it's locked...."></SimpleDialog>)
                    }
                }
            },{
                displayName: "Go yourself =]",
                action: () => {
                    setOpen(false);
                }
            }]
        }]
    }

    const {dialogs} = Event1Script;



    return isVisible ? <Button color="primary" onClick={()=>{
        callDialogs(dialogs);
        setOpen(true);
    }} {...arg}>
        <QuestionAnswer />
    </Button> : null
}

const Event2 = (arg: ButtonProps) => {
    const { addItem, isItemExist, removeItem } = useContext(InventoryContext);
    const { playerState } = useContext(PlayerContext);
    const { setOpen, setDialog } = useContext(DialogContext);

    const dialogContent = <>
    <DialogContent>Oh, you found a key!</DialogContent>
    <DialogActions>
        <Button onClick={()=>{
                removeItem(playerState.currentTurn, GAME_ITEM.KEY1);
                addItem(playerState.currentTurn, GAME_ITEM.KEY2);
                setOpen(false);
            }}
            size="large"
        >Close</Button>
    </DialogActions>
    </>;

    const unfulfilled = <>
        <DialogContent>Seems the drawer is locked</DialogContent>
        <DialogActions>
            <Button onClick={()=>{setOpen(false)}}>OK</Button>
        </DialogActions>
    </>;



    return <Button color="primary" onClick={()=>{
        setDialog(isItemExist(playerState.currentTurn, GAME_ITEM.KEY1) ? dialogContent : unfulfilled);
        setOpen(true);
    }} {...arg}>
        <QuestionAnswer />
    </Button>
}

const TestMap1 = () => {
    const style = useStyles();
    

    return <Box className={style.root}>
        <Event1 sx={{position: "absolute", top:20, left: 50}}/>
        <Event2 sx={{position: "absolute", top:300, left: 300}}/>
    </Box>;
}

export default TestMap1;