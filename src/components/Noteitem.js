import React from 'react'

//Is component ko Notes.js mai send kr diya hai.... 
const Noteitem = (props) => {
        // eslint-disable-next-line
    const { note , addNote} = props;
    
    return (
        <>
            <div className='col-md-3'>
                {/* Jo props send kr rhe hai wo sabhi is bootstrap k card mai aaega*/}
                <div className="card my-2" >
                    <div className="card-body ">
                        <div className="d-flex align-items-center">
                        <h5 className="card-title">{note.title}</h5>
                        <i className="fa fa-trash-o mx-2"></i>
                        <i className="fa fa-pencil-square-o mx-2"></i>
                        </div>
                        <p className="card-text">{note.description}</p>
                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default Noteitem