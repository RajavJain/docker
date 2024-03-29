import React, { useContext, useEffect, useRef, useState, } from 'react'
import AddNote from './AddNote';
import Noteitem from './Noteitem';
import noteContext from '../context/notes/noteContext';
import { useNavigate } from 'react-router-dom';


const Notes = (props) => {
    //isme hamne notes ko import kr liya hai using useContext hook..
    const context = useContext(noteContext);
    let navigate=useNavigate();
    // eslint-disable-next-line 
    const { notes, getNotes, editNote } = context;//aur ye hamne import kr liye hai.. ya phir kahe to destructuring kr liye.


    //it is used to fetch all the notes only once using getNotes, it will get all the notes on rendering
    useEffect(() => {
        if(localStorage.getItem('token'))
        {
            getNotes();
        }
        else{
            navigate("/login");
        }
        // eslint-disable-next-line
    }, [])


    const ref = useRef(null);//this hook is used for making reference in any object
    const refClose = useRef(null);//this hook is used for making reference in any object

    

    const updateNote = (currentNote) => {
        ref.current.click();//it will select jo currently clicked hai for reference watch documentation
        setNote({id: currentNote._id ,etitle: currentNote.title , edescription: currentNote.description, etag: currentNote.tag})
    }

    const [note, setNote] = useState({id:"" ,etitle: "", edescription: "", etag: ""})


     //function made for buttons and input-----
     const handleClick = (e)=>{
        console.log("Updating the notes");
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click();
        props.showAlert("Updated Successfully", "success");
        }

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }



    return (
        <>
            <AddNote showAlert={props.showAlert }/>


            {/* Bootstrap modal */}

            {/* isme ref de diya hai using useRef taki pta chal jaae ki kisko target krna hai*/}

            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"  aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" value={note.etitle} onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={handleClick} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length<5 || note.edescription.length<5} type="button" onClick={handleClick} className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>



            <div className=" row my-3 mx-3">
                <h2>Your Notes</h2>

                {/* When there will be no Notes to display */}
                <div className="container">
                {notes.length===0&&"No notes to display"}
                </div>

                {notes.map((note) => {
                    //As a prop mai note ko send kr diya hai and Noteitem.js mai props ki jagah pr title and desc bhej diya hai
                    return <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
                })}

            </div>
        </>
    )
}

export default Notes