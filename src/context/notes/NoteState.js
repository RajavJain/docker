import React from "react";
import NoteContext from "./noteContext";// ye import ho gya hai noteContext
import { useState } from "react";

const NoteState = (props) => {































    //jo ye humne state banaya hai wo abb koi bhi access kr skta hai... and this is the concept of Context...

    // just for explaining the concept of useContext--------------
    //----------------------------------------------------//
    // ye refer kr skte ho for the working of context
    // const s1 = {
    //     "name": "Rajav",
    //     "branch": "EE"
    // }

    // const [state, setState] = useState(s1);
    // const update = () => {
    //     setTimeout(() => {
    //         setState({
    //             "name": "Rajav jain",
    //             "branch": "Still EE"
    //         })
    //     }, 1000);
    // }

    
        // isme hamne state, update send kr diya hai mtlb ki hum context ki madad se kisi function ko bhi call kr skte hain, here update is a function....
        // <NoteContext.Provider value={{state,update}}>
        //     {props.children}
        // </NoteContext.Provider>

}
export default NoteState;