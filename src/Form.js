import React, { useState } from "react";
import db from './Firebase';
import {ref,push,child,update,remove,onValue} from "firebase/database";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Form = () => {
    // Email validation
    const isEmail = (email => {
        return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
    });

    // Password validation
    const isPassword = (password => {
        return /^[A-Za-z]\w{7,14}$/i.test(password);
    })

    // State for registeration
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // State for checking errors
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    // Handling setUsername to change username
    const handleUsername = (event) => {
        setUsername(event.target.value);
        setSubmitted(false);
    };

    // Handling setName to change name
    const handleName = (event) => {
        setName(event.target.value);
        setSubmitted(false);
    };

    // Handling setEmail to change email
    const handleEmail = (event) => {
        setEmail(event.target.value);
        setSubmitted(false);
    };

    // Handling setPassword to change password
    const handlePassword = (event) => {
        setPassword(event.target.value);
        setSubmitted(false);
    };

    // Function to check for blank input
    const blankInput = () => {
        return (username === '' || name === '' || email === '' || password === '');
    };
    // Handling form submission
    const handleSubmit = (event) => {
        event.preventDefault();

        if (blankInput()) {
            if (isEmail(email)) {
                if (isPassword(password)) {
                    setPasswordError(false);
                } else {
                    setPasswordError(true);
                }
                setEmailError(false);
            } else {
                setEmailError(true);
            }
            setError(true);
        } 

        else if (!isEmail(email)) {
            if (!blankInput()) {
                if (isPassword(password)) {
                    setPasswordError(false);
                } else {
                    setPasswordError(true);
                }
                setError(false);
            }
            setEmailError(true);
        } 

        else if (!isPassword(password)) {
            if (isEmail(email)) {
                if (!blankInput()) {
                    setError(false);
                } else {
                    setError(true);
                }
                setEmailError(false);
            } else {
                setEmailError(true);
            }
            setPasswordError(true);
        }

        else {
            setSubmitted(true);
            setPasswordError(false);
            setError(false);
            setEmailError(false);
            let obj = {
                username: username,
                name: name,
                email: email,
                password: password
            }
            const updates = {};
            updates[username] = obj;
            return update(ref(db, 'User/'), updates);         
        }
    };


    // Handling form deletion
    const handleDelete = (event) => {
        event.preventDefault();

        let usernames = [];
        const dbref = ref(db, 'User');
        onValue(dbref, (snapshot) => {
            let records = [];
            snapshot.forEach(childSnapshot => {
                let keyName = childSnapshot.key;
                let data = childSnapshot.val();
                records.push({"key": keyName, "data": data});
            });
                records.map((data, index) => {
                    usernames.push(data.data.username);
                })
                
        });
        if (username === '') {
            alert('Please enter a username');
        } else if (!usernames.includes(username)) {
            alert(`Username '${username}' does not exist, try again`)
        } else {
            remove(ref(db, 'User/'+username))
            .then(() => {
                alert('data was deleted successfully')})
                .catch((error) => {alert("there was an error, details: " + error)});
            setUsername('');
            setName('');
            setEmail('');
            setPassword('');
            setSubmitted(false);
            setError(false);
        }

    };


    // Showing success message (display: submitted ? '' : 'none',) this displays '' if submitted is true or none if false. Purpose is to hide the success message if theres an error.
    const successMessage = () => {
        return (
            <div className="success" style={{display: submitted ? '' : 'none', }}> 
                <h1>{name} has successfully registered!</h1>
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
                <div className="error" style={{display: emailError ? '' : 'none'}}>
                    <h1 className="errorh1">Please enter a valid email</h1>
                </div>
                <div className="error" style={{display: passwordError ? '' : 'none'}}>
                    <h1 className="passError">Password must be between 7 to 16 characters, contain only characters,<br /> numeric digits, underscore and first character must be a letter</h1>
                </div>
            </div>
        );
    };

   

    return (
        <div className="form">
            <div className="header">
                <h1>User registeration</h1>
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

                <label className="label">Name</label>
                <input className="input" value={name} type="text" onChange={handleName} />

                <label className="label">Email</label>
                <input className="input" value={email} type="email" onChange={handleEmail} />

                <label className="label">Password</label>
                <input className="input" value={password} type="password" onChange={handlePassword} />
                <div className="buttonDiv">
                    <button className="btns" type="submit" onClick={handleSubmit}>Submit</button>
                    <button className="btns" type="button" onClick={handleDelete}>Delete</button>
                </div>
             
              
            </form>  
        </div>
    );
}

export default Form;