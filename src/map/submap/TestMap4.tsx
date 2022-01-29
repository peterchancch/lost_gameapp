import { Box, DialogActions, makeStyles } from "@material-ui/core";
import { QuestionAnswer } from "@mui/icons-material";
import { Button, ButtonProps, DialogContent, Hidden } from "@mui/material";
import { useContext, useState } from "react";
import { DialogContext } from "../../dialog/DialogService";
import { GAME_ITEM, InventoryContext } from "../../inventory/InventoryService";
import { PlayerContext } from "../../player/PlayerService";
import BG from "../asset/untitled_03.gif";

const useStyles = makeStyles(theme => ({
    root: {
        backgroundImage: `url(${BG})`,
        height: 407,
        width: 330,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        position: "relative",
        overflow: "hidden"
    }
}));

const Event1 = (arg: ButtonProps) => {
    const { addItem, isItemExist } = useContext(InventoryContext);
    const { playerState } = useContext(PlayerContext);
    const { setOpen, setDialog } = useContext(DialogContext);
    const [ isVisible, setVisible ] = useState(true);

    const dialogContent = <>
    <DialogContent>Oh, you found a key!</DialogContent>
    <DialogActions>
        <Button onClick={()=>{
                addItem(playerState.currentTurn, GAME_ITEM.KEY1);
                setOpen(false);
                setVisible(false);
            }}
        >Close</Button>
    </DialogActions>
    </>

    return isVisible ? <Button color="primary" onClick={()=>{
        setDialog(dialogContent);
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