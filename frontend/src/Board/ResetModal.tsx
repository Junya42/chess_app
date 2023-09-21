import React from "react";

export default function ResetModal() : React.ReactElement {

    return (
        <div className="modal">
            <div className="choice" onClick={() => window.location.reload()}>
                <p>CHECKMATE</p>
            </div>
        </div>
    )
}