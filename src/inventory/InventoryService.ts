import React from "react"
import { PLAYER } from "../player/PlayerService";

export enum GAME_ITEM {
    KEY1,
    KEY2,
    BEAR,
    GIRL_SLEEP,
    DICTIONARY,
    PHOTO,
    LETTER
}

interface IGameItem {
    id: GAME_ITEM;
    displayName: string;
    description: string;
    visible: boolean;
}

export const GameItemList: IGameItem[] = [
    {
        id: GAME_ITEM.KEY1,
        displayName: "Statue Fragment",
        description: "Some fragment of the statue... Maybe useful in the future (?",
        visible: true
    },
    {
        id: GAME_ITEM.KEY2,
        displayName: "Silver Key",
        description: "A silver key. Can open something...",
        visible: true
    },
    {
        id: GAME_ITEM.BEAR,
        displayName: "Teddy Bear",
        description: "Blue Teddy Bear, which is Lodema's favourite doll",
        visible: true
    },
    {
        id: GAME_ITEM.GIRL_SLEEP,
        displayName: "Sleeping",
        description: "",
        visible: false
    },
    {
        id: GAME_ITEM.DICTIONARY,
        displayName: "Dictionary",
        description: "Secret Dictionary to translate unknown wording....",
        visible: true
    },
    {
        id: GAME_ITEM.PHOTO,
        displayName: "Photo",
        description: "Lodema's photo",
        visible: true
    },
    {
        id: GAME_ITEM.LETTER,
        displayName: "Letter from Father's Friends",
        description: "Bring something, Spell the stone word and then dream comes true",
        visible: true
    },
]


export interface IInventory {
    id: GAME_ITEM;
    amount: number;
    enable: boolean;
    owner: PLAYER;
}

export interface IInventoryContext {
    addItem:  (player: PLAYER, item: GAME_ITEM, amount?: number, enableToUse?: boolean) => void;
    removeItem: (player: PLAYER, item: GAME_ITEM, amount?: number) => void;
    isItemExist: (player: PLAYER, item: GAME_ITEM, checkAmount?: number) => boolean;
    showInventoryBox: (open: boolean) => void;
    playersItem: { [key: string] : {[key: string]: IInventory}}
}

export const inventoryContextInit: ()=>IInventoryContext = () => {
    let playersItem: { [key: string] : {[key: string]: IInventory}} = {
        "AMY": {},
        "FRANKIE": {},
    };

    const addItem = (player: PLAYER, item: GAME_ITEM, amount: number = 1, enableToUse: boolean = true) => {
        let itemList = playersItem[player] ?? {};
        let data = itemList[GAME_ITEM[item]];
        if (data == undefined) {
            itemList[GAME_ITEM[item]] = {
                id: item,
                amount: amount,
                enable: enableToUse,
                owner: player
            };
        } else {
            itemList[GAME_ITEM[item]] = {
                ...data,
                amount: data.amount + amount
            }
        }
    }
    const removeItem = (player: PLAYER, item: GAME_ITEM, amount: number = 1) => {
        let itemList = playersItem[player] ?? {};
        let data = itemList[GAME_ITEM[item]];
        if (data == undefined) {
            // warning?
            return;
        }

        if (data.owner !== player) {
            // This player does not own this item
            return;
        }

        if (amount > data.amount) {
            // warning?
            return;
        }

        if (data.enable && data.amount > 0) {
            itemList[GAME_ITEM[item]] = {
                ...itemList[GAME_ITEM[item]],
                amount: data.amount - amount
            }
            if (data.amount - amount == 0) {
                //remove item
                delete itemList[GAME_ITEM[item]]
            }
        }
    }
    const isItemExist = (player: PLAYER ,item: GAME_ITEM, checkAmount: number = 1) => {
        let itemList = playersItem[player] ?? {};
        const targetItem = itemList[GAME_ITEM[item]];
        return targetItem && (targetItem.amount >= checkAmount) && targetItem.owner === player && targetItem.enable;
    }

    let initValue: IInventoryContext = {
        playersItem,
        addItem,
        removeItem,
        isItemExist,
        showInventoryBox: ()=>{}
    };

    return initValue;
};

export const InventoryContext: React.Context<IInventoryContext> = React.createContext<IInventoryContext>({
    addItem:  (player: PLAYER, item: GAME_ITEM, amount?: number, enableToUse?: boolean) => {},
    removeItem: (player: PLAYER, item: GAME_ITEM, amount?: number) => {},
    isItemExist: (player: PLAYER, item: GAME_ITEM, checkAmount?: number) => false,
    showInventoryBox: (open: boolean) => {},
    playersItem: {}
});

export interface IInventoryState { [key: string] : {[key: string]: IInventory}}

export interface IInventoryAction {
    type: string;
    payload: {player: PLAYER, item: GAME_ITEM, amount?: number, enableToUse?: boolean};
}

export const inventoryReducer = (state: IInventoryState, action: IInventoryAction) => {
    switch (action.type) {
        case "add": {
            const { player, item, amount, enableToUse } = action.payload;
            let itemList = state[player] ?? {};
            let data = itemList[GAME_ITEM[item]];
            if (data == undefined) {
                itemList[GAME_ITEM[item]] = {
                    id: item,
                    amount: amount ?? 1,
                    enable: enableToUse ?? true,
                    owner: player
                };
            } else {
                itemList[GAME_ITEM[item]] = {
                    ...data,
                    amount: data.amount + (amount ?? 1)
                }
            }
            const newState = {...state};
            newState[player] = itemList;
            return newState;
        }
        case "remove": {
            const { player, item, amount } = action.payload;
            let itemList = state[player] ?? {};
            let data = itemList[GAME_ITEM[item]];
                
            if (data.enable && data.amount > 0) {
                itemList[GAME_ITEM[item]] = {
                    ...itemList[GAME_ITEM[item]],
                    amount: data.amount - (amount ?? 1)
                }
                if (data.amount - (amount ?? 1) == 0) {
                    //remove item
                    delete itemList[GAME_ITEM[item]]
                }
            }

            const newState = {...state};
            newState[player] = itemList;
            return newState;
        }
    }
    return state;
}

export const initInventoryContext = (state: IInventoryState, dispatch: React.Dispatch<IInventoryAction>) => {
    const addItem = (player: PLAYER, item: GAME_ITEM, amount: number = 1, enableToUse: boolean = true) => {
        dispatch({type: "add", payload:{player, item, amount, enableToUse}});
    }
    const removeItem = (player: PLAYER, item: GAME_ITEM, amount: number = 1) => {
        let itemList = state[player] ?? {};
        let data = itemList[GAME_ITEM[item]];
        if (data == undefined) {
            // warning?
            return;
        }

        if (data.owner !== player) {
            // This player does not own this item
            return;
        }

        if (amount > data.amount) {
            // warning?
            return;
        }
        dispatch({type: "remove", payload:{player, item, amount}});
    }
    const isItemExist = (player: PLAYER, item: GAME_ITEM, checkAmount: number = 1) => {
        let itemList = state[player] ?? {};
        const targetItem = itemList[GAME_ITEM[item]];
        return targetItem && (targetItem.amount >= checkAmount) && targetItem.owner === player && targetItem.enable;
    }

    return {
        addItem,
        removeItem,
        isItemExist,
        playersItem: state,
        showInventoryBox: ()=>{console.log("No Func")}
    }
}