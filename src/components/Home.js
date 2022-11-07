import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

const Home = () => {
  const context = useContext(noteContext);
  const { notes, setNotes } = context;
  return (
    <div>
      <div className="container my-3">
        <h2>Add your Notes here</h2>

        <div className="my-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">Example textarea</label>
          <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
        </div>
        <button className="btn btn-primary">
          Submit
        </button>
      </div>
      <div className="container">
        <h2>Your Notes</h2>

        {notes.map((note) => {
          return note.title;
        })}

      </div>
    </div>
  )
}

export default Home