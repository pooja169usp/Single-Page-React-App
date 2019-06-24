import React from "react";
import UserRow from "./UserRow";

/**
 * UsersTable component renders a table with details of users on click of Get Users button 
 * in Header Component(which is determined by the property showUsers that is passed from WebPage). 
 * While fetching the data from API(determined by property isLoading), this component renders a 
 * loading gif to indicate to the users that the data is being fetched. Before the Get Users 
 * button is clicked, this component renders an empty div tag.
 */
class UsersTable extends React.Component {
    // Initializing state to false, because on render the table data is already
    // sorted in ascending order and the button text says "A" to denote that the 
    // data is sorted in ascending order of Company Names
    state = {
        sortAscending: false,
        buttonText: "A"
    }

    // Helper function to filter the data based on the filter text entered in the input
    // text box. The data is filtered by setting the display property to none for the 
    // rows that do not match with the filter text entered
    filterTable = () => {
        const table = document.getElementById("userTable");
        const input = document.getElementById("filterText");
        const row = table.getElementsByTagName("tr");
        let filterText = input.value.toLowerCase();
        for (let i = 0; i < row.length; i++) {
            let data = row[i].getElementsByTagName("td")[0];
            if (data) {
                let companyName =  data.innerText || data.textContent;
                if (companyName.toLowerCase().indexOf(filterText) === -1) {
                    row[i].style.display = "none";
                } 
                else {
                    row[i].style.display = "";
                }
            }       
        }
    }

    // Helper function to sort the data in either ascending/descending order.
    // Each time the Sort button is clicked, the sortAscending and buttonText states
    // are toggled.
    sortTable = () => {
        let table, userRows, userRowsLength, swapping, i, x, y, shouldSwap;
        table = document.getElementById("userTable");
        swapping = true;
        while (swapping) {
            swapping = false;
            userRows = table.rows;
            userRowsLength = userRows.length;
            // We start looping at index 1, since index 0 is the header row.
            for (i = 1; i < userRowsLength - 1; i++) {
                shouldSwap = false;
                // Here we compare the companyName in current row with the 
                // companyName in the succeeding row and determine if it needs 
                // to be swapped based on the sortAscending state.
                x = userRows[i].getElementsByTagName("td")[0];
                y = userRows[i + 1].getElementsByTagName("td")[0];
                // To sort the rows in ascending order
                if (this.state.sortAscending === true) {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        shouldSwap = true;
                        break;
                    }
                }
                // To sort the rows in descending order 
                else if (this.state.sortAscending === false) {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        shouldSwap = true;
                        break;
                    }
                }
            }
            // Swap the rows if we determine in the previous step that the rows need to be swapped
            if (shouldSwap) {
                userRows[i].parentNode.insertBefore(userRows[i + 1], userRows[i]);
                swapping = true;     
            } 
        }
        // Toggle the state after the rows have been sorted
        this.setState({ sortAscending: !this.state.sortAscending });
        this.state.buttonText === "A" ? this.setState({ buttonText: "D" }) : this.setState({ buttonText: "A" });
    }

    render() {
        const rows = [];
        this.props.parsedUsersData.sort(function(a,b){
            if(a.companyName < b.companyName)
                return -1;
            else if(a.companyName > b.companyName)
                return 1;
            else
                return 0;
        });
        this.props.parsedUsersData.forEach((user) => {
            rows.push(
                <UserRow user={ user } key={ user.id } />
            );
        });

        if(this.props.isLoading && !this.props.showUsers) {
            return (<div className="loading"><img src="/images/loading.gif" alt="Loading Users..."></img></div>);
        }
        else if(this.props.showUsers) {
            return (
                <table id="userTable">
                    <thead>
                        <tr>
                            <th>Company Name
                                <div>
                                    <div>
                                        <input type="text" placeholder="Filter Company" id="filterText" 
                                            onKeyUp={ this.filterTable } />
                                    </div>
                                    <div>
                                        <button id="sortButton" onClick={ this.sortTable }> 
                                            { this.state.buttonText } 
                                        </button>
                                    </div>
                                </div>
                            </th>
                            <th>Name</th>
                            <th>City</th>
                            <th>Website</th>
                        </tr>
                    </thead>
                    <tbody>
                        { rows }
                    </tbody>
                </table>
            );
        }
        else {
            return (<div className="loading">Users Data has not been loaded.<br />Click Get Users to fetch Data.</div>);
        }
    }
}

export default UsersTable;
