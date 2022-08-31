import React, { useState } from "react";

function UserPage(props) {

    return (
        <div div className="filters btn-group stack-exception">
            <button
                type="button"
                className="btn toggle-btn"
                //aria-pressed={props.isPressed}
                onClick={() => props.setComponent(props.Component.SPEEDGAME)}
            >
                Speed Game
            </button>
            <button type="submit" className="btn">
                User Page
            </button>
            <button
                type="button"
                className="btn toggle-btn"
                //aria-pressed={props.isPressed}
                onClick={() => props.setComponent(props.Component.APP)}
            >
                App Example
            </button>
        </div>
    );
}

export default UserPage;
