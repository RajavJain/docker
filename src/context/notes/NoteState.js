import React from "react";
import NoteContext from "./noteContext";// ye import ho gya hai noteContext
import { useState } from "react";



const NoteState = (props) => {
const notesInitial = [
    {
        "_id": "6363d77587b2e70ba0c7ef2f",
        "user": "636156f4f38ac32cca9918dd",
        "title": "LinkedIN",
        "description": "Add new connections",
        "tag": "Important",
        "date": "2022-11-03T15:00:05.676Z",
        "__v": 0
    },
    {
        "_id": "6363d77587b2e70ba0c7ef31",
        "user": "636156f4f38ac32cca9918dd",
        "title": "LinkedIN",
        "description": "Add new connections",
        "tag": "Important",
        "date": "2022-11-03T15:00:05.855Z",
        "__v": 0
    },
    {
        "_id": "6363d77687b2e70ba0c7ef33",
        "user": "636156f4f38ac32cca9918dd",
        "title": "LinkedIN",
        "description": "Add new connections",
        "tag": "Important",
        "date": "2022-11-03T15:00:06.025Z",
        "__v": 0
    },
    {
        "_id": "6363d77687b2e70ba0c7ef35",
        "user": "636156f4f38ac32cca9918dd",
        "title": "LinkedIN",
        "description": "Add new connections",
        "tag": "Important",
        "date": "2022-11-03T15:00:06.187Z",
        "__v": 0
    }
]

const [notes, setNotes]= useState(notesInitial)
return(
    <NoteContext.Provider value={{notes, setNotes}}>
        {props.children}
    </NoteContext.Provider>
)

}
export default NoteState;