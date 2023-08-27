// import { response } from "express";
import { useContext, useState } from "react";
import {Navigate} from "react-router-dom"
import { UserContext } from "../UserContext";

const Login = () =>{
    const [username,setusername]=useState('');
    const [password, setuserpassword]=useState('');
    const [redirect, setredirect]= useState(false);
    const {setUserInfo}=useContext(UserContext);
    async function login(ev){
        ev.preventDefault();
        const response= await fetch('http://localhost:4000/login',{
            method:'POST',
            body: JSON.stringify({username,password}),
            headers:{'Content-Type':'application/json'}
        });
        if(response.ok){
            response.json().then(userInfo=>{
                setUserInfo(userInfo);
                setredirect(true);
        });
        }
        else{
            alert('Wrong Credentials, Check it.');
        }
    }

    if(redirect){
        return <Navigate to={'/'}/>
    }
    return (
        <form className="login" onSubmit={login}>
            <h1>Login</h1>
            <input type="text" placeholder="Username" value={username} onChange={ev=>setusername(ev.target.value)}/>
            <input type="password" placeholder="Password" value={password} onChange={ev=>setuserpassword(ev.target.value)}/>
            <button>Login</button>
        </form>
    );
}

export default Login;