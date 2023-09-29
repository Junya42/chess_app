import React from "react";
import '../App.scss'

interface Props {
    setPage: React.Dispatch<React.SetStateAction<string>>;
}

export default function Navbar({setPage}: Props) : React.ReactElement {

    const pageChanger = (pageName: string) => {

        setPage(pageName);
    };

    return (
        <div className="nav">
            <button onClick={() => pageChanger("Home")}><h1>Home</h1></button>
            <ul>
                <button onClick={() => pageChanger("Ai")}><li>Ai</li></button>
                <button onClick={() => pageChanger("Matchmaking")}><li>Matchmaking</li></button>
                <button onClick={() => pageChanger("Board")}><li>Board</li></button>
                <button onClick={() => pageChanger("Profile")}><li>Profile</li></button>
            </ul>
        </div>
    );
}