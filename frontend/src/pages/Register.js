import {useState} from "react";

const Register = () =>{
    const [username, setusername]=useState('');
    const [password, setuserpassword]=useState('');
    async function register(ev) {
        ev.preventDefault();
        const response = await fetch('http://localhost:4000/register', {
          method: 'POST',
          body: JSON.stringify({username,password}),
          headers: {'Content-Type':'application/json'},
        });
        if (response.status === 200) {
          alert('registration successful');
        } else {
          alert('registration failed');
        }
      }
    return(
        <form className="register" onSubmit={register}>
            {/* <input type="text" placeholder="Name"/> */}
            <h1>Register</h1>
            <input type="text" placeholder="Username" value={username} onChange={ev=>setusername(ev.target.value)}/>
            <input type="password" placeholder="Password" value={password} onChange={ev=>setuserpassword(ev.target.value)}/>
            <button>Register</button>
        </form>
    );
}

export default Register;