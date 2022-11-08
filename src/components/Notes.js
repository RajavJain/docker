import React, {useContext} from 'react'
import AddNote from './AddNote';
import Noteitem from './Noteitem';
import noteContext from '../context/notes/noteContext';

 
const Notes = () => {
    //isme hamne notes ko import kr liya hai using useContext hook..
    const context = useContext(noteContext);
    // eslint-disable-next-line 
    const {notes} = context;
    return (
        <>
        <AddNote/>
        <div className="row my-3 mx-3">
            <h2>Your Notes</h2>
            
            {notes.map ((note) => {
                //As a prop mai note ko send kr diya hai and Noteitem.js mai props ki jagah pr title and desc bhej diya hai
                return <Noteitem key={note._id} note={note}/>
            })}

        </div>
        </>
    )
}

export default Notes