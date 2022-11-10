import React, { useContext, useEffect, useRef } from 'react'
import AddNote from './AddNote';
import Noteitem from './Noteitem';
import noteContext from '../context/notes/noteContext';


const Notes = () => {
    //isme hamne notes ko import kr liya hai using useContext hook..
    const context = useContext(noteContext);
    // eslint-disable-next-line 
    const { notes, getNotes } = context;


    //it is used to fetch all the notes only once using getNotes
    useEffect(() => {
        getNotes();
        // eslint-disable-next-line
    }, [])


    const ref = useRef(null);//this hook is used for making reference in any object


    const updateNote = (note) => {
        console.log("Updating...");
        ref.current.click();//it will select jo currently clicked hai for reference watch documentation
    }



    return (
        <>
            <AddNote />

            {/* Bootstrap modal */}
            {/* <button  ref={ref} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Update
            </button>
            <div className="modal fade" id="exampleModalLong" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Edit Note</h5>
                            <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            ...
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Update Notes</button>
                        </div>
                    </div>
                </div>
            </div> */}

            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            ...
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>



            <div className="row my-3 mx-3">
                <h2>Your Notes</h2>

                {notes.map((note) => {
                    //As a prop mai note ko send kr diya hai and Noteitem.js mai props ki jagah pr title and desc bhej diya hai
                    return <Noteitem key={note._id} updateNote={updateNote} note={note} />
                })}

            </div>
        </>
    )
}

export default Notes