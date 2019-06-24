import React, { Component } from "react";
import Header from "./Header";
import Footer from "./Footer";
import UsersTable from "./UsersTable";

/**
 * WebPage is the parent component that holds all the other components
 * including the Header, Footer and the UsersTable. It also fetches the data
 * from API on click of Get Users button and passes the data onto Userstable for 
 * rendering.
 */
class WebPage extends Component {
    // hasErrors is set if an error occurs while fetching data
    // showUsers is set on successful data fetch
    // isLoading is set when the data fetch is initiated and reset on successful data fetch
    // usersData holds the response from the fetch API
    // parsedUsersData hold the paserd information from usersData 
    state = {
        hasErrors: false,
        showUsers: false,
        isLoading: false,
        usersData: [],
        parsedUsersData: []
    };

    // This function parses the fetched data to get the data/keys of 
    // our interest (Company Name, Name, City and Website)
    parseUserData = (data) => {
        var parsedData = [];
        data.forEach(function(user, i) {
            parsedData.push({
                id: user.id,
                name: user.name,
                companyName: user.company.name,
                city: user.address.city,
                website: user.website
            });
        });
        return parsedData;
    }

    // This function is called on click of Get Users button. It fetches the json 
    // data using React's fetch API and sets the showUsers state which in turn re-renders 
    // the user table with the data loaded
    getUsers = () => {
        this.setState({ isLoading: true });
        setTimeout(()=> {
            fetch("https://jsonplaceholder.typicode.com/users")
            .then(res => res.json())
            .then(res => this.setState({ usersData: res, parsedUsersData: this.parseUserData(res) }))
            .then(this.setState({ showUsers: true, isLoading: false }))
            .catch(() => this.setState({ hasErrors: true }));
        }, 1000);
    }

    render() {
        return (
            <div>
                <Header buttonText="Get Users" getUsers={ this.getUsers }/>
                <Footer />
                <UsersTable isLoading={ this.state.isLoading } 
                    showUsers={ this.state.showUsers } 
                    parsedUsersData={ this.state.parsedUsersData } 
                />
            </div>
        );
    }
}

export default WebPage;

