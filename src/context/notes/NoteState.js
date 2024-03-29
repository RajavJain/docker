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
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);//it will show all the notes as we have passed json in setnotes i.e. used above using useState
  }




  //ADD NOTES>>>>>>>>
  // Function for adding notes and then will be used through useContext hook
  const addNote = async (title, description, tag) => {
    // API CALL
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const note = await response.json()
    setNotes(notes.concat(note))
  }





  //DELETE NOTES>>>>>>
  //Function for deleting notes and then will be used through useContext hook
  const deleteNote = async (id) => {
    // API Call 
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json()
    console.log(json)
    // setNotes(json);
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes);
  }




  //UPDATE/ EDIT NOTES>>>>>
  //Function for Editing notes
  const editNote = async (id, title, description, tag) => {
    //Logic for API calls---
    // API Call 
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();
    console.log(json);


    let newNotes = JSON.parse(JSON.stringify(notes))//made as we are unable to update state in front end part...

    //Logic to edit the notes in Client-side
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
      setNotes(newNotes);

    }
  }


  return (
    //ye export krne mai kaam aaega... using useContext hook>>>>>
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )

}
export default NoteState;