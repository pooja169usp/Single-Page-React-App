import React from "react";
import UserRow from "./UserRow";

/**
 * UsersTable component renders a table with details of users on click of Get Users button 
 * in Header Component(which is determined by the property showUsers that is passed from WebPage). 
 * While fetching the data from API(determined by property isLoading), this component renders a 
 * loading gif to indicate to the users that the data is being fetched. Before the Get Users 
 * button is clicked, this component renders a user friendly text saying the data has not been loaded.
 */
class UsersTable extends React.Component {
    // Initializing state to false, because on render the table data is already
    // sorted in ascending order and the button text says "A" to denote that the 
    // data is sorted in ascending order of Company Names
    constructor(props) {
        super(props);
        this.state = {
            sortAscending: true,
            buttonText: "A",
            userRows: []
        }
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

    componentDidMount() {
        fetch("https://jsonplaceholder.typicode.com/users", { method: "GET" })
        .then(res => res.json())
        .then(res => this.setState({ 
            userRows: this.props.parseUserData(res)
        })).then( this.sortTable )
        .catch(() => this.setState({ hasErrors: true }));
    }

    // Helper function to sort the data in either ascending/descending order.
    // Each time the Sort button is clicked, the sortAscending and buttonText states
    // are toggled. Ref: W3 Schools for sorting
    sortTable = () => {
        var list = this.state.userRows;
        if(this.state.sortAscending) {
            list.sort(function(a,b){
                if(a.companyName < b.companyName)
                    return -1;
                else if(a.companyName > b.companyName)
                    return 1;
                else
                    return 0;
            });
            console.log("HMMMM");
            console.log("HERE" + JSON.stringify(this.state.userRows, null, 2));
        }
        else {
            list.sort(function(a,b){
                if(a.companyName < b.companyName)
                    return 1;
                else if(a.companyName > b.companyName)
                    return -1;
                else
                    return 0;
            }); 
            console.log("HUH");
        }
        // Toggle the state after the rows have been sorted
        this.setState({ 
            sortAscending: !this.state.sortAscending,
            buttonText: this.state.buttonText === "A" ? "D" : "A",
            userRows: list
        });
    }

    render() {
        console.log(JSON.stringify(this.state.userRows, null, 4));

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
                        { this.state.userRows.map((user) => <UserRow user={ user } key={ user.id } />) }
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
