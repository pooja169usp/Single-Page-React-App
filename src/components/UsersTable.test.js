import React from 'react';
import ReactDOM from 'react-dom';
import UsersTable from './UsersTable';

it('UsersTable on load renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<UsersTable isLoading={ false } 
    showUsers={ false } 
    parsedUsersData={ [] } />, div);
});

it('UsersTable while loading renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<UsersTable isLoading={ true } 
    showUsers={ false } 
    parsedUsersData={ [] } />, div);
});

var parsedUsersData = [{"id":1,"name":"Leanne Graham","companyName":"Romaguera-Crona","city":"Gwenborough","website":"hildegard.org"},{"id":2,"name":"Ervin Howell","companyName":"Deckow-Crist","city":"Wisokyburgh","website":"anastasia.net"},{"id":3,"name":"Clementine Bauch","companyName":"Romaguera-Jacobson","city":"McKenziehaven","website":"ramiro.info"},{"id":4,"name":"Patricia Lebsack","companyName":"Robel-Corkery","city":"South Elvis","website":"kale.biz"},{"id":5,"name":"Chelsey Dietrich","companyName":"Keebler LLC","city":"Roscoeview","website":"demarco.info"},{"id":6,"name":"Mrs. Dennis Schulist","companyName":"Considine-Lockman","city":"South Christy","website":"ola.org"},{"id":7,"name":"Kurtis Weissnat","companyName":"Johns Group","city":"Howemouth","website":"elvis.io"},{"id":8,"name":"Nicholas Runolfsdottir V","companyName":"Abernathy Group","city":"Aliyaview","website":"jacynthe.com"},{"id":9,"name":"Glenna Reichert","companyName":"Yost and Sons","city":"Bartholomebury","website":"conrad.com"},{"id":10,"name":"Clementina DuBuque","companyName":"Hoeger LLC","city":"Lebsackbury","website":"ambrose.net"}];
it('UsersTable renders UsersTable without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<UsersTable isLoading={ false } 
    showUsers={ true } 
    parsedUsersData={ parsedUsersData } />, div);
});