// import { response } from "express";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

const Header=()=>{
    const {userInfo,setuserInfo}=useContext(UserContext);
    useEffect(()=>{
      fetch('http://localhost:4000/profile',{
        credentials:'include'
      }).then(response=>{response.json().then(userInfo=>{
        setuserInfo(userInfo);
      });
    });
    },[]);
    function logout(){
      fetch('http://localhost:4000/logout',{
        credentials:'include',
        method:'POST'
      });
      setuserInfo(null);
    }
    const username=userInfo?.username
    return(
        <header>
        <Link to='/' className="logo">MyLogo</Link>
        <nav>
          {username && (
            <>
              <Link to='/create'>Create New Post</Link>
              <a onClick={logout}>LogOut</a>
            </>
          )}
          {!username && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </header>
    );
}

export default Header;