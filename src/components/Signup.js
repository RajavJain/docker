import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';//used for redirecting the user to their notes


const Signup = (props) => {

  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (credentials.password === credentials.cpassword) {
      const response = await fetch("http://localhost:2000/api/auth/createuser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
      });
      const json = await response.json();
      console.log(json);
      if (json.success) {
        localStorage.setItem('token', json.authtoken)
        props.showAlert("Account Created Successfully", "success")
        //now agar true hota hai then Using UseNavigator Hook (earlier usehistory was used) to redirect the user in its notes page
        navigate("/");
      }
      else {
        props.showAlert("Email Already exists !!! Try with Signing up", "danger")
      }

    }
    else {
      props.showAlert("Confirm Password does not match", "danger")
    }


    //yaha pr success hum json backend se laaye hai kyuki waha set kr diya hai agar valid authtoken hai then returns true>>>

  }


  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }


  return (

    <div className="container mt-3">
      <h2 className='my-10'>
        Create an Account to continue
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mt-2">
          <label htmlFor="name">Name</label>
          <input type="text" className="form-control" id="name" aria-describedby="emailHelp" name='name' onChange={onChange} placeholder="Enter your Name" />
        </div>

        <div className="form-group mt-2">
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name='email' onChange={onChange} placeholder="Enter email" />
        </div>

        <div className="form-group my-3">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" id="password" name='password' onChange={onChange} minLength={5} required placeholder="Password" />
        </div>

        <div className="form-group my-3">
          <label htmlFor="cpassword">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onChange} minLength={5} required placeholder="Password" />
        </div>

        <button type="submit" className="btn btn-danger my-3 ">Create New Account</button>
      </form>
    </div>
  )
}

export default Signup