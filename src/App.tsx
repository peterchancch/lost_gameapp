import React, { Reducer, useReducer, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Box, Button, Grid, Paper } from '@material-ui/core';
import { GAME_ITEM, initInventoryContext, InventoryContext, inventoryContextInit, inventoryReducer } from './inventory/InventoryService';
import InventoryBox from './inventory/InventoryBox';
import GameMap from './map/GameMap';
import { DialogBox, DialogContext } from './dialog/DialogService';
import GameDial from './ui/GameDial';
import { initPlayerContext, IPlayerAction, IPlayerState, PLAYER, PlayerContext, playerReducer } from './player/PlayerService';
import TitleScreen from './TitleScreen';



function GameApp() {
  const [playerState, updatePlayerState] = useReducer(playerReducer, {playerList:[PLAYER.AMY, PLAYER.FRANKIE], currentTurn: PLAYER.AMY});
  const [inventoryState, updateInventoryState] = useReducer(inventoryReducer, {});

  return (
    <InventoryContext.Provider value={initInventoryContext(inventoryState, updateInventoryState)}>
    <PlayerContext.Provider value={{playerState, updatePlayerState}}>
    <DialogContext.Provider value={{setOpen:()=>{}, setDialog:()=>{}, callDialogs:()=>{}}}>
      <DialogBox></DialogBox>
      <InventoryBox></InventoryBox>
      <GameDial></GameDial>
      <Box sx={{position: "relative", height: "100vh", overflow: "auto"}}>
        <GameMap></GameMap>
      </Box>
    </DialogContext.Provider>
    </PlayerContext.Provider>
    </InventoryContext.Provider>
    
  );
}



const App = () => {
  const [ gameState, setGameState ] = useState(0);

  if (gameState === 1) {
    return <GameApp />
  }

  return <TitleScreen onClickGameStart={()=>{setGameState(1)}}/>
}

export default App;
