import React,{useState} from 'react'


const Login = () => {
  const [credentials, setCredentials] = useState({email: "" , password: ""})

  const handleSubmit= async (e)=>{
    e.preventDefault();
      const response = await fetch("http://localhost:2000/api/auth/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: credentials.email, password: credentials.password})
      });

       const json = await response.json();
       console.log(json);
  }


  const onChange = (e)=>{
    setCredentials({...credentials, [e.target.name]: e.target.value})
}

  return (

    <div className='container'>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control" value={credentials.email}  name='email' id="email" onChange={onChange}  aria-describedby="emailHelp" placeholder="Enter email"/>
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" value={credentials.password}  name='password'  id="password" onChange={onChange}  placeholder="Password"/>
        </div>
        <button type="submit" className="btn btn-primary my-2">Login</button>
      </form>

    </div>
  )
}

export default Login