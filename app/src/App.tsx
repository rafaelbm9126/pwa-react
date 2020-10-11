import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hello PWA fron ReactJS
        </p>
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>birthday</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Rafael</td>
              <td>{Date()}</td>
            </tr>
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default App;
