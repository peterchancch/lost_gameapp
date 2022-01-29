import { Card, DialogContent, DialogTitle, Grid, Typography } from '@material-ui/core';
import { Dialog } from '@mui/material';
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { PlayerContext } from '../player/PlayerService';
import { GameItemList, GAME_ITEM, IInventory, InventoryContext } from './InventoryService';




const InventoryBox = () => {
    const inventoryContext = useContext(InventoryContext);
    const { playerState } = useContext(PlayerContext);
    // const [ items, setItems ] = useState<{[key: string]: IInventory}>({});
    

    const [ display, setDisplay ] = useState(false);
    const items = inventoryContext.playersItem[playerState.currentTurn] ?? {};
    // const {removeItem} = inventoryContext;

    inventoryContext.showInventoryBox = setDisplay;

    



    return <>
        <Dialog
            open={display}
            keepMounted
            onClose={()=>{setDisplay(false)}}
            
        >
            <DialogTitle>{"Inventory"}</DialogTitle>
            <DialogContent>
            {
                <>
                {    
                    (Object.keys(items) as unknown as GAME_ITEM[]).map(key => {
                        const item = items[key];
                        const itemData = GameItemList.find((el)=> {
                            return GAME_ITEM[el.id] === (key as unknown as string);
                        });
                        const onClickHandler = () => {
                            // removeItem(key);
                        }

                        if (itemData?.visible ?? true) {
                            return <Card onClick={onClickHandler}>
                                        <Typography>{`${itemData?.displayName ?? "Unnamed Item"} x ${item.amount}`}</Typography>
                                        <Typography>{itemData?.description}</Typography>
                                    </Card>
                        } else {
                            return <></>
                        }

                        
                    })
                }
                </>
            }
            </DialogContent>
        </Dialog>
    </>;
}

export default InventoryBox;