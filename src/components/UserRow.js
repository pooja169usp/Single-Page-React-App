import React from "react";

/**
 * Functional component to render the rows
 * in the Users table with the data passed in by UsersTable
 * as props.user
 */
function UserRow(props) {
    const user = props.user;
    return(
        <tr>
            <td>{ user.companyName }</td>
            <td>{ user.name }</td>
            <td>{ user.city }</td>
            <td>{ user.website }</td>
        </tr>
    );
}

export default UserRow;