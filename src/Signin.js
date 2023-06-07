import React, { useState } from "react";
import db from './Firebase';
import {ref,update,remove,onValue} from "firebase/database";

const Signin = () => {
    
    // State for registeration
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // State for checking errors
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);
    const [loginError, setLoginError] = useState(false);

    

    // Handling setUsername to change username
    const handleUsername = (event) => {
        setUsername(event.target.value);
        setSubmitted(false);
    };

    // Handling setPassword to change password
    const handlePassword = (event) => {
        setPassword(event.target.value);
        setSubmitted(false);
    };

    // Getting usernames and passwords from database
    let usernames = [];
    let passwords = [];
    const dbref = ref(db, 'User');
    onValue(dbref, (snapshot) => {
        let records = [];
        snapshot.forEach(childSnapshot => {
            let keyName = childSnapshot.key;
            let data = childSnapshot.val();
            records.push({"key": keyName, "data": data});
        });
            records.map((data, index) => {
                let user = data.data.username;
                let pass = data.data.password
                usernames.push(user);
                passwords.push(pass);
            })
        });

    // Handling form submission
    const handleLogin = (event) => {
        event.preventDefault();
        if (username === '' || password === '') {
            setError(true);

        } else if (usernames.includes(username) && passwords.includes(password)){
            setSubmitted(true);
            setError(false);
            setLoginError(false);
                    
        } else {
            setLoginError(true);
            setError(false);
            setSubmitted(false);
        }
    };

    // Showing success message (display: submitted ? '' : 'none',) this displays '' if submitted is true or none if false. Purpose is to hide the success message if theres an error.
    const successMessage = () => {
        return (
            <div className="success" style={{display: submitted ? '' : 'none', }}> 
                <h1>{username} has successfully logged in!</h1>
            </div>
        );
    };

    // Showing error message if error is true
    const errorMessage = () => {
        return (
            <div className="parentError">
                <div className="error" style={{display: error ? '' : 'none', }}>
                    <h1 className="errorh1">Please enter all the fields</h1>
                </div>
                <div className="error" style={{display: loginError ? '' : 'none'}}>
                    <h1 className="errorh1">Login error, username does not exist</h1>
                </div>
            </div>
        );
    };

    return (
        <div className="form">
            <div className="header">
                <h1>User Login</h1>
            </div>

            {/* Calling to the methods */}
            <div className="messages">
                {errorMessage()}
                {successMessage()}
            </div>      

            <form>
                {/* Labels and inputs for form data */}
                <label className="label">Username</label>
                <input className="input" value={username} type="text" onChange={handleUsername}/>

                <label className="label">Password</label>
                <input className="input" value={password} type="password" onChange={handlePassword} />

                <div className="buttonDiv">
                    <button className="btns" type="submit" onClick={handleLogin}>Login</button>
                </div>
             
            </form>  
        </div>
    );
}

export default Signin;