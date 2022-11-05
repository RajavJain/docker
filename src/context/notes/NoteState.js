import React from "react";
import NoteContext from "./noteContext";// ye import ho gya hai noteContext

const NoteState =(props)=>{
    //jo ye humne state banaya hai wo abb koi bhi access kr skta hai... and this is the concept of Context...
    const state={
        "name": "Rajav",
        "branch": "EE"
    }
    return (
        <NoteContext.Provider value={state}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;