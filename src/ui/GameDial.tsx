import { styled } from "@material-ui/core"
import { Adb, Boy, Female, Girl, Inventory, Male, NextPlan } from "@mui/icons-material";
import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material"
import { useContext, useState } from "react";
import { InventoryContext } from "../inventory/InventoryService";
import { PLAYER, PlayerContext } from "../player/PlayerService";
import LodemaImg from "../assets/lodema.png";
import StoweImg from "../assets/stowe.png";

const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
    position: 'absolute',
    '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
      top: theme.spacing(2),
      left: theme.spacing(2),
    },
  }));

const _iconImage = (imgSrc: string ) => <Box sx={{backgroundImage: `url('${imgSrc}')`, width: "60%", height: "60%", backgroundSize: "cover"}} />

const DialIcon = (props: {player: PLAYER}) => {
    switch (props.player.toUpperCase()) {
        case "AMY": return _iconImage(LodemaImg)
        case "FRANKIE": return _iconImage(StoweImg)
    }
    return <Adb />
}


const GameDial = () => {
    const { showInventoryBox } = useContext(InventoryContext);
    const playerContext = useContext(PlayerContext);
    // const [ currentPlayer, setCurrentPlayer ] = useState<PLAYER>(PLAYER.AMY);
    const [ open, setOpen ] = useState(false);
    const actions = [
        { icon: <Inventory />, name: 'Inventory', action: ()=>{showInventoryBox(true)} },
        { icon: <NextPlan />, name: 'Pass', action: ()=>{playerContext.updatePlayerState({type: "nextTurn"})} },
      ];

    // playerContext.onNextTurn = ()=>{
    //     setCurrentPlayer(playerContext.playersData.currentTurn);
    //     setOpen(false);
    // }

    const currentPlayer = playerContext.playerState.currentTurn;

    return <StyledSpeedDial
      ariaLabel="SpeedDial playground example"
    //   hidden={hidden}
      icon={<DialIcon player={currentPlayer}></DialIcon>}
      direction="up"
      open={open}
      onClick={()=>{setOpen(!open)}}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          tooltipOpen
          onClick={action.action}
        />
      ))}
    </StyledSpeedDial>
  

}

export default GameDial;