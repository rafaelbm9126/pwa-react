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
            <tr>
              <td>2</td>
              <td>Jose</td>
              <td>{Date()}</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Pedro</td>
              <td>{Date()}</td>
            </tr>
            <tr>
              <td>4</td>
              <td>Miguel</td>
              <td>{Date()}</td>
            </tr>
          </tbody>
        </table>
        <br/>
        <button onClick={() => window.location.reload(true)}>RELOAD</button>
      </header>
    </div>
  );
}

export default App;
