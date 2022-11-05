import React from 'react'

const home = () => {
  return (
    <div>
      <div className="container my-3">
        <h2>Add your Notes here</h2>

        <div className="my-3">
          <label for="exampleFormControlInput1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
        </div>
        <div className="mb-3">
          <label for="exampleFormControlTextarea1" className="form-label">Example textarea</label>
          <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
        </div>
      <button className="btn btn-primary">
        Submit
      </button>
      </div>
      <div className="container">
        <h2>Your Notes</h2>
      </div>

    </div>
  )
}

export default home