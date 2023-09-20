import React from "react";
import '../App.css'

export default function Navbar() : React.ReactElement {

    return (
        <div className="nav">
            <h1>Home</h1>
            <ul>
                <li>Ai</li>
                <li>Matchmaking</li>
                <li>Profile</li>
            </ul>
        </div>
    );
}