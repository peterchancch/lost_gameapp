import { Dialog, Button, DialogActions, DialogContent } from "@mui/material";
import React, { useContext, useState } from "react";

interface IDialogContext {
    setOpen: (open: boolean) => void;
    setDialog: (reactComponent: React.ReactElement) => void;
    callDialogs: (dialogs: IDialog[]) => void;
}

export interface IDialog {content: string, actions?: {displayName: string, action: Function}[]}

export interface IDialogScript {dialogs: IDialog[]}


export const DialogContext: React.Context<IDialogContext> = React.createContext<IDialogContext>({
    setOpen: ()=>{},
    setDialog: ()=>{},
    callDialogs: (dialogs: IDialog[]) => {}
})

export const SimpleDialog = (props: {displayText: string}) => {
    const { setOpen } = useContext(DialogContext);
    return <><DialogContent>{props.displayText}</DialogContent><DialogActions><Button onClick={()=>{setOpen(false)}}>OK</Button></DialogActions></>
}

export const DialogBox = () => {
    const [open, setOpen] = useState(false);
    const [dialogContent, setDialogContent] = useState<React.ReactElement>(<></>);
    const dialogContext = useContext(DialogContext);
    dialogContext.setOpen = setOpen;
    dialogContext.setDialog = setDialogContent;
    
    const callDialogs = (dialogsRaw: IDialog[]) => {
        const dialogs = [...dialogsRaw];
        const dialog = dialogs.shift();
        setDialogContent(<>
            <DialogContent>{dialog?.content}</DialogContent>
            <DialogActions>
            {
                (dialog?.actions?.length ?? 0) > 0 ? 
                dialog?.actions?.map( (action) => {
                    return <Button onClick={()=>{action.action()}}>
                        {action.displayName}
                    </Button>
                })
                : 
                <Button onClick={()=>{
                    if (dialogs.length === 0) {
                        setOpen(false)
                    } else {
                        callDialogs(dialogs);
                    }
                }}>
                    {
                        dialogs.length === 0 ? "OK" : "NEXT"
                    }
                </Button>
            }
            </DialogActions>
        </>)
    }
    
    dialogContext.callDialogs = callDialogs;

    return <Dialog open={open}>
        {
            dialogContent
        }
    </Dialog>
}