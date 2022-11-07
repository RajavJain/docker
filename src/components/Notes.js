import React, {useContext} from 'react'
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';

 
const Notes = () => {
    const context = useContext(noteContext);
    // eslint-disable-next-line 
    const { notes, setNotes } = context;
    return (
        <div className="row my-3 mx-3">
            <h2>Your Notes</h2>

            {notes.map((note) => {
                //As a prop mai note ko send kr diya hai and Noteitem.js mai props ki jagah pr title and desc bhej diya hai
                return <Noteitem key={note._id} note={note}/>
            })}

        </div>
    )
}

export default Notes