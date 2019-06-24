import React from 'react';
import ReactDOM from 'react-dom';
import UserRow from './UserRow';

var user = {"id":1,"name":"Leanne Graham","companyName":"Romaguera-Crona","city":"Gwenborough","website":"hildegard.org"};

it('UserRow renders without crashing', () => {
  const table = document.createElement('table');
  const tbody = document.createElement('tbody');
  table.appendChild(tbody);
  ReactDOM.render(<UserRow user={ user } key={ user.id } />, tbody);
});