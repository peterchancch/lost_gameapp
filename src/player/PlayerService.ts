import React from "react";

export enum PLAYER {
    AMY = "AMY",
    FRANKIE = "FRANKIE" 
}

interface IPlayerContext {
    playersData: {
        playerList: PLAYER[];
        currentTurn: PLAYER;
    },
    nextTurn: () => PLAYER,
    onNextTurn: () => void,
}

export const initPlayerContext = (numOfPlayers: number) => {
    const context: IPlayerContext = {
        playersData: {
            playerList: [],
            currentTurn: PLAYER.AMY
        },
        nextTurn: ()=>{return PLAYER.AMY},
        onNextTurn: ()=>{}
    };
    let playerList: PLAYER[] = [];
    if (numOfPlayers > Object.keys(PLAYER).length) {
        console.error("Failed to init, player too much");
    }

    const players = Object.keys(PLAYER).slice(0, numOfPlayers);
    playerList = players as unknown as PLAYER[];

    let currentTurn = playerList[0];

    context.playersData = { playerList, currentTurn };

    context.onNextTurn = () => {};

    context.nextTurn = () => {
        const { playerList, currentTurn } = context.playersData;
        const playerIndex = playerList.findIndex((el) => el === currentTurn);
        const nextTurnIndex = (playerIndex + 1) % numOfPlayers;
        context.playersData.currentTurn = playerList[nextTurnIndex];
        context.onNextTurn();
        return context.playersData.currentTurn;
    }

    return context
}

export interface IPlayerState {
    playerList: PLAYER[];
    currentTurn: PLAYER;
}

export interface IPlayerAction {
    type: string;
    payload: Object;
}

export const playerReducer = (state: IPlayerState, action: IPlayerAction) => {
    switch (action.type) {
        case "nextTurn":
            const { playerList, currentTurn } = state;
            const playerIndex = playerList.findIndex((el: PLAYER) => el === currentTurn);
            const nextTurnIndex = (playerIndex + 1) % playerList.length;
            return {...state, currentTurn: playerList[nextTurnIndex]}
    }
    return state;
}

export const PlayerContext = React.createContext<{playerState: IPlayerState, updatePlayerState: Function}>({
    playerState: {playerList: [], currentTurn: PLAYER.AMY},
    updatePlayerState: ()=>{}
});



// export const PlayerContext = React.createContext<IPlayerContext>({
//     playersData: {
//         playerList: [PLAYER.AMY],
//         currentTurn: PLAYER.AMY
//     },
//     nextTurn: () => {
//         return PLAYER.AMY
//     },
//     onNextTurn: () => {
//         console.log("NEXT TURN");
//     }
// });