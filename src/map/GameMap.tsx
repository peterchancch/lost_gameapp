import { Box, Button, DialogActions, DialogContent } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { DialogContext, IDialog, IDialogScript } from "../dialog/DialogService";
import { InventoryContext } from "../inventory/InventoryService";
import { PLAYER, PlayerContext } from "../player/PlayerService";
import BoyMap from "./submap/BoyMap";
import GirlMap from "./submap/GirlMap";
import TestMap1 from "./submap/TestMap1";
import TestMap2 from "./submap/TestMap2";
import TestMap3 from "./submap/TestMap3";
import TestMap4 from "./submap/TestMap4";


const MapA = ()=> <>
        <table style={{width:2048, height:2049, border: 0}} cellPadding={0} cellSpacing={0}>
            <tr>
                <td width="2048" height="30" colSpan={8}>
                    </td>
            </tr>
            <tr>
                <td width="1406" height="293" colSpan={5}>
                    </td>
                <td rowSpan={2}>
                    <TestMap4/>
                </td>
                <td width="312" height="963" colSpan={2} rowSpan={3}>
                    </td>
            </tr>
            <tr>
                <td width="264" height="670" colSpan={2} rowSpan={2}>
                    </td>
                <td rowSpan={2}>
                    <TestMap3/>
                </td>
                <td width="705" height="114" colSpan={2}>
                    </td>
            </tr>
            <tr>
                <td width="507" height="556">
                    </td>
                <td colSpan={2}>
                    <TestMap2/>
                </td>
            </tr>
            <tr>
                <td width="260" height="1055" rowSpan={2}>
                    </td>
                <td colSpan={6}>
                    <TestMap1/>
                </td>
                <td width="264" height="1055" rowSpan={2}>
                    </td>
            </tr>
            <tr>
                <td width="1524" height="261" colSpan={6}>
                    </td>
            </tr>
            <tr>
                <td>
                    </td>
                <td>
                    </td>
                <td>
                    </td>
                <td>
                    </td>
                <td>
                    </td>
                <td>
                    </td>
                <td>
                    </td>
                <td>
                    </td>
            </tr>
        </table>
</>




const PlayerMap = (props: {playerMap: PLAYER}) => {
    const { setOpen, setDialog, callDialogs } = useContext(DialogContext);
    const { playersItem } = useContext(InventoryContext);
    useEffect(()=>{
        console.log(playersItem)
    }, [playersItem])

    useEffect(()=>{
        
        const script: IDialogScript = {
            dialogs: [{
                content: "Welcome to the LOST"
             },{
                content: "You guys act as Lodema (Girl) and Stowe (Boy)"
            },{
                content: "Lodema has been falled into underworld of the house. Let's investigate around and find the clues to help Stowe to save Lodema from the underworld."
            },{
                content: "Game Rule 1: You can only perform two action (e.g. investigate / Walk) each round. When your turn is end, press PASS (Bottom-right corner) to pass to next player",
            },{
                content: "Game Rule 2: Sometime you may need to throw a dice to finish your investigation. Throw the dice and click the action according to the dice result",
            },{
                content: "Board Game Setup: Place your characters in front of door of the living room (Lodema -> underworld, Stowe -> real world). Place the Quest tokens according to the map",
            },]
        }
        const {dialogs} = script;

        callDialogs(dialogs);
        setOpen(true);
    }, [])

    switch (props.playerMap.toUpperCase()) {
        case "AMY": return <>
                <Box sx={{bgcolor: "black", width: 1500, height: 1500}}>
                    <GirlMap />
                </Box>
                </>;
        case "FRANKIE": return <>
                <Box sx={{bgcolor: "white", width: 1500, height: 1500}}>
                    <BoyMap />
                </Box>
                </>;
    }    
    return <></>;
}

const GameMap = ()=>{
    const playerContext = useContext(PlayerContext);
    const { playerState } = playerContext


    return <PlayerMap playerMap={playerState.currentTurn}/>
}

export default GameMap;