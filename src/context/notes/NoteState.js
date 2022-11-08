import React from "react";
import NoteContext from "./noteContext";// ye import ho gya hai noteContext
import { useState } from "react";

//iska kaam kewal components ke andar jo components hai unko access krana to another components.. 

const NoteState = (props) => {
    const notesInitial = [
        {
            "_id": "6363d775873b2e70ba0c7ef2f",
            "user": "636156f4f38ac32cca9918dd",
            "title": "LinkedIN",
            "description": "Add new connections",
            "tag": "Important",
            "date": "2022-11-03T15:00:05.676Z",
            "__v": 0
        },
        {
            "_id": "6363d775837b2e7320ba0c7ef31",
            "user": "636156f4f38ac32cca9918dd",
            "title": "LinkedIN",
            "description": "Add new connections",
            "tag": "Important",
            "date": "2022-11-03T15:00:05.855Z",
            "__v": 0
        },
        {
            "_id": "6363d77687b2e70ba320c7ef33",
            "user": "636156f4f38ac32cca9918dd",
            "title": "LinkedIN",
            "description": "Add new connections",
            "tag": "Important",
            "date": "2022-11-03T15:00:06.025Z",
            "__v": 0
        },
        {
            "_id": "6363d7768327b2e70ba0c7ef35",
            "user": "636156f4f38ac32cca9918dd",
            "title": "LinkedIN",
            "description": "Add new connections",
            "tag": "Important",
            "date": "2022-11-03T15:00:06.187Z",
            "__v": 0
        },
        {
            "_id": "6363d77687b2e70ba230c7ef35",
            "user": "636156f4f38ac32cca9918dd",
            "title": "LinkedIN",
            "description": "Add new connections",
            "tag": "Important",
            "date": "2022-11-03T15:00:06.187Z",
            "__v": 0
        },
        {
            "_id": "6363d77687b2e70b12a0c7ef35",
            "user": "636156f4f38ac32cca9918dd",
            "title": "LinkedIN",
            "description": "Add new connections",
            "tag": "Important",
            "date": "2022-11-03T15:00:06.187Z",
            "__v": 0
        },
        {
            "_id": "6363d7768732b2e70ba0c7ef35",
            "user": "636156f4f38ac32cca9918dd",
            "title": "LinkedIN",
            "description": "Add new connections",
            "tag": "Important",
            "date": "2022-11-03T15:00:06.187Z",
            "__v": 0
        }
    ]
    //used useState hook because isko hame aage update krna hoga isliye
    const [notes, setNotes] = useState(notesInitial)

    // Function for adding notes
    const addNote = (title, description, tag) => {
        console.log("Adding a note");
        const note={
            "_id": "6363d7768732b2e70ba0c7ef35",
            "user": "636156f4f38ac32cca9918dd",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2022-11-03T15:00:06.187Z",
            "__v": 0
        };
        setNotes(notes.concat(note))
    }

    //Function for deleting notes
    const deleteNote = () => {

    }

    //Function for Editing notes
    const editNote = () => {

    }

    return (
        //ye export krne mai kaam aaega... using useContext hook>>>>>
        <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote }}>
            {props.children}
        </NoteContext.Provider>
    )

}
export default NoteState;