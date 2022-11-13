import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';//used for redirecting the user to their notes



const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" })
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:2000/api/auth/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });

    const json = await response.json();
    console.log(json);
    //yaha pr success hum json backend se laaye hai kyuki waha set kr diya hai agar valid authtoken hai then returns true>>>
    if (json.success) {
      localStorage.setItem('token', json.authtoken)
      //now agar true hota hai then Using UseNavigator Hook(earlier usehistory was used) to redirect the user in its notes page
      navigate("/");
    }
    else {
      alert("Invalid Credentials")
    }
  }


  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (

    <div className='container'>

      <h2 className='my-10'>
        Please Login to Access Notes
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control" value={credentials.email} name='email' id="email" onChange={onChange} aria-describedby="emailHelp" placeholder="Enter email" />
        </div>

        <div className="form-group my-3">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" value={credentials.password} name='password' id="password" onChange={onChange} placeholder="Password" />
        </div>
        <button type="submit" className="btn btn-primary my-2">Login</button>
      </form>

    </div>
  )
}

export default Login