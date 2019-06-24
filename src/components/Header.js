import React from "react";

/***
 * Functional component that renders Header
 */
export default (props) => (
    <ul>
        <li><a href="https://www.carbonite.com/" target="_blank" rel="noopener noreferrer">
                <img src="/images/carbonite.png" alt="carbonite"></img>
            </a>
        </li>
        <li style={{ "float": "right" }}>
            <button onClick={ props.getUsers }>{ props.buttonText }</button>
        </li>
    </ul>
);