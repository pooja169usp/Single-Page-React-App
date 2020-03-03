import React from "react";

/***
 * Functional component that renders Header
 */
export default (props) => (
    <div id="header">
        <h3>SINGLE PAGE REACT APPLICATION</h3>
        <div id="button-container">
            <button onClick={ props.getUsers }>{ props.buttonText }</button>
        </div>
    </div>
);