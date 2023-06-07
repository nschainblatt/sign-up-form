import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import './App.css';

function Navbar() {
  return (
    <nav className="navBar">
      
          <a href="/" >Home</a>
       
          <a href="/signin">Sign-In</a>
        
    </nav>
  );
}

export default Navbar;