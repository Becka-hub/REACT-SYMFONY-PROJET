import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
const Login=(props)=>{
  return (
    <div>
       <LoginForm setUser={props.setUser}/>
    </div>
  );
}
export default Login;
 