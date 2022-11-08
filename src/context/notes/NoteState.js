import React from "react";
import NoteContext from "./noteContext";// ye import ho gya hai noteContext
import { useState } from "react";

//iska kaam kewal components ke andar jo components hai unko access krana to another components.. 

const NoteState = (props) => {
    const host = "http://localhost:2000"
    const notesInitial = []

    //used useState hook because isko hame aage update krna hoga isliye
    const [notes, setNotes] = useState(notesInitial)



     //GET ALL NOTES>>>>>>>>
    // Function for fetching notes and then will be used through useContext hook
    const getNotes = async () => {
        // API CALL
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM2MTU2ZjRmMzhhYzMyY2NhOTkxOGRkIn0sImlhdCI6MTY2NzQxMjM1Nn0.N2YzNjLsw_vTR5di0Flk1P4Bx3GYZsZEgKWJ9YIXVEk"
            }
          });
          const json=await response.json();
          console.log(json);
          setNotes(json);
    }




    //ADD NOTES>>>>>>>>
    // Function for adding notes and then will be used through useContext hook
    const addNote = async (title, description, tag) => {
        // API CALL
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM2MTU2ZjRmMzhhYzMyY2NhOTkxOGRkIn0sImlhdCI6MTY2NzQxMjM1Nn0.N2YzNjLsw_vTR5di0Flk1P4Bx3GYZsZEgKWJ9YIXVEk"
            },
            body: JSON.stringify({title, description, tag})
          });
          const json = await response.json()
          console.log(json)
          // setNotes(json)


        console.log("Adding a note");
        const note = {
            "_id": "6363d7768732b2e70ba0c7wref34535",
            "user": "636156f4f38ac32cca9918dd",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2022-11-03T15:00:06.187Z",
            "__v": 0
        };
        setNotes(notes.concat(note))
    }





    //DELETE NOTES>>>>>>
    //Function for deleting notes and then will be used through useContext hook
    const deleteNote = (id) => {
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes);
    }




    //UPDATE NOTES>>>>>
    //Function for Editing notes
    const editNote = async (id, title, description, tag) => {
        //Logic for API calls---
        const getNotes = async () => {
            // API Call 
            const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM2MTU2ZjRmMzhhYzMyY2NhOTkxOGRkIn0sImlhdCI6MTY2NzQxMjM1Nn0.N2YzNjLsw_vTR5di0Flk1P4Bx3GYZsZEgKWJ9YIXVEk"
              },
              body: JSON.stringify({title, description, tag})
            });
            const json = await response.json()
            console.log(json)
            setNotes(json);
          }


        //Logic to edit the notes in Client-side
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if(element._id===id)
            {
                element.title=title;
                element.description=description;
                element.tag=tag;

            }
        }
    }


    return (
        //ye export krne mai kaam aaega... using useContext hook>>>>>
        <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )

}
export default NoteState;