import React from 'react';
import './App.css';
import MapWrapper from './components/MapWrapper'; // Update the import path if necessary
import diskGolfIcon from './components/Icons/diskgolf.png'; // Adjust the path as needed

function App() {
  return (

    <div className="App">
      {/* <header className="App-header">
        <div className="header-content">
          <img src={diskGolfIcon} className="App-icon" alt="Diskgolf icon" />
          <h1>DiskGIS</h1>
        </div>
      </header> */}
      <MapWrapper />
    </div>

  );
  
}

export default App;
